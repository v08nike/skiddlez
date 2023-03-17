import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Popup } from 'semantic-ui-react';
import { withPopup } from '../../../lib/popup';
// import { Form } from 'semantic-ui-react';

// import { useField } from '../../../hooks';

// import styles from './NameEditStep.module.scss';

const NameEditStep = React.memo(({ defaultValue, onUpdate, onClose }) => {
  const [t] = useTranslation();
  const [value,setValue] = useState(defaultValue);

  const field = useRef(null);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const cleanValue = value.trim();

    if (!cleanValue) {
      field.current.select();
      return;
    }

    if (cleanValue !== defaultValue) {
      onUpdate(cleanValue);
    }

    onClose(false);
  }, [defaultValue, onUpdate, onClose, value]);

  useEffect(() => {
    field.current.focus();
  }, []);

  return (
    <>
      <Popup.Header>
        {t('common.editTitle', {
          context: 'title',
        })}
      </Popup.Header>
      <Popup.Content>
        <form onSubmit={(e) => handleSubmit(e)}>
          <ul className='delete-account-modal-actions'>
            <li>
              <input value={value} placeholder={t('common.editProjectTitle')} ref = {field} onChange={(e) => setValue(e.target.value)} />
            </li>
            <li>
            {/* <button type='submit' className='glass-btn save'>
       
                
                {t('action.save', {
                  context: 'title',
                })}
                <span/>
                <span/>
                <span/>
                <span/>
              </button>  */}
            </li>
          </ul>
        </form>
      </Popup.Content>
    </>
  );
});

NameEditStep.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withPopup(NameEditStep);
