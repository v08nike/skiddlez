import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// import { useSelector } from 'react-redux';
// import { roleByIdSelector } from '../../selectors/role';

import { withPopup } from '../../lib/popup';
import { Popup } from '../../lib/custom-ui';

const UserStep = React.memo(({ onSettings, onLogout, onClose, user, setDarkUI, setLightUI, mode  }) => {

  const [t] = useTranslation();
  const [userMenu, setUsermenu] = useState(false);
  const handleSettingsClick = useCallback(() => {
    onSettings();
    onClose();
  }, [onSettings, onClose]);

  const handleThemeMenu = () => {
    if(userMenu) {
        setUsermenu(false)
    } else {
        setUsermenu(true)
    }
  }


  return (
    <>
      <div className = {mode}>
      <Popup.Content>
          <ul className = 'user-menu'>
            <li>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </li>
            <li>
              <button type = 'button' onClick = {handleSettingsClick}>
                <i className="fas fa-cogs"/>
                <span>{t('common.settings')}</span>
              </button>
            </li>
            <li>
              <i className="far fa-moon"/>
              <span>Theme</span>
              <button onClick = {()=>handleThemeMenu()} type = 'button'>{mode === 'bg-light' ? 'Light mode' : 'Dark mode'}<i className="fas fa-sort-down"/></button>
              {userMenu &&
                <ul className = 'theme-menu'>
                  <li><button type = 'button' onClick = {() => {
                    setLightUI();
                    handleThemeMenu();
                  }}>Light mode</button></li>
                  <li><button type = 'button' onClick = {() => {
                    setDarkUI();
                    handleThemeMenu();
                  }}>Dark mode</button></li>
                </ul>
                }
            </li>
            <li>
              <button type = 'button' onClick = {() => onLogout()}>
                <i className="fas fa-sign-out-alt"/>
                <span>{t('action.logOut_title')}</span>
              </button>
            </li>
            <li>
              <p>version 0.1.6</p>
            </li>
          </ul>
      </Popup.Content>
      </div>
    </>
  );
});

UserStep.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  onSettings: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  setDarkUI: PropTypes.func.isRequired,
  setLightUI: PropTypes.func.isRequired,
  user:PropTypes.object.isRequired
};

export default withPopup(UserStep, {
  position: 'bottom right',
});
