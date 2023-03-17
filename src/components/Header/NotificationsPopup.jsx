import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { withPopup } from '../../lib/popup';
import { Popup } from '../../lib/custom-ui';

import Paths from '../../constants/Paths';
import { ActionTypes } from '../../constants/Enums';
import User from '../User';

const NotificationsStep = React.memo(({ items, onDelete}) => {
  const [t] = useTranslation();

  const handleDelete = useCallback(
    (id) => {
      onDelete(id);
    },
    [onDelete],
  );

  const renderItemContent = useCallback(
    ({ action, card }) => {
      switch (action.type) {
        case ActionTypes.MOVE_CARD:
          return (
            <p
            >
              <span>{action.user.name}</span>
              {' moved '}
              <Link to={Paths.CARDS.replace(':id', card.id)}>
                {card.name}
              </Link>
              {' from '}
              <span>{action.data.fromList.name}</span>
              {' to '}
              <span>{action.data.toList.name}</span>
            </p>
          );
        case ActionTypes.COMMENT_CARD:
          return (
            <p
            >
              <span>{action.user.name}</span>
              {` left a new comment «${action.data.text}» to `}
              <Link to={Paths.CARDS.replace(':id', card.id)}>
                {card.name}
              </Link>
            </p>
          );
        default:
      }

      return null;
    },
    [],
  );

  return (
    <>
      <Popup.Header>{t('common.notifications')}</Popup.Header>
      <Popup.Content>
        {items.length > 0
          ? 
          <ul className='user_notifications'>
            {items.map((item) => (
              <li key={item.id}>
                {item.card && item.action ? (
                  <div>
                    <User
                      name={item.action.user.name}
                      avatarUrl={item.action.user.avatarUrl}
                      size="tiny"
                    />
                    <p>{renderItemContent(item)}</p>
                  </div>
                ) : (
                  <p>{t('common.cardOrActionAreDeleted')}</p>
                )}
                <button type='button' onClick={() => handleDelete(item.id)}>
                  <i className="fas fa-times"/>
                </button>
              </li>
            ))}
          </ul>
          : <p style={{textAlign:"center", fontSize:'12px'}}>{t('common.noUnreadNotifications')}</p>}
      </Popup.Content>
    </>
  );
});

NotificationsStep.propTypes = {
  items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onDelete: PropTypes.func.isRequired,
};

export default withPopup(NotificationsStep, {
  position: 'bottom right',
});
