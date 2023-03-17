import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Menu } from 'semantic-ui-react';
import { withPopup } from '../../../lib/popup';
import { Popup } from '../../../lib/custom-ui';

import { useSteps } from '../../../hooks';
import DeleteStep from '../../DeleteStep';
import NameEdit from './NameEdit';

import styles from './ActionsPopup.module.scss';

const StepTypes = {
  DELETE: 'DELETE',
};

const ActionsStep = React.memo(({  onDelete, defaultName, onNameUpdate, onClose}) => {
  const [t] = useTranslation();
  const [step, openStep, handleBack] = useSteps();

  // const handleEditNameClick = useCallback(() => {
  //   onClose();
  //   onNameEdit();
  // }, [onNameEdit, onClose]);

  const handleDeleteClick = useCallback(() => {
    openStep(StepTypes.DELETE);
  }, [openStep]);

  const handleClick = useCallback(() => {
    onClose();
  }, [onClose])
  if (step && step.type === StepTypes.DELETE) {
    return (
      <DeleteStep
        title={t('common.deleteTask', {
          context: 'title',
        })}
        content={t('common.areYouSureYouWantToDeleteThisTask')}
        buttonContent={t('action.deleteTask')}
        onConfirm={onDelete}
        onBack={handleBack}
      />
    );
  } 

  return (
    <>
      <Popup.Header>
        {t('common.taskActions', {
          context: 'title',
        })}
      </Popup.Header>
      <Popup.Content>
        <Menu secondary vertical className={styles.menu}>
          <NameEdit defaultValue = {defaultName} onUpdate={onNameUpdate}>
            <Menu.Item className={styles.menuItem} onClick={handleClick}>
              {t('action.editDescription', {
                context: 'title',
              })}
            </Menu.Item>
          </NameEdit>
          <Menu.Item className={styles.menuItem} onClick={handleDeleteClick}>
            {t('action.deleteTask', {
              context: 'title',
            })}
          </Menu.Item>
        </Menu>
      </Popup.Content>
    </>
  );
});

ActionsStep.propTypes = {
  // onNameEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  defaultName: PropTypes.string.isRequired,
  onNameUpdate: PropTypes.string.isRequired
};

export default withPopup(ActionsStep);
