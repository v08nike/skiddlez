import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { currentUserSelector, notificationsForCurrentUserSelector } from '../selectors';
import {zoomIn,zoomOut} from '../actions/zoom';
import {
  deleteNotification,
  logout,
  openUserSettingsModal,
  openUsersModal,
  closeModal
} from '../actions/entry';

// import { setDarkTheme, setLightTheme } from '../actions/theme';
// import { closeModal } from '../actions/entry';
import { collapseSidebar, expandSidebar } from '../actions/sidebar';
import { collapseHeader, expandHeader } from '../actions/header';
import Header from '../components/Header';

const mapStateToProps = (state) => {
  const currentUser = currentUserSelector(state);
  const notifications = notificationsForCurrentUserSelector(state);

  return {
    notifications,
    user: currentUser,
    isEditable: currentUser.isAdmin,
    sidebar: state.sidebar.active,
    header: state.header.active,
    theme : state.theme.theme,
    zoom: state.zoom.zoom
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onUsers: openUsersModal, // TODO: rename
      onNotificationDelete: deleteNotification,
      onUserSettings: openUserSettingsModal,
      onLogout: logout,
      expand : expandSidebar,
      collapse : collapseSidebar,
      onClose: closeModal,
      fullscreen : zoomIn,
      windowscreen : zoomOut, 
      removeHeader: collapseHeader,
      activateHeader: expandHeader
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Header);
