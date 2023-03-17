import pick from 'lodash/pick';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Menu } from 'semantic-ui-react';
import { withPopup } from '../../lib/popup';
import { Popup } from '../../lib/custom-ui';
import NameEdit from './NameEdit';

import { useSteps } from '../../hooks';
import ProjectMembershipsStep from '../ProjectMembershipsStep';
import LabelsStep from '../LabelsStep';
import DueDateEditStep from '../DueDateEditStep';
// import TimerEditStep from '../TimerEditStep';
import CardMoveStep from '../CardMoveStep';
import CardStatusStep from '../CardStatusStep';
import DeletePopup from '../DeleteStep/DeletePopup';

import styles from './ActionsPopup.module.scss';

const StepTypes = {
  USERS: 'USERS',
  LABELS: 'LABELS',
  EDIT_DUE_DATE: 'EDIT_DUE_DATE',
  MOVE: 'MOVE',
  STATUS: 'STATUS',
};

const ActionsStep = React.memo(
  ({
    name,
    onNameUpdate,
    card,
    projectsToLists,
    projectMemberships,
    currentUserIds,
    labels,
    currentLabelIds,
    onUpdate,
    onMove,
    onTransfer,
    onDelete,
    onUserAdd,
    onUserRemove,
    onBoardFetch,
    onLabelAdd,
    onLabelRemove,
    onLabelCreate,
    onLabelUpdate,
    onLabelDelete,
    onClose,
  }) => {
    const [t] = useTranslation();
    const [step, openStep, handleBack] = useSteps();

    const handleUsersClick = useCallback(() => {
      openStep(StepTypes.USERS);
    }, [openStep]);

    const handleLabelsClick = useCallback(() => {
      openStep(StepTypes.LABELS);
    }, [openStep]);

    const handleEditDueDateClick = useCallback(() => {
      openStep(StepTypes.EDIT_DUE_DATE);
    }, [openStep]);

    const handleMoveClick = useCallback(() => {
      openStep(StepTypes.MOVE);
    }, [openStep]);

    const handleStatusClick = useCallback(() => {
      openStep(StepTypes.STATUS);
    }, [openStep]);

    const handleDueDateUpdate = useCallback(
      (dueDate) => {
        onUpdate({
          dueDate,
        });
      },
      [onUpdate],
    );

    if (step) {
      switch (step.type) {
        case StepTypes.USERS:
          return (
            <ProjectMembershipsStep
              items={projectMemberships}
              currentUserIds={currentUserIds}
              onUserSelect={onUserAdd}
              onUserDeselect={onUserRemove}
              onBack={handleBack}
            />
          );
        case StepTypes.LABELS:
          return (
            <LabelsStep
              items={labels}
              currentIds={currentLabelIds}
              onSelect={onLabelAdd}
              onDeselect={onLabelRemove}
              onCreate={onLabelCreate}
              onUpdate={onLabelUpdate}
              onDelete={onLabelDelete}
              onBack={handleBack}
            />
          );
        case StepTypes.EDIT_DUE_DATE:
          return (
            <DueDateEditStep
              defaultValue={card.dueDate}
              onUpdate={handleDueDateUpdate}
              onBack={handleBack}
              onClose={onClose}
            />
          );
        case StepTypes.MOVE:
          return (
            <CardMoveStep
              projectsToLists={projectsToLists}
              defaultPath={pick(card, ['projectId', 'boardId', 'listId'])}
              onMove={onMove}
              onTransfer={onTransfer}
              onBoardFetch={onBoardFetch}
              onBack={handleBack}
              onClose={onClose}
            />
          );
        case StepTypes.STATUS:
          return (
            <CardStatusStep
              defaultData={card}
              onUpdate={onUpdate}
              onClose={onClose}
            />
          );
        default:
      }
    }

    return (
      <>
        <Popup.Header>
          {t('common.cardActions', {
            context: 'title',
          })}
        </Popup.Header>
        <Popup.Content>
          <Menu secondary vertical className={styles.menu}>
            <NameEdit defaultValue = {name} onUpdate = {onNameUpdate}>
              <Menu.Item className={styles.menuItem}>
                {t('action.editTitle', {
                  context: 'title',
                })}
              </Menu.Item>
            </NameEdit>
            <Menu.Item className={styles.menuItem} onClick={handleUsersClick}>
              {t('common.members', {
                context: 'title',
              })}
            </Menu.Item>
            <Menu.Item className={styles.menuItem} onClick={handleLabelsClick}>
              {t('common.labels', {
                context: 'title',
              })}
            </Menu.Item>
            <Menu.Item className={styles.menuItem} onClick={handleEditDueDateClick}>
              {t('action.editDueDate', {
                context: 'title',
              })}
            </Menu.Item>
            <Menu.Item className={styles.menuItem} onClick={handleMoveClick}>
              {t('action.moveCard', {
                context: 'title',
              })}
            </Menu.Item>
            <Menu.Item className={styles.menuItem} onClick={handleStatusClick}>
              {t('action.setStatus')}
            </Menu.Item>
            <DeletePopup
              title={t('common.deleteCard', {
                context: 'title',
              })}
              content={t('common.areYouSureYouWantToDeleteThisCard')}
              buttonContent={t('action.deleteCard')}
              onConfirm={onDelete}
              onBack={handleBack}
            >
            <Menu.Item className={styles.menuItem}>
              {t('action.deleteCard', {
                context: 'title',
              })}
            </Menu.Item>
            </DeletePopup>
          </Menu>
        </Popup.Content>
      </>
    );
  },
);

ActionsStep.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  name : PropTypes.string.isRequired,
  card: PropTypes.object.isRequired,
  projectsToLists: PropTypes.array.isRequired,
  projectMemberships: PropTypes.array.isRequired,
  currentUserIds: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  currentLabelIds: PropTypes.array.isRequired,
  /* eslint-enable react/forbid-prop-types */
  // onNameEdit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onTransfer: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUserAdd: PropTypes.func.isRequired,
  onUserRemove: PropTypes.func.isRequired,
  onBoardFetch: PropTypes.func.isRequired,
  onLabelAdd: PropTypes.func.isRequired,
  onLabelRemove: PropTypes.func.isRequired,
  onLabelCreate: PropTypes.func.isRequired,
  onLabelUpdate: PropTypes.func.isRequired,
  onLabelDelete: PropTypes.func.isRequired,
  onNameUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withPopup(ActionsStep);
