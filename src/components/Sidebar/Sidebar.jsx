import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import initials from 'initials';
import UserPopup from '../UserPopup';
// import NotificationsPopup from '../Header/NotificationsPopup';
// import { Icon, Menu } from 'semantic-ui-react';
// import styles from '../Header/Header.module.scss';

const getPureUrl=(avatarUrl)=>{
    const url1 = avatarUrl.split("avatars/")
     const url2=url1[1].split("/square")
     return url2[0]
   }

const getUrl=(avatarUrl)=>{
    let url = null;
    if(avatarUrl) {
        if(avatarUrl.indexOf('https://lh3.googleusercontent.com') !== -1) {
          url = getPureUrl(avatarUrl);
        } else if(process.env.NODE_ENV === 'development') {
          url = avatarUrl.replace('http://localhost:3000', 'http://localhost:1337');
        } else {
            url = avatarUrl;
        }
    }
    return url;
}
const Sidebar = React.memo(({ currentModal,onUsers, onUserSettings, onLogout, user, setDarkUI, setLightUI, theme, sidebar, expand, collapse, history, location}) => {
    const [currentTab, setCurrentTab] = useState(0);
    useEffect(() => {
        if(currentModal) {
            if(currentModal === "USERS") {
                setCurrentTab(3);
            } else if(currentModal === "USER_SETTINGS") {
                setCurrentTab(4);
            }
        } else if(!currentModal){
            if(location.pathname === '/') {
                setCurrentTab(0);
            } else if(location.pathname.indexOf('/boards') !== -1 || location.pathname.indexOf('/projects') !== -1) {
                localStorage.setItem('skiddlez-lastBoardId', location.pathname);
                setCurrentTab(2);

                // // When the user views a board,
                // // we check for the last viewed card
                // // which was not explicitly closed,
                // // in an associative array which can be
                // // accessed by this key...
                const lsKey = `skiddlez-boardCardLog-${user.id}`;
                if(localStorage.getItem(lsKey)) {
                    const boardCardLog = JSON.parse(localStorage.getItem(lsKey));

                    // // current board url
                    const boardId = localStorage.getItem(
                      'skiddlez-lastBoardId');

                    if (boardCardLog[boardId]) {
                      // // display the last viewed card,
                      // // for this board, for this user.
                      history.push(boardCardLog[boardId]);
                    }
                }

            } else if(location.pathname.indexOf('/cards') !== -1) {

                if(localStorage.getItem('skiddlez-lastBoardId')) {
                  // // last board id
                  const lastBoardId = localStorage.getItem('skiddlez-lastBoardId');

                  // // Everytime a card is viewed, we store
                  // // the board id url and card id url
                  // // in an associative array which can be
                  // // accessed by this key...
                  const lsKey = `skiddlez-boardCardLog-${user.id}`;

                  let boardCardLog = {};
                  if(localStorage.getItem(lsKey)) {
                      boardCardLog = JSON.parse(localStorage.getItem(lsKey));
                  }
                  boardCardLog[lastBoardId] = location.pathname;

                  // // persist to user's browser
                  localStorage.setItem(lsKey, JSON.stringify(boardCardLog));
                }

                setCurrentTab(2);
            } else {
              setCurrentTab(1);
            }
        }

        // console.log('sidebar detected location as ', location);

    }, [location, currentModal, history, user])
    const handleNavigation = (flag) => {
        if(flag === 0) {
            history.push('/');
            setCurrentTab(0);
        } else if(flag === 1) {
            history.push('/dashboard');
            setCurrentTab(1);
        } else if(flag === 2) {
            if(localStorage.getItem('skiddlez-lastBoardId')) {
              history.push(localStorage.getItem('skiddlez-lastBoardId'));
              setCurrentTab(2)
            }
        } else if(flag === 3) {
            onUsers();
            setCurrentTab(3);
        } else if(flag === 4) {
            onUserSettings();
            setCurrentTab(4);
        }
    }

    const userImage = user.avatarUrl === null ? null : getUrl(user.avatarUrl)

    return (
        <div className = {classNames('sidebar', sidebar ? "" : "collapse")}>
            <ul>
                <li>
                    <button className={currentTab === 0 ? "active-sidebar-link" : ""} type = "button" onClick = {() => handleNavigation(0)}>
                    <i className="fas fa-chart-line"/><p>Activity</p>
                    </button>
                </li>
                <li>
                    <button className={currentTab === 1 ? "active-sidebar-link" : ""} type = "button" onClick = {() => handleNavigation(1)}>
                    <i className="fas fa-th-list"/><p>Projects</p>
                    </button>
                </li>
                <li>
                    <button className={currentTab === 2 ? "active-sidebar-link" : ""} type = "button" onClick = {() => handleNavigation(2)}>
                    <i className="fas fa-clipboard-list"/><p>Board</p>
                    </button>
                </li>
                <li>
                    <button className={currentTab === 3 ? "active-sidebar-link" : ""} onClick={() => handleNavigation(3)} type="button">
                    <i className="fas fa-users"/><p>Members</p>
                    </button>
                    </li>
                    <li>
                    <button className={currentTab === 4 ? "active-sidebar-link" : ""} onClick={() => handleNavigation(4)} type="button">
                    <i className="fa fa-cog"/><p>Settings</p>
                    </button>
                    </li>
                <li>
                    <UserPopup id = 'user-modal-sidebar' onSettings = {onUserSettings} user = {user} mode = {theme} setDarkUI = {setDarkUI} setLightUI = {setLightUI} onLogout = {onLogout}>
                        <button type = 'button'>
                            {userImage !== null ? <img src = {userImage} alt =''/> : <span>{initials(user.name)}</span>}
                        </button>
                    </UserPopup>
                </li>
            </ul>
                <button type = 'button' className = 'sidebar-toggle glass-btn' onClick = {sidebar ? collapse : expand}>
                    <i className="fas fa-chevron-left"/>
                    <span/><span/><span/><span/>
                </button>
        </div>
    )
});

Sidebar.propTypes = {
    /* eslint-disable react/forbid-prop-types */

    user: PropTypes.object.isRequired,
    onUsers: PropTypes.func.isRequired,
    currentModal:PropTypes.string,
    // openNotifications: PropTypes.func.isRequired,
    onUserSettings: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    theme: PropTypes.string.isRequired,
    setDarkUI: PropTypes.func.isRequired,
    setLightUI: PropTypes.func.isRequired,
    sidebar: PropTypes.bool.isRequired,
    expand: PropTypes.func.isRequired,
    collapse: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
};

Sidebar.defaultProps = {
    currentModal : undefined
}

export default withRouter(Sidebar);
