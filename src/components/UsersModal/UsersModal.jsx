import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
import { Modal } from 'semantic-ui-react';
import classNames from 'classnames';

import { Roles } from '../../constants/Enums';
import hasPermision from '../../utils/has-permission';

import UserAddPopupContainer from '../../containers/UserAddPopupContainer';
import Item from './Item';

const UsersModal = React.memo(({ items, onUpdate, onDelete, onClose, theme }) => {
  // const [t] = useTranslation();

  const handleUpdate = useCallback(
    (id, data) => {
      onUpdate(id, data);
    },
    [onUpdate],
  );

  const handleDelete = useCallback(
    (id) => {
      onDelete(id);
    },
    [onDelete],
  );

  const [canCreateUser] = hasPermision('user_accessible_in_same_domain:create');

  // const [canReadUser] = hasPermision('user_accessible_in_same_domain:read');

  const [canUpdateUser] = hasPermision('user_accessible_in_same_domain:update');

  console.log('canUpdateUser ', canUpdateUser);

  const [canDeleteUser, currentUserRoleId] = hasPermision('user_accessible_in_same_domain:delete');

  // // Display the range of role types this user can create
  const roleOptions = [];
  Object.keys(Roles).forEach(k => {
    // // A user can only create accounts with role number
    // // equal or larger than its own
    // if (Roles[k] >= currentUser.roleId) {
    if (Roles[k] >= currentUserRoleId) {
      roleOptions.push({key: Roles[k], value: Roles[k], text: (k)});
    }
  });

  return (
    <Modal id = 'user-modal' closeIcon open onClose={onClose} className = {classNames(theme)}>
      <div className = "user-modal-header">
        <div className = "user-modal-header-section1">
          <h3>Users</h3>
        </div>
        <div className = "user-modal-header-section2">
          {canCreateUser &&
            <UserAddPopupContainer>
              <button type = "button" className='glass-btn'>
                <i className="fas fa-user-plus"/>
                <span/><span/><span/><span/>
              </button>
            </UserAddPopupContainer>
          }
        </div>
      </div>
        <ul className = "user-modal-table">
        
          {items.map((item) => {
            const currentUserHasHigherRank = currentUserRoleId <= item.roleId;

            const kanUpdateUser = canUpdateUser && currentUserHasHigherRank;
            const kanDeleteUser = canDeleteUser && currentUserHasHigherRank;

            return (
            <Item
              key={item.id}
              name={item.name}
              username={item.username}
              email={item.email}
              isAdmin={item.isAdmin}
              roleId={item.roleId}
              roleOptions={roleOptions}
              canUpdateUser={kanUpdateUser}
              canDeleteUser={kanDeleteUser}
              onUpdate={(data) => handleUpdate(item.id, data)}
              onDelete={() => handleDelete(item.id)}
            />);
          })}
        </ul>
    </Modal>
  );
});

UsersModal.propTypes = {
  items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  theme: PropTypes.func.isRequired
};

export default UsersModal;
