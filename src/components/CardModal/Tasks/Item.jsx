import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { Checkbox } from 'semantic-ui-react';

import NameEdit from './NameEdit';
import ActionsPopup from './ActionsPopup';

import styles from './Item.module.scss';

const Item = React.memo(({ name, isCompleted, isPersisted, isEditable, onUpdate, onDelete }) => {
  const nameEdit = useRef();

  // const handleClick = useCallback(() => {
  //   if (isPersisted) {
  //     nameEdit.current.open();
  //   }
  // }, [isPersisted]);

  const handleNameUpdate = useCallback(
    (newName) => {
      onUpdate({
        name: newName,
      });
    },
    [onUpdate],
  );

  const handleToggleChange = useCallback(() => {
    onUpdate({
      isCompleted: !isCompleted,
    });
  }, [isCompleted, onUpdate]);

  const handleNameEdit = useCallback(() => {
    nameEdit.current.open();
  }, []);

  return (
    <div className='card-modal-task'>
      <Checkbox
        checked={isCompleted}
        disabled={!isPersisted || !isEditable}
        className={styles.checkbox}
        onChange={handleToggleChange}
      />

      {isEditable && (
        <NameEdit ref={nameEdit} defaultValue={name} onUpdate={handleNameUpdate}>
          <button type = 'button' className = {isCompleted ? 'task-complete' : ''}>{name}</button>
        </NameEdit>
      )}
      {!isEditable && (
        <>
          <button type = 'button' disabled={!isEditable}>{name}</button>
          <span>{/* span to fool css */}&nbsp;</span>
        </>
      )}

      {isPersisted && isEditable && (
        <ActionsPopup onNameEdit={handleNameEdit} onNameUpdate = {handleNameUpdate} defaultName= {name} onDelete={onDelete}>
          <button type = 'button' className='glass-btn edit'>
          <i className="fas fa-pencil-alt"/>
          <span/><span/><span/><span/>
          </button>
        </ActionsPopup>
      )}
    </div>
  );
});

Item.propTypes = {
  name: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  isPersisted: PropTypes.bool.isRequired,
  isEditable: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Item;
