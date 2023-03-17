import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import hasPermision from '../../utils/has-permission';

import { withPopup } from '../../lib/popup';
import { useSteps } from '../../hooks';
import User from '../User';
import DeleteStep from '../DeleteStep';

// import styles from './MembershipEditPopup.module.scss';

const StepTypes = {
  DELETE: 'DELETE',
};

const MembershipEditStep = React.memo(({ user, isEditable, onDelete, theme }) => {
  const [t] = useTranslation();
  const [step, openStep, handleBack] = useSteps();

  const [found, currentUserRoleId] = hasPermision('user_accessible_in_same_domain:delete');

  let canDeleteUser = found;

  // // A user can only remove another user equal or lower in rank.
  // // BTW, redux-orm decides to set roleId as integer here,
  // // instead of a full fledged object. Economical I guess ...
  // if (user.roleId < currentUser.roleId) {
  if (user.roleId < currentUserRoleId) {
    canDeleteUser = false;
  }

  const handleDeleteClick = useCallback(() => {
    openStep(StepTypes.DELETE);
  }, [openStep]);

  if (step && step.type === StepTypes.DELETE) {
    return (
      <DeleteStep
        title={t('common.removeMember', {
          context: 'title',
        })}
        content={t('common.areYouSureYouWantToRemoveThisMemberFromProject')}
        buttonContent={t('action.removeMember')}
        onConfirm={onDelete}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className = {theme}>
      <div className = 'project-members-member'>
      <span>
        <User name={user.name} avatarUrl={user.avatarUrl} size="large" />
      </span>
      <div>
        <span>{user.name}</span>
        <span>{user.email}</span>
        {!user.isCurrent && isEditable && canDeleteUser && (
          <button
            type = 'button'
            onClick={handleDeleteClick}
          >{t('action.removeFromProject')}</button>
        )}
      </div>
    </div>
    </div>
  );
});

MembershipEditStep.propTypes = {
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isEditable: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  theme:PropTypes.string.isRequired
};

export default withPopup(MembershipEditStep);
