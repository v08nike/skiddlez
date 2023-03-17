import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import globalStyles from '../../../styles.module.scss';

const Item = React.memo(({ name, color, isPersisted, isActive, onSelect, onDeselect, onEdit }) => {
  const handleToggleClick = useCallback(() => {
    if (isActive) {
      onDeselect();
    } else {
      onSelect();
    }
  }, [isActive, onSelect, onDeselect]);

  return (
    <li>
      <button
        active={isActive}
        disabled={!isPersisted}
        className={classNames(
          globalStyles[`background${upperFirst(camelCase(color))}`],
        )}
        onClick={handleToggleClick}
        type='button'
      >{name}
        {isActive && <i className="fas fa-check"/>}
      </button>
      {isPersisted && (
        <button
          onClick={onEdit}
          type='button'
          className='glass-btn edit'
        >
          <i className="fas fa-pencil-alt"/>
          <span/><span/><span/><span/>
        </button>
      )}
    </li>
  );
});

Item.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string.isRequired,
  isPersisted: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

Item.defaultProps = {
  name: undefined,
};

export default Item;
