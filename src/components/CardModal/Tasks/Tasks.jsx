import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
import { Progress } from 'semantic-ui-react';

import Item from './Item';

import styles from './Tasks.module.scss';

const Tasks = React.memo(({ items, onUpdate, onDelete, isEditable }) => {

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

  const completedItems = items.filter((item) => item.isCompleted);

  return (
    <>
    <div className = 'card-modal-content card-modal-task-list'>
      {items.length > 0 && (
      <div className = 'tasks-progress'>
        <Progress
          autoSuccess
          value={completedItems.length}
          total={items.length}
          color="blue"
          size="tiny"
          className={styles.progress}
        />
        <span>{completedItems.length}/{items.length}</span>
      </div>
      )}
      <div className = 'card-modal-tasks-list'>
      {items.map((item) => (
        <Item
          key={item.id}
          name={item.name}
          isCompleted={item.isCompleted}
          isPersisted={item.isPersisted}
          isEditable={isEditable}
          onUpdate={(data) => handleUpdate(item.id, data)}
          onDelete={() => handleDelete(item.id)}
        />
      ))}
        </div>
      </div>
    </>
  );
});

Tasks.propTypes = {
  items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  // onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired,
};

export default Tasks;
