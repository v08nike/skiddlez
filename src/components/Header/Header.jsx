import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { Icon, Menu } from 'semantic-ui-react';
// import { Modal } from 'semantic-ui-react';

import Paths from '../../constants/Paths';
import NotificationsPopup from './NotificationsPopup';
// import UserPopup from '../UserPopup';

// import styles from './Header.module.scss';


// notifications,
// isEditable,
// onUsers,

const Header = React.memo(
  ({
    user,
    // onUsers,
    // onClose,
    notifications,
    onNotificationDelete,
    // onUserSettings,
    // onLogout,
    zoom,
    windowscreen,
    fullscreen,
    removeHeader,
    activateHeader,
    header,
    collapse,
    expand
  }) => {
    const [showSearch, setShowSearch] = useState(false);
    const handleZoom = () => {
      const elem = document.getElementById('app');
      if(zoom) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
          document.msExitFullscreen();
        }
        windowscreen();
        activateHeader();
        expand();
      } else {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
          elem.msRequestFullscreen();
        }
        fullscreen();
        collapse();
        removeHeader();
      }
    }

    // const fallbackLogoSrc = '/Assets/Images/rmt-web.png';
    const userOrganizationLogoSrc = `/Assets/Images/${user.organization}.png`;

    const headerClass = header ? 'header' : 'header collapse';
    return (
    <>
    <div className = {headerClass}>
      <div className = 'header-wrapper'>
        <div className = "header-left-section">
          <Link to = {Paths.ROOT}>Skiddlez</Link>
        </div>
        <div className = "header-right-section">
          <div className='header-search'>
            {showSearch && (
              <div className='header-search-input'>
                <input placeholder='Search...'/>
                <button type='button' onClick={() => setShowSearch(false)}>
                  <i className="fas fa-times"/>
                </button>
              </div>
            )}
            {showSearch ?
              <button type='button' className='glass-btn' onClick={() => setShowSearch(false)}>
                <i className="fas fa-times"/>
                <span/>
                <span/>
                <span/>
                <span/>
              </button>
              :
              <button type='button' className='glass-btn' onClick={() => setShowSearch(true)}>
                <i className="fas fa-search"/>
                <span/>
                <span/>
                <span/>
                <span/>
              </button>
            }
          </div>
          <NotificationsPopup id = 'notification-popup' items={notifications} onDelete={onNotificationDelete}>
            <button className = "glass-btn notification-btn" type = "button">
              <i className="fas fa-bell"/>
              {notifications.length > 0 && (
                  <p>{notifications.length}</p>
                )}
                    <span/>
                    <span/>
                    <span/>
                    <span/>
            </button>
          </NotificationsPopup>
          <button className = "glass-btn" type = 'button' onClick = {handleZoom}>
            {zoom ? <i className="fas fa-compress-arrows-alt"/> : <i className="fas fa-expand-arrows-alt"/>}
                    <span/>
                    <span/>
                    <span/>
                    <span/>
          </button>
          <div className='header-user-logo header-user-logo-mob'>
            <img src='/Assets/Images/rmt-mob.png' alt=''/>
          </div>
          <div className='header-user-logo header-user-logo-web'>
            <img
              src={userOrganizationLogoSrc}
              alt={user.organization}
              onError={(e)=>{e.target.onError = null;}}/>
          </div>
        </div>
      </div>
      <button type = 'button' className = 'header-toggle glass-btn' onClick = {() => header ? removeHeader() : activateHeader()}>
        <i className="fas fa-chevron-up"/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
      </button>
    </div>
    </>
  )},
);

Header.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  user: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
  /* eslint-enable react/forbid-prop-types */
  // isEditable: PropTypes.bool.isRequired,
  // onUsers: PropTypes.func.isRequired,
  onNotificationDelete: PropTypes.func.isRequired,
  zoom: PropTypes.bool.isRequired,
  fullscreen: PropTypes.func.isRequired,
  windowscreen: PropTypes.func.isRequired,
  expand: PropTypes.func.isRequired,
  collapse: PropTypes.func.isRequired,
  activateHeader: PropTypes.func.isRequired,
  removeHeader: PropTypes.func.isRequired,
  header: PropTypes.bool.isRequired,
  // onUserSettings: PropTypes.func.isRequired,
  // onLogout: PropTypes.func.isRequired,
  // onClose : PropTypes.func.isRequired
};

export default Header;



// <div className={styles.wrapper}>
// <Link to={Paths.ROOT} className={styles.logo}>
//   Skiddlez
// </Link>
// <Menu inverted size="large" className={styles.menu}>
//   <Menu.Menu position="right">
//     {isEditable && (
//       <Menu.Item className={styles.item} onClick={onUsers}>
//         <Icon fitted name="users" />
//       </Menu.Item>
//     )}
//     <NotificationsPopup items={notifications} onDelete={onNotificationDelete}>
//       <Menu.Item className={styles.item}>
//         <Icon fitted name="bell" />
//         {notifications.length > 0 && (
//           <span className={styles.notification}>{notifications.length}</span>
//         )}
//       </Menu.Item>
//     </NotificationsPopup>
//     <UserPopup onSettings={onUserSettings} onLogout={onLogout}>
//       <Menu.Item className={styles.item}>{user.name}</Menu.Item>
//     </UserPopup>
//   </Menu.Menu>
// </Menu>
// </div>
