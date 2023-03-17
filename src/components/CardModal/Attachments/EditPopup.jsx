import { dequal } from 'dequal';
import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { withPopup } from '../../../lib/popup';
import { Input, Popup } from '../../../lib/custom-ui';

import { useForm } from '../../../hooks';

import styles from './EditPopup.module.scss';

const EditStep = React.memo(({ defaultData, onUpdate, onClose }) => {
  const [t] = useTranslation();

  const [data, handleFieldChange] = useForm(() => ({
    name: '',
    ...defaultData,
  }));

  const nameField = useRef(null);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const cleanData = {
      ...data,
      name: data.name.trim(),
    };

    if (!cleanData.name) {
      nameField.current.select();
      return;
    }

    if (!dequal(cleanData, defaultData)) {
      onUpdate(cleanData);
    }

    onClose();
  }, [defaultData, onUpdate, onClose, data]);


  useEffect(() => {
    nameField.current.focus();
  }, []);

  return (
    <>
      <Popup.Header>
        {t('common.editAttachment', {
          context: 'title',
        })}
      </Popup.Header>
      <Popup.Content>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Input
            fluid
            ref={nameField}
            name="name"
            value={data.name}
            className={styles.field}
            onChange={handleFieldChange}
          />
          {/* <button className='glass-btn save' type='submit'>
          Save
            <span/><span/><span/><span/>
          </button> */}
        </form>
      </Popup.Content>
    </>
  );
});

EditStep.propTypes = {
  defaultData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withPopup(EditStep);
