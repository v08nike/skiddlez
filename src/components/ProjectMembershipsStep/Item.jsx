import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { Menu } from 'semantic-ui-react';

import User from '../User';

// import styles from './Item.module.scss';

const Item = React.memo(({ isActive, user, onUserSelect, onUserDeselect }) => {
  const handleToggleClick = useCallback(() => {
    if (isActive) {
      onUserDeselect();
    } else {
      onUserSelect();
    }
  }, [isActive, onUserSelect, onUserDeselect]);

  return (
    <li>
      <button type='button' onClick={handleToggleClick}>
        <User name={user.name} avatarUrl={user.avatarUrl} size = "tiny" />
        <span>{user.name}</span>
        {isActive && (<i className="fas fa-check"/>)}
      </button>
    </li>
  );
});

Item.propTypes = {
  // isPersisted: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onUserSelect: PropTypes.func.isRequired,
  onUserDeselect: PropTypes.func.isRequired,
};

export default Item;
