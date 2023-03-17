import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ModalTypes from '../constants/ModalTypes';
import FixedContainer from '../containers/FixedContainer';
import StaticContainer from '../containers/StaticContainer';
import UsersModalContainer from '../containers/UsersModalContainer';
import NotificationsModalContainer from '../containers/NotificationsModalContainer';
import UserSettingsModalContainer from '../containers/UserSettingsModalContainer';
import ProjectAddModalContainer from '../containers/ProjectAddModalContainer';
import Background from './Background';
import SidebarWrapper from './SidebarWrapper';
// import UsersListWrapper from './UsersListWrapper';
import img1 from "../assets/images/img1.jpg";

const Core = ({ currentModal, currentProject, theme, loadUI, header, sidebar }) => {
  const [background, setBackground] = useState({});
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(null);
  useEffect(() => {
    loadUI();
  });

  useEffect(() => {
    if(currentProject && !currentProject.background) {
      if(theme === 'bg-light') {
        setBackground({
          background : "#2E98CA"
        });
      } else {
        setBackground({
          background : "#212121"
        })
      }
    } else if(currentProject && currentProject.background) {
      setBackground({});
      if(currentProject.backgroundImage && currentProject.backgroundImage.url) {
        if(process.env.NODE_ENV === "development") {
          setBackgroundImageUrl(currentProject.backgroundImage.url.replace("http://localhost:3000/", "http://localhost:1337/"));
        } else {
          setBackgroundImageUrl(currentProject.backgroundImage.url)
        }
      }
    } else {
      setBackground({})
    }
  }, [currentProject, theme])
  return (
  <div id = "content-box" className = {classNames('content-box', theme,( header ? 'header-active' : "header-inactive"), sidebar ? 'sidebar-active' : "sidebar-inactive")} style = {(currentProject && currentProject.background) ? {} : background}>
     
    {currentProject && currentProject.background && (
      <Background
        type={currentProject.background.type}
        name={currentProject.background.name}
        imageUrl={backgroundImageUrl}
      />
    )}
    {currentProject === undefined && (    
    <Background
    type='image'
    name='backround'
    imageUrl={img1}
  />)}
    <FixedContainer />
      <SidebarWrapper />
      {/* <UsersListWrapper /> */}
      <StaticContainer />
      {currentModal === ModalTypes.USERS && <UsersModalContainer />}
      {currentModal === ModalTypes.NOTIFICATIONS && <NotificationsModalContainer />}
      {currentModal === ModalTypes.USER_SETTINGS && <UserSettingsModalContainer />}
      {currentModal === ModalTypes.PROJECT_ADD && <ProjectAddModalContainer />}
      <div className = 'footer'>
        <p>Powered by <span>Sage7AI</span></p>
      </div>
  </div>
)};

Core.propTypes = {
  currentModal: PropTypes.oneOf(Object.values(ModalTypes)),
  currentProject: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  theme : PropTypes.string.isRequired,
  loadUI: PropTypes.func.isRequired,
  header: PropTypes.bool.isRequired,
  sidebar: PropTypes.bool.isRequired
  // fullscreen: PropTypes.func.isRequired,
  // windowscreen: PropTypes.func.isRequired,
  // setLightUI: PropTypes.func.isRequired,
  // setDarkUI: PropTypes.func.isRequired
};

Core.defaultProps = {
  currentModal: undefined,
  currentProject: undefined,
};

export default Core;
