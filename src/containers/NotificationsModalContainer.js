import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { allUsersExceptCurrentSelector, notificationsForCurrentUserSelector } from '../selectors';
import { closeModal, deleteUser, updateUser, deleteNotification, } from '../actions/entry';
import { setDarkTheme, setLightTheme } from '../actions/theme';
import NotificationsModal from '../components/NotificationsModal';
import { notificationmodalOpen, notificationmodalClose } from '../actions/notificationmodal';

const mapStateToProps = (state) => {
  const items = allUsersExceptCurrentSelector(state);
  const notifications = notificationsForCurrentUserSelector(state);

  return {
    items,
    notifications,
    theme : state.theme.theme,
    notificationmodal:state.notificationmodal.active
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onUpdate: updateUser,
      onDelete: deleteUser,
      onClose: closeModal,
      setDarkUI : setDarkTheme,
      onNotificationDelete: deleteNotification,
      setLightUI : setLightTheme,
      notificationmodalopen:  notificationmodalOpen,
      notificationmodalclose:  notificationmodalClose
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsModal);
