import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { useTranslation, Trans } from 'react-i18next';

import { ActionTypes } from '../../constants/Enums';
import User from '../User';

// import styles from './Item.module.scss';

const Item = React.memo(({ type, data, createdAt, user }) => {
  const [t] = useTranslation();
  let contentNode;

  const trimText = (ttt) => {
    if (ttt.length > 32) {
      return ttt.substring(0, 32).concat('...');
    }
    return ttt;
  }

  switch (type) {
    case ActionTypes.CREATE_CARD:
      contentNode = (
        <Trans
          i18nKey="common.userAddedThisCardToList"
          values={{
            user: user.name,
            list: data.list.name,
          }}
        >
          <span>{user.name}</span>
          <span>
            {' added this card to '}
            {data.list.name}
          </span>
        </Trans>
      );

      break;
    case ActionTypes.MOVE_CARD:
      contentNode = (
        <Trans
          i18nKey="common.userMovedThisCardFromListToList"
          values={{
            user: user.name,
            fromList: data.fromList.name,
            toList: data.toList.name,
          }}
        >
          <span>{user.name}</span>
          <span>
            {' moved this card from '}
            {data.fromList.name}
            {' to '}
            {data.toList.name}
          </span>
        </Trans>
      );

      break;
    case ActionTypes.COMMENT_CARD:
      contentNode = (
        <span>{trimText(data.text)}</span>
      );
      break;
    default:
      contentNode = null;
  }

  return (
    <div className='card-modal-comment'>
      <ul>
        <li>
          <User size = "tiny" name={user.name} avatarUrl={user.avatarUrl} />
        </li>
        <li>
          {contentNode}
        </li>
        <li>
          <span>
            {t('format:longDateTime', {
              postProcess: 'formatDate',
              value: createdAt,
            })}
          </span>
        </li>
      </ul>
    </div>
  );
});

Item.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  createdAt: PropTypes.instanceOf(Date).isRequired,
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Item;
