import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import Sidebar from "./Sidebar";
import { collapseSidebar, expandSidebar } from "../actions/sidebar";
import { openUsersModal, openNotificationsModal, openUserSettingsModal, logout, } from '../actions/entry';
import {setDarkTheme, setLightTheme} from '../actions/theme'
import { currentModalSelector,currentUserSelector } from '../selectors';
 
const mapStateToProps = (state) => {
  const currentUser = currentUserSelector(state);
  const currentModal = currentModalSelector(state);

  return {
    currentModal,
    user: currentUser,
    isEditable: currentUser.isAdmin,
    theme : state.theme.theme,
    sidebar : state.sidebar.active
  };
};


const mapDispatchToProps = (dispatch) => bindActionCreators({
    setDarkUI : setDarkTheme,
    setLightUI : setLightTheme,
    collapse : collapseSidebar,
    expand : expandSidebar,
    onUsers : openUsersModal,
    openNotifications : openNotificationsModal,
    onUserSettings: openUserSettingsModal,
    onLogout: logout,
    },dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar))