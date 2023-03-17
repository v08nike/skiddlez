import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Progress } from 'semantic-ui-react';
import { useToggle } from '../../lib/hooks';

import styles from './Tasks.module.scss';

const Tasks = React.memo(({ items }) => {
  const [isOpened, toggleOpened] = useToggle();

  const handleToggleClick = useCallback(
    (event) => {
      event.preventDefault();

      toggleOpened();
    },
    [toggleOpened],
  );

  const completedItems = items.filter((item) => item.isCompleted);

  return (
    <>
      {/* eslint-disable jsx-a11y/click-events-have-key-events,
                         jsx-a11y/no-static-element-interactions */}
      <div className={styles.button} onClick={handleToggleClick}>
        {/* eslint-enable jsx-a11y/click-events-have-key-events,
                          jsx-a11y/no-static-element-interactions */}
        <span className={styles.progressWrapper}>
          <Progress
            autoSuccess
            value={completedItems.length}
            total={items.length}
            color="blue"
            size="tiny"
            className={styles.progress}
          />
        </span>
        <span
          className={classNames(styles.count, isOpened ? styles.countOpened : styles.countClosed)}
        >
          {completedItems.length}
          {'/'}
          {items.length}
        </span>
      </div>
      {isOpened && (
        <ul className={styles.tasks}>
          {items.map((item) => (
            <li
              key={item.id}
              className={classNames(styles.task, item.isCompleted && styles.taskCompleted)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
});

Tasks.propTypes = {
  items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Tasks;
