import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Message } from 'semantic-ui-react';
import { useDidUpdate, usePrevious, useToggle } from '../../../lib/hooks';
import { withPopup } from '../../../lib/popup';
import { Popup } from '../../../lib/custom-ui';

// import { useForm } from '../../../hooks';
import { isUsername } from '../../../utils/validator';

// import styles from './UsernameEditPopup.module.scss';

const createMessage = (error) => {
  if (!error) {
    return error;
  }

  switch (error.message) {
    case 'Username already in use':
      return {
        type: 'error',
        content: 'common.usernameAlreadyInUse',
      };
    case 'Invalid current password':
      return {
        type: 'error',
        content: 'common.invalidCurrentPassword',
      };
    default:
      return {
        type: 'warning',
        content: 'common.unknownError',
      };
  }
};

const UsernameEditStep = React.memo(
  ({ defaultData, username, isSubmitting, error, onUpdate, onMessageDismiss, onClose }) => {
    const [t] = useTranslation();
    const wasSubmitting = usePrevious(isSubmitting);

    const [data, setData] = useState({
      username: '',
      currentPassword: '',
      ...defaultData,
    });

    const message = useMemo(() => createMessage(error), [error]);
    const [focusCurrentPasswordFieldState, focusCurrentPasswordField] = useToggle();

    const usernameField = useRef(null);
    const currentPasswordField = useRef(null);

    const handleSubmit = useCallback(() => {
      const cleanData = {
        ...data,
        username: data.username.trim() || null,
      };

      if (cleanData.username && !isUsername(cleanData.username)) {
        usernameField.current.select();
        return;
      }

      if (cleanData.username === username) {
        onClose();
        return;
      }

      if (!cleanData.currentPassword) {
        currentPasswordField.current.focus();
        return;
      }

      onUpdate(cleanData);
    }, [username, onUpdate, onClose, data]);

    useEffect(() => {
      usernameField.current.select();
    }, []);

    useEffect(() => {
      if (wasSubmitting && !isSubmitting) {
        if (error) {
          switch (error.message) {
            case 'Username already in use':
              usernameField.current.select();

              break;
            case 'Invalid current password':
              setData((prevData) => ({
                ...prevData,
                currentPassword: '',
              }));
              focusCurrentPasswordField();

              break;
            default:
          }
        } else {
          onClose();
        }
      }
    }, [isSubmitting, wasSubmitting, error, onClose, setData, focusCurrentPasswordField]);

    useDidUpdate(() => {
      currentPasswordField.current.focus();
    }, [focusCurrentPasswordFieldState]);

    const handleFieldChange = (e) => {
      setData(prevData => ({
        ...prevData,
        [e.target.name] : e.target.value
      }))
    }

    return (
      <>
        <Popup.Header>
          {t('common.editUsername', {
            context: 'title',
          })}
        </Popup.Header>
        <Popup.Content>
          {message && (
            <Message
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...{
                [message.type]: true,
              }}
              visible
              content={t(message.content)}
              onDismiss={onMessageDismiss} 
            />
          )}
          <form onSubmit={(e) => handleSubmit(e)}>
            <ul className = 'user-settings-form'>
              <li>
                <span>Username</span>
                <input value = {data.username} onChange = {(e) => handleFieldChange(e)} ref = {usernameField} name = "username" />
              </li>
              <li>
                <span>Current Password</span>
                <input type = 'password' value = {data.currentPassword} ref = {currentPasswordField} onChange = {(e) => handleFieldChange(e)} name = "currentPassword" />
              </li>
              <li>
                <button className='glass-btn save' type = 'submit'  positive>
                Save
                <span/><span/><span/><span/></button>
              </li>
            </ul>
          </form>
          {/* <Form onSubmit={handleSubmit}>
            <div className={styles.text}>{t('common.newUsername')}</div>
            <Input
              fluid
              ref={usernameField}
              name="username"
              value={data.username}
              placeholder={username}
              className={styles.field}
              onChange={handleFieldChange}
            />
            <div className={styles.text}>{t('common.currentPassword')}</div>
            <Input.Password
              fluid
              ref={currentPasswordField}
              name="currentPassword"
              value={data.currentPassword}
              className={styles.field}
              onChange={handleFieldChange}
            />
            <Button
              positive
              content={t('action.save')}
              loading={isSubmitting}
              disabled={isSubmitting}
            />
          </Form> */}
        </Popup.Content>
      </>
    );
  },
);

UsernameEditStep.propTypes = {
  defaultData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  username: PropTypes.string,
  isSubmitting: PropTypes.bool.isRequired,
  error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onUpdate: PropTypes.func.isRequired,
  onMessageDismiss: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

UsernameEditStep.defaultProps = {
  username: undefined,
  error: undefined,
};

export default withPopup(UsernameEditStep);
