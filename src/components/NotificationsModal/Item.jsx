import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Radio } from 'semantic-ui-react';
import initials from 'initials';

import DeletePopup from '../DeletePopup';

// import styles from './Item.module.scss';

const Item = React.memo(({ name, email, isAdmin, onUpdate, onDelete }) => {
  const [t] = useTranslation();

  const handleIsAdminChange = useCallback(() => {
    onUpdate({
      isAdmin: !isAdmin,
    });
  }, [isAdmin, onUpdate]);

  return (
    <>
      <li>
        <ul>
          <li><span>{initials(name)}</span></li>
          <li>
            <h4>{name}</h4>
            <p>{email}</p>
          </li>
          <li><Radio toggle checked={isAdmin} onChange={handleIsAdminChange} /></li>
          <li>
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
          </li>
        </ul>
      </li>
    {/* <Table.Row>
    <Table.Cell>{shortName}</Table.Cell>
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
  isAdmin: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// Item.defaultProps = {
//   username: undefined,
// };

export default Item;
