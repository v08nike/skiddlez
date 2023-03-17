import isEmail from 'validator/lib/isEmail';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Message } from 'semantic-ui-react';
import { usePrevious } from '../../lib/hooks';
import { withPopup } from '../../lib/popup';
import { Popup } from '../../lib/custom-ui';
import { Roles } from '../../constants/Enums';
import { currentUserSelector } from '../../selectors';

// import { useForm } from '../../hooks';
import { isUsername } from '../../utils/validator';

// import styles from './UserAddPopup.module.scss';

const createMessage = (error) => {
  if (!error) {
    return error;
  }

  switch (error.message) {
    case 'Email already in use':
      return {
        type: 'error',
        content: 'common.emailAlreadyInUse',
      };
    case 'Username already in use':
      return {
        type: 'error',
        content: 'common.usernameAlreadyInUse',
      };
    default:
      return {
        type: 'warning',
        content: 'common.unknownError',
      };
  }
};

const UserAddStep = React.memo(
  ({ defaultData, isSubmitting, error, onCreate, onMessageDismiss, onClose }) => {
    const [t] = useTranslation();
    const wasSubmitting = usePrevious(isSubmitting);

    const [data, setData] = useState(() => ({
      roleId: '',
      email: '',
      password: '',
      name: '',
      username: '',
      ...defaultData,
    }));

    const message = useMemo(() => createMessage(error), [error]);

    const roleField = useRef(null);
    const emailField = useRef(null);
    const passwordField = useRef(null);
    const nameField = useRef(null);
    const usernameField = useRef(null);

    const handleFieldChange = (e) => {
      setData(prevData => ({
        ...prevData,
        [e.target.name] : e.target.value
      }))
    }

    const handleSubmit = useCallback((e) => {
      e.preventDefault();
      const cleanData = {
        ...data,
        email: data.email.trim(),
        name: data.name.trim(),
        username: data.username.trim() || null,
      };

      if (!isEmail(cleanData.email)) {
        emailField.current.select();
        return;
      }

      if (!cleanData.password) {
        passwordField.current.focus();
        return;
      }

      if (!cleanData.name) {
        nameField.current.select();
        return;
      }

      if (cleanData.username && !isUsername(cleanData.username)) {
        usernameField.current.select();
        return;
      }

      onCreate(cleanData);
    }, [onCreate, data]);

    useEffect(() => {
      emailField.current.select();
    }, []);

    useEffect(() => {
      if (wasSubmitting && !isSubmitting) {
        if (error) {
          switch (error.message) {
            case 'Email already in use':
              emailField.current.select();

              break;
            case 'Username already in use':
              usernameField.current.select();

              break;
            default:
          }
        } else {
          onClose();
        }
      }
    }, [isSubmitting, wasSubmitting, error, onClose]);

    // // Get currently logged in user's role
    const currentUser = useSelector(state => currentUserSelector(state));

    // // Display the range of role types this user can create
    const roleOptions = [];
    Object.keys(Roles).forEach(k => {
      // // A user can only create accounts with role number
      // // equal or larger than its own
      if (Roles[k] >= currentUser.roleId) {
        roleOptions.push({key: Roles[k], value: Roles[k], text: (k)});
      }
    });
    /*
    const roleOptions = [
      { key: '1', value: '1', text: 'Super User' },
      { key: '2', value: '2', text: 'Domain Super User' },
      { key: '3', value: '3', text: 'Manager' },
      { key: '4', value: '4', text: 'Developer' },
      { key: '5', value: '5', text: 'Watcher' },
      // { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
    ];
    */

    return (
      <>
        <Popup.Header>
          {t('common.addUser', {
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
            <ul className='user-add-popup'>
              <li>
                <h6>Email</h6>
                <input
                  fluid
                  ref={emailField}
                  name="email"
                  value={data.email}
                  readOnly={isSubmitting}
                  onChange={(e) => handleFieldChange(e)}
                />
              </li>
              <li>
                <h6>Password</h6>
                  <input
                  type='password'
                    fluid
                    ref={passwordField}
                    name="password"
                    value={data.password}
                    readOnly={isSubmitting}
                    onChange={(e) => handleFieldChange(e)}
                  />
              </li>
              <li>
                <h6>Role</h6>
                <select value={data.roleId} name = 'roleId' ref = {roleField} onChange={(e) => handleFieldChange(e)}>
                  <option value='' disabled selected style={{display : 'none'}}>Select Role</option>
                  {roleOptions.length > 0 && (
                    roleOptions.map(role => <option key = {`role-----${role.key}`} value = {role.value}>{role.text}</option>)
                  )}
                </select>
              </li>
              <li>
                <h6>Name</h6>
                <input
                  fluid
                  ref={nameField}
                  name="name"
                  value={data.name}
                  readOnly={isSubmitting}
                  onChange={(e) => handleFieldChange(e)}
                />
              </li>
              <li>
                <h6>Username (optional)</h6>
                <input
                  fluid
                  ref={usernameField}
                  name="username"
                  value={data.username}
                  readOnly={isSubmitting}
                  onChange={(e) => handleFieldChange(e)}
                />
              </li>
              <li>
                <button className='glass-btn save' type='submit'>
               Save
                 <span/><span/><span/><span/></button>
              </li>
            </ul>
          </form>
        </Popup.Content>
      </>
    );
  },
);

UserAddStep.propTypes = {
  defaultData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isSubmitting: PropTypes.bool.isRequired,
  error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onCreate: PropTypes.func.isRequired,
  onMessageDismiss: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

UserAddStep.defaultProps = {
  error: undefined,
};

export default withPopup(UserAddStep);
