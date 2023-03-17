import { dequal } from 'dequal';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// import { Button, Form } from 'semantic-ui-react';
import { Popup } from '../../lib/custom-ui';

import { useForm, useSteps } from '../../hooks';
import LabelColors from '../../constants/LabelColors';
import Editor from './Editor';
import DeleteStep from '../DeleteStep';

// import styles from './EditStep.module.scss';

const StepTypes = {
  DELETE: 'DELETE',
};

const EditStep = React.memo(({ defaultData, onUpdate, onDelete, onBack }) => {
  const [t] = useTranslation();

  const [data, handleFieldChange] = useForm(() => ({
    color: LabelColors[0],
    ...defaultData,
    name: defaultData.name || '',
  }));

  const [step, openStep, handleBack] = useSteps();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const cleanData = {
      ...data,
      name: data.name.trim() || null,
    };

    if (!dequal(cleanData, defaultData)) {
      onUpdate(cleanData);
    }

    onBack();
  }, [defaultData, data, onUpdate, onBack]);

  const handleDeleteClick = useCallback(() => {
    openStep(StepTypes.DELETE);
  }, [openStep]);

  if (step && step.type === StepTypes.DELETE) {
    return (
      <DeleteStep
        title={t('common.deleteLabel', {
          context: 'title',
        })}
        content={t('common.areYouSureYouWantToDeleteThisLabel')}
        buttonContent={t('action.deleteLabel')}
        onConfirm={onDelete}
        onBack={handleBack}
      />
    );
  }

  return (
    <>
      <Popup.Header onBack={onBack}>
        Edit Label
      </Popup.Header>
      <Popup.Content>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Editor data={data} onFieldChange={handleFieldChange} />
          <button className='glass-btn save' type='submit'>Save<span/><span/><span/><span/></button>
        </form>
          <button onClick={handleDeleteClick} className='glass-btn danger' style={{marginTop : '8px'}} type='button'>Delete<span/><span/><span/><span/></button>
      </Popup.Content>
    </>
  );
});

EditStep.propTypes = {
  defaultData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default EditStep;
