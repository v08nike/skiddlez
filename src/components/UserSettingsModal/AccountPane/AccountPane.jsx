import React, { useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
import { Modal} from 'semantic-ui-react';
import classNames from 'classnames';

import InformationEdit from './InformationEdit';
import AvatarEditPopup from './AvatarEditPopup';
import UsernameEditPopup from './UsernameEditPopup';
// import EmailEditPopup from './EmailEditPopup';
import PasswordEditPopup from './PasswordEditPopup';
import User from '../../User';
// import styles from './AccountPane.module.scss';

function modalReducer(state, action){
  switch (action.type) {
    case 'close':
      return {open: false, delEnabled: false}  
    case 'open':
      return {open: true, delEnabled: false}
    case 'delEnalbe':
      return {open: true, delEnabled: true}
    case 'delEnalbeN':
      return {open: true, delEnabled: false}
    default:
      throw new Error('Unsupported action...')
  }
}
const AccountPane = React.memo(
  ({
    // email,
    name,
    username,
    avatarUrl,
    phone,
    organization,
    isAvatarUpdating,
    usernameUpdateForm,
    // emailUpdateForm,
    passwordUpdateForm,
    onUpdate,
    onAvatarUpdate,
    onUsernameUpdate,
    onUsernameUpdateMessageDismiss,
    // onEmailUpdate,
    // onEmailUpdateMessageDismiss,
    onPasswordUpdate,
    onPasswordUpdateMessageDismiss,
    onCloseAccount,
    theme
  }) => {
    // const [t] = useTranslation();
    const delString = "delete my account"
    const handleAvatarDelete = useCallback(() => {
      onUpdate({
        avatarUrl: null,
      });
    }, [onUpdate]);

    const [state, dispatch] = useReducer(modalReducer, {
      open: false,
      delEnabled: false,
      delTxt: '',
    })
    const {open, delEnabled, delTxt} = state

    const handleFieldChange=(e)=>{
      const curValue = e.target.value;
      if (curValue === delString) dispatch({type: "delEnalbe"})
      else dispatch({type: "delEnalbeN"})
    }

    const handleCloseAccount = useCallback(() => {
      onCloseAccount()
    }, [onCloseAccount]);

    return (
        <div className = 'settings-modal-content'>
          <div className = 'account-settings'>
            <div className='account-box'>
            <div className='avatar-wrapper'>
              <AvatarEditPopup
                defaultValue={avatarUrl}
                onUpdate={onAvatarUpdate}
                onDelete={handleAvatarDelete}
                >
                  <User name={name} avatarUrl={avatarUrl} size="massive" isDisabled={isAvatarUpdating} />
              </AvatarEditPopup>
              
            </div>
          <div className = 'settings-actions'>
            <ul>
              <li>
                <UsernameEditPopup
                  defaultData={usernameUpdateForm.data}
                  username={username}
                  isSubmitting={usernameUpdateForm.isSubmitting}
                  error={usernameUpdateForm.error}
                  onUpdate={onUsernameUpdate}
                  onMessageDismiss={onUsernameUpdateMessageDismiss}
                >
                  <button className='glass-btn edit' type = 'button'>Edit Username<span/><span/><span/><span/></button>
                </UsernameEditPopup>
              </li>
              {/* <li>
                <EmailEditPopup
                  defaultData={emailUpdateForm.data}
                  email={email}
                  isSubmitting={emailUpdateForm.isSubmitting}
                  error={emailUpdateForm.error}
                  onUpdate={onEmailUpdate}
                  onMessageDismiss={onEmailUpdateMessageDismiss}
                >
                  <button className='glass-btn' type = 'button'>Edit Email<span/><span/><span/><span/></button>
                </EmailEditPopup>
              </li> */}
              <li>
              <PasswordEditPopup
                defaultData={passwordUpdateForm.data}
                isSubmitting={passwordUpdateForm.isSubmitting}
                error={passwordUpdateForm.error}
                onUpdate={onPasswordUpdate}
                onMessageDismiss={onPasswordUpdateMessageDismiss}
              >
                <button className='glass-btn edit' type = 'button'>Edit Password<span/><span/><span/><span/></button>
              </PasswordEditPopup>
              </li>
              <li>
                
            <button className='glass-btn danger' type='button' onClick={()=> dispatch({type: 'open'})}>Close Account<span/><span/><span/><span/></button>              
            <Modal closeIcon className={classNames(theme)} id = "delete-account-modal" size="tiny" open={open} onClose={() => {dispatch({type : "close"})}}>
              <Modal.Header>Are you sure you want to delete your account?</Modal.Header>
              <Modal.Content>
                <div className='delete-account-modal'>
                  <p>We will immediately delete all of your project, along with all of your boards, shared boards and invited friends.</p>
                  <p>You will no longer be billed, and your username will be available to anyone on Kanplank.</p>
                  <p>To verify, type <b>{delString}</b> below:</p>
                  <ul className='delete-account-modal-actions'>
                    <li>
                      <input value={delTxt} onChange={handleFieldChange}/>
                    </li>
                    <li>
                      <button type='button' className='glass-btn' onClick={()=> dispatch({type: 'close'})}>No<span/><span/><span/><span/></button>
                    </li>
                    <li>
                      <button type='button' className='glass-btn danger' onClick={handleCloseAccount} disabled={!delEnabled}>Cancel plan and delete this account<span/><span/><span/><span/></button>
                    </li>
                  </ul>
                </div>
              </Modal.Content>
            </Modal>
              </li>
            </ul>
          </div>
            </div>
            <InformationEdit
              defaultData={{
                name,
                phone,
                organization,
              }}
              onUpdate={onUpdate}
            />
          </div>
        </div>
    );
  },
);

AccountPane.propTypes = {
  // email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string,
  avatarUrl: PropTypes.string,
  phone: PropTypes.string,
  organization: PropTypes.string,
  isAvatarUpdating: PropTypes.bool.isRequired,
  /* eslint-disable react/forbid-prop-types */
  usernameUpdateForm: PropTypes.object.isRequired,
  // emailUpdateForm: PropTypes.object.isRequired,
  passwordUpdateForm: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
  onUpdate: PropTypes.func.isRequired,
  onAvatarUpdate: PropTypes.func.isRequired,
  onUsernameUpdate: PropTypes.func.isRequired,
  onUsernameUpdateMessageDismiss: PropTypes.func.isRequired,
  // onEmailUpdate: PropTypes.func.isRequired,
  // onEmailUpdateMessageDismiss: PropTypes.func.isRequired,
  onPasswordUpdate: PropTypes.func.isRequired,
  onPasswordUpdateMessageDismiss: PropTypes.func.isRequired,
  onCloseAccount: PropTypes.func.isRequired,
  theme : PropTypes.string.isRequired
};

AccountPane.defaultProps = {
  username: undefined,
  avatarUrl: undefined,
  phone: undefined,
  organization: undefined,
};

export default AccountPane;
