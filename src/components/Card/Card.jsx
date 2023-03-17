import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { Button,
  // Checkbox,
  // Checkbox,
  // Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import Moment from "react-moment"
import Paths from '../../constants/Paths';
// import Tasks from './Tasks';
// import NameEdit from './NameEdit';
import ActionsPopup from './ActionsPopup';
// import User from '../User';
import Label from '../Label';
import User from '../User';
// import DueDate from '../DueDate';
// import Timer from '../Timer';

// import styles from './Card.module.scss';

import hasPermision from '../../utils/has-permission';

const Card = React.memo(
  ({
    id,
    index,
    name,
    status,
    dueDate,
    description,
    timer,
    coverUrl,
    boardId,
    listId,
    projectId,
    isPersisted,
    notificationsTotal,
    users,
    labels,
    tasks,
    allProjectsToLists,
    allProjectMemberships,
    allLabels,
    onUpdate,
    onMove,
    onTransfer,
    onDelete,
    onUserAdd,
    onUserRemove,
    onBoardFetch,
    onLabelAdd,
    onLabelRemove,
    onLabelCreate,
    onLabelUpdate,
    onLabelDelete,
    activityCount
  }) => {

    const [activeTaskTab, setActiveTaskTab] = useState(false);
    const [coverImage, setCoverImage] = useState(coverUrl);

    const handleClick = useCallback(() => {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    }, []);

    const handleNameUpdate = useCallback(
      (newName) => {
        onUpdate({
          name: newName,
        });
      },
      [onUpdate],
    );

    const handleTaskTab = () => {
      if(activeTaskTab) {
        setActiveTaskTab(false)
      } else {
        setActiveTaskTab(true)
      }
    }

    // const fetchActions = useCallback(async () => {
    //   const res = await actions();
    //   console.log(res)
    // }, [actions])

    // fetchActions();

    // const contentNode = (
    //   <>
    //     {coverUrl && <img src={coverUrl} alt="" className={styles.cover} />}
    //     <div className={styles.details}>
    //       {labels.length > 0 && (
    //         <span className={styles.labels}>
    //           {labels.map((label) => (
    //             <span
    //               key={label.id}
    //               className={classNames(styles.attachment, styles.attachmentLeft)}
    //             >
    //               <Label name={label.name} color={label.color} size="tiny" />
    //             </span>
    //           ))}
    //         </span>
    //       )}
    //       <div className={styles.name}>{name}</div>
    //       {tasks.length > 0 && <Tasks items={tasks} />}
    //       {(dueDate || timer || notificationsTotal > 0) && (
    //         <span className={styles.attachments}>
    //           {notificationsTotal > 0 && (
    //             <span
    //               className={classNames(
    //                 styles.attachment,
    //                 styles.attachmentLeft,
    //                 styles.notification,
    //               )}
    //             >
    //               {notificationsTotal}
    //             </span>
    //           )}
    //           {dueDate && (
    //             <span className={classNames(styles.attachment, styles.attachmentLeft)}>
    //               <DueDate value={dueDate} size="tiny" />
    //             </span>
    //           )}
    //           {timer && (
    //             <span className={classNames(styles.attachment, styles.attachmentLeft)}>
    //               <Timer startedAt={timer.startedAt} total={timer.total} size="tiny" />
    //             </span>
    //           )}
    //         </span>
    //       )}
    //       {users.length > 0 && (
    //         <span className={classNames(styles.attachments, styles.attachmentsRight)}>
    //           {users.map((user) => (
    //             <span
    //               key={user.id}
    //               className={classNames(styles.attachment, styles.attachmentRight)}
    //             >
    //               <User name={user.name} avatarUrl={user.avatarUrl} size="small" />
    //             </span>
    //           ))}
    //         </span>
    //       )}
    //     </div>
    //   </>
    // );

    // const image = coverUrl === null ? '/Assets/Images/card.png' : coverUrl;
    const completedTasks = tasks.filter(task => task.isCompleted);

    useEffect(() => {
      if(process.env.NODE_ENV === 'development' && coverUrl) {
        setCoverImage(coverUrl.replace('http://localhost:3000', 'http://localhost:1337'))
      } else {
        setCoverImage(coverUrl)
      }
    }, [coverUrl])

    const [canUpdateContent] = hasPermision('create_and_share_new_content:update');

    return (
      <Draggable draggableId={`card:${id}`} index={index} isDragDisabled={!isPersisted}>
        {({ innerRef, draggableProps, dragHandleProps }) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <div {...draggableProps} {...dragHandleProps} ref={innerRef}>
            <div className = "card">
              {
                labels.length > 0 ?
                <Link
                  to={Paths.CARDS.replace(':id', id)}
                  onClick={handleClick}
                >
                <ul className = "card-labels">
                  {
                    labels.map((labelItem) => {
                      return (
                        <li key = {`label${labelItem.id}`}><Label name = {labelItem.name} color = {labelItem.color} /></li>
                      )
                    })
                  }
                </ul>
                </Link>
                :
                <></>
                }
                {coverImage && (
                  <Link
                    to={Paths.CARDS.replace(':id', id)}
                    onClick={handleClick}
                  >
                    <div className='card-cover-image'>
                      <img src = {coverImage}  alt=''/>
                    </div>
                  </Link>
                )}
                <div className = "card-header">
                  <input type = 'checkbox' />
                <Link
                    to={Paths.CARDS.replace(':id', id)}
                    onClick={handleClick}
                  >
                    <h3>{name}</h3>
                    {(notificationsTotal && notificationsTotal > 0) ? <span>{notificationsTotal}</span> : <></>}
                  </Link>
                  {canUpdateContent && (
                  <ActionsPopup
                        card={{
                          id,
                          name,
                          status,
                          dueDate,
                          timer,
                          boardId,
                          listId,
                          projectId,
                          isPersisted,
                        }}
                        name = {name}
                        onNameUpdate = {handleNameUpdate}
                        projectsToLists={allProjectsToLists}
                        projectMemberships={allProjectMemberships}
                        currentUserIds={users.map((user) => user.id)}
                        labels={allLabels}
                        currentLabelIds={labels.map((label) => label.id)}
                        onUpdate={onUpdate}
                        onMove={onMove}
                        onTransfer={onTransfer}
                        onDelete={onDelete}
                        onUserAdd={onUserAdd}
                        onUserRemove={onUserRemove}
                        onBoardFetch={onBoardFetch}
                        onLabelAdd={onLabelAdd}
                        onLabelRemove={onLabelRemove}
                        onLabelCreate={onLabelCreate}
                        onLabelUpdate={onLabelUpdate}
                        onLabelDelete={onLabelDelete}
                      >
                        <button type = "button">
                          <i className="fas fa-ellipsis-h"/>
                        </button>
                  </ActionsPopup>
                  )}
                </div>
              {/* <div className = "card-image">
                <img src = {image} onError = {(e) => {e.target.src = '/Assets/Images/card.png'}} alt = "" />
              </div> */}
                <div className = "card-creds">
                  {dueDate && (
                    <Link
                      to={Paths.CARDS.replace(':id', id)}
                      onClick={handleClick}
                    >
                    <h4 className = "card-duedate">
                      Due date: <Moment date = {dueDate} format='DD MMM, YYYY' />
                    </h4></Link>
                  )}
                  {tasks && tasks.length > 0 && (
                    <div className = "card-tasks">
                      <div className='card-progress'>
                        <progress value = {completedTasks.length} max = {tasks.length} />
                        <span>{completedTasks.length}/{tasks.length}</span>
                      </div>
                      <div className={activeTaskTab ? 'card-tasks-list active' : 'card-tasks-list'}>
                        <button type='button' onClick={() => handleTaskTab()}>
                          Tasks <i className="fas fa-sort-down"/>
                        </button>
                        <ul className='tasks-list'>
                          {tasks.map(task => (
                            <li key={task.id}>
                              <i>-</i>
                              <span className={task.isCompleted && "task-complete"}>{task.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  {description && description.length > 0 && (<p>{description}</p>)}
                </div>
                <Link
                  to={Paths.CARDS.replace(':id', id)}
                  onClick={handleClick}
                >
              <div className = "card-users">
                <div className = "card-comment">
                  <span>{activityCount} <i className="far fa-comments"/></span>
                </div>
                {users && users.length > 0 && (
                <ul className = "card-members">
                  {
                    users.slice(0,3).map((user) => {
                      return (
                        <li key = {user.id}>
                          <User size = "tiny" name={user.name} avatarUrl={user.avatarUrl} />
                        </li>
                      )
                    })
                  }
                  {users.length > 3 && (
                    <li>
                      <span>+{users.length - 3}</span>
                    </li>
                  )}
                </ul>
                )}
              </div></Link>
              {/* <div className = "card-progress">
                <div className = "card-timing">
                  <span>10%</span>
                  <span>3 days</span>
                </div>
                <progress value = {10} max = {100}>10%</progress>
              </div> */}
            </div>
            {/* <NameEdit ref={nameEdit} defaultValue={name} onUpdate={handleNameUpdate}>
              <div className={styles.card}>
                {isPersisted ? (
                  <>
                    <Link
                      to={Paths.CARDS.replace(':id', id)}
                      className={styles.content}
                      onClick={handleClick}
                    >
                      {contentNode}
                    </Link>
                    <ActionsPopup
                      card={{
                        id,
                        name,
                        dueDate,
                        timer,
                        boardId,
                        listId,
                        projectId,
                        isPersisted,
                      }}
                      projectsToLists={allProjectsToLists}
                      projectMemberships={allProjectMemberships}
                      currentUserIds={users.map((user) => user.id)}
                      labels={allLabels}
                      currentLabelIds={labels.map((label) => label.id)}
                      onNameEdit={handleNameEdit}
                      onUpdate={onUpdate}
                      onMove={onMove}
                      onTransfer={onTransfer}
                      onDelete={onDelete}
                      onUserAdd={onUserAdd}
                      onUserRemove={onUserRemove}
                      onBoardFetch={onBoardFetch}
                      onLabelAdd={onLabelAdd}
                      onLabelRemove={onLabelRemove}
                      onLabelCreate={onLabelCreate}
                      onLabelUpdate={onLabelUpdate}
                      onLabelDelete={onLabelDelete}
                    >
                      <Button className={classNames(styles.actionsButton, styles.target)}>
                        <Icon fitted name="pencil" size="small" />
                      </Button>
                    </ActionsPopup>
                  </>
                ) : (
                  <span className={styles.content}>{contentNode}</span>
                )}
              </div>
            </NameEdit> */}
          </div>
        )}
      </Draggable>
    );
  },
);

Card.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  dueDate: PropTypes.instanceOf(Date),
  timer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  coverUrl: PropTypes.string,
  boardId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  isPersisted: PropTypes.bool.isRequired,
  notificationsTotal: PropTypes.number.isRequired,
  /* eslint-disable react/forbid-prop-types */
  users: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  allProjectsToLists: PropTypes.array.isRequired,
  allProjectMemberships: PropTypes.array.isRequired,
  allLabels: PropTypes.array.isRequired,
  /* eslint-enable react/forbid-prop-types */
  onUpdate: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onTransfer: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUserAdd: PropTypes.func.isRequired,
  onUserRemove: PropTypes.func.isRequired,
  onBoardFetch: PropTypes.func.isRequired,
  onLabelAdd: PropTypes.func.isRequired,
  onLabelRemove: PropTypes.func.isRequired,
  onLabelCreate: PropTypes.func.isRequired,
  onLabelUpdate: PropTypes.func.isRequired,
  onLabelDelete: PropTypes.func.isRequired,
  description: PropTypes.string,
  activityCount: PropTypes.number.isRequired
};

Card.defaultProps = {
  dueDate: undefined,
  timer: undefined,
  coverUrl: undefined,
  description: undefined,
};

export default Card;
