import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// import { Button, Form } from 'semantic-ui-react';
import { Popup } from '../../lib/custom-ui';

import { useForm } from '../../hooks';
import LabelColors from '../../constants/LabelColors';
import Editor from './Editor';

// import styles from './AddStep.module.scss';

const AddStep = React.memo(({ onCreate, onBack }) => {
  const [t] = useTranslation();

  const [data, handleFieldChange] = useForm(() => ({
    name: '',
    color: LabelColors[0],
  }));

  const handleSubmit = useCallback((e) => {
    e.preventdefault();
    const cleanData = {
      ...data,
      name: data.name.trim() || null,
    };

    onCreate(cleanData);
    onBack();
  }, [data, onCreate, onBack]);

  return (
    <>
      <Popup.Header onBack={onBack}>
        {t('common.createLabel', {
          context: 'title',
        })}
      </Popup.Header>
      <Popup.Content>
        <form style={{marginTop : "1rem"}} onSubmit={(e) => handleSubmit(e)}>
          <Editor data={data} onFieldChange={handleFieldChange} />
          <button className='glass-btn' type='submit'>Create Label<span/><span/><span/><span/></button>
        </form>
      </Popup.Content>
    </>
  );
});

AddStep.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default AddStep;
