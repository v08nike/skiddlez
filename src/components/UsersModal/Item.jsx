import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Radio } from 'semantic-ui-react';
import initials from 'initials';

import DeletePopup from '../DeletePopup';

// import styles from './Item.module.scss';

const Item = React.memo(({ name, email, isAdmin, roleId, roleOptions, onUpdate,
  onDelete, canUpdateUser, canDeleteUser }) => {
  const [t] = useTranslation();
  const [currentRole, setCurrentRole] = useState(null)

  const handleRoleIdChange = useCallback((e) => {
    onUpdate({
      roleId: e.target.value,
    });
  }, [onUpdate]);

  const handleIsAdminChange = useCallback(() => {
    onUpdate({
      isAdmin: !isAdmin,
    });
  }, [isAdmin, onUpdate]);

  // let currentRole;

  useEffect(() => {
    roleOptions.forEach(role => {
      if(parseInt(roleId, 10) === role.value) {
        setCurrentRole(role.text);
      }
    })
  },[roleOptions,roleId, setCurrentRole])

  return (
    <>
      <li>
        <ul>
          <li><span>{initials(name)}</span></li>
          <li>
            <h4>{name}<span>({currentRole})</span></h4>
            <p>{email}</p>
          </li>
          {/* <li><Radio toggle checked={isAdmin} onChange={handleIsAdminChange} /></li> */}
          { canUpdateUser &&
          <>
            <li className='role-select'>
              <h6>Role</h6>
              <select value={roleId} name = 'roleId' onChange={(e) => handleRoleIdChange(e)}>
                <option value='' disabled selected style={{display : 'none'}}>Select Role</option>
                {roleOptions.length > 0 && (
                  roleOptions.map(role => <option key = {`role-----${role.key}`} value = {role.value}>{role.text}</option>)
                )}
              </select>
            </li>
            <li>
              <Radio toggle checked={isAdmin} onChange={handleIsAdminChange} />
            </li>
          </>
          }
          <li>
          { canDeleteUser &&
            <DeletePopup
              title={t('common.deleteUser', {
                context: 'title',
              })}
              content={t('common.areYouSureYouWantToDeleteThisUser')}
              buttonContent={t('action.deleteUser')}
              onConfirm={onDelete}
            >
              <button className = 'user-delete' content={t('action.delete')} type='button' >
                <i className="fas fa-user-minus"/>
              </button>
            </DeletePopup>
          }
          </li>
        </ul>
      </li>
    {/* <Table.Row>
    <Table.Cell>{initials(name)}</Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{email}</Table.Cell>
      <Table.Cell collapsing>
        <Radio toggle checked={isAdmin} onChange={handleIsAdminChange} />
      </Table.Cell>
      <Table.Cell collapsing>
        <DeletePopup
          title={t('common.deleteUser', {
            context: 'title',
          })}
          content={t('common.areYouSureYouWantToDeleteThisUser')}
          buttonContent={t('action.deleteUser')}
          onConfirm={onDelete}
        >
          <button className = 'user-delete' content={t('action.delete')} type='button' >
          <i className="far fa-trash-alt"/>
          </button>
        </DeletePopup>
      </Table.Cell>
    </Table.Row> */}
    </>
  );
});

Item.propTypes = {
  name: PropTypes.string.isRequired,
  // username: PropTypes.string,
  email: PropTypes.string.isRequired,
  roleId: PropTypes.string.isRequired,
  roleOptions: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  isAdmin: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  canUpdateUser: PropTypes.bool.isRequired,
  canDeleteUser: PropTypes.bool.isRequired,
};

// Item.defaultProps = {
//   username: undefined,
// };

export default Item;
