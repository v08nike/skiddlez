import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { currentUserSelector } from '../selectors';
import {
  clearCurrentUserEmailUpdateError,
  clearCurrentUserPasswordUpdateError,
  clearCurrentUserUsernameUpdateError,
  closeModal,
  updateCurrentUser,
  updateCurrentUserAvatar,
  updateCurrentUserEmail,
  updateCurrentUserPassword,
  updateCurrentUserUsername,
  closeAccount,
} from '../actions/entry';
import UserSettingsModal from '../components/UserSettingsModal';

const mapStateToProps = (state) => {
  const {
    email,
    name,
    username,
    avatarUrl,
    phone,
    organization,
    subscribeToOwnCards,
    isAvatarUpdating,
    emailUpdateForm,
    passwordUpdateForm,
    usernameUpdateForm,
  } = currentUserSelector(state);

  return {
    email,
    name,
    username,
    avatarUrl,
    phone,
    organization,
    subscribeToOwnCards,
    isAvatarUpdating,
    emailUpdateForm,
    passwordUpdateForm,
    usernameUpdateForm,
    theme : state.theme.theme,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onUpdate: updateCurrentUser,
      onAvatarUpdate: updateCurrentUserAvatar,
      onUsernameUpdate: updateCurrentUserUsername,
      onUsernameUpdateMessageDismiss: clearCurrentUserUsernameUpdateError,
      onEmailUpdate: updateCurrentUserEmail,
      onEmailUpdateMessageDismiss: clearCurrentUserEmailUpdateError,
      onPasswordUpdate: updateCurrentUserPassword,
      onPasswordUpdateMessageDismiss: clearCurrentUserPasswordUpdateError,
      onClose: closeModal,
      onCloseAccount: closeAccount,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsModal);
