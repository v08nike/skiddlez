import React, { useCallback, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Modal } from 'semantic-ui-react';
// import { Markdown } from '../../lib/custom-ui';

import NameField from './NameField';
import DescriptionEdit from './DescriptionEdit';
import Tasks from './Tasks';
import Attachments from './Attachments';
import AttachmentAddZone from './AttachmentAddZone';
import AttachmentAddPopup from './AttachmentAddPopup';
import Actions from './Actions';
import User from '../User';
import Label from '../Label';
// import DueDate from '../DueDate';
// import Timer from '../Timer';
import ProjectMembershipsPopup from "./ProjectMembershipPopup/ProjectMembershipsStep"
import LabelsPopup from './LabelsPopup/LabelsStep';
import DueDateEditPopup from '../DueDateEditPopup';
// import TimerEditPopup from '../TimerEditPopup';
import CardMovePopup from '../CardMovePopup';
import Add from './Tasks/Add';
import DeletePopup from '../DeletePopup';

import hasPermision from '../../utils/has-permission';

import styles from './CardModal.module.scss';

const CardModal = React.memo(
  ({
    name,
    description,
    dueDate,
    // timer,
    isSubscribed,
    isActionsFetching,
    isAllActionsFetched,
    listId,
    boardId,
    projectId,
    users,
    labels,
    tasks,
    attachments,
    actions,
    allProjectsToLists,
    allProjectMemberships,
    allLabels,
    isEditable,
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
    onTaskCreate,
    onTaskUpdate,
    onTaskDelete,
    onAttachmentCreate,
    onAttachmentUpdate,
    onAttachmentDelete,
    onActionsFetch,
    onCommentActionCreate,
    onCommentActionUpdate,
    onCommentActionDelete,
    onClose,
    theme,
    currentCard,
    currentUserId,
  }) => {
    const [t] = useTranslation();
    const [currentCardLists, setCurrentCardLists] = useState([]);
    const [totalList, setTotalList] = useState(0);
    const [indexes, setIndexes] = useState([0,0]);
    const [allTaskCompleted, setAllTaskCompleted] = useState(false);
    const [currentListIndex, setCurrentListIndex] = useState(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(null);
    const [allCardsInCurrentCardList, setAllCardsInCurrentCardList] = useState([]);
    const [relatedBoards, setRelatedBoards] = useState([]);
    const [currentCardBoard, setCurrentCardBoard] = useState(null)
    const [currentBoard, setCurrentBoard] = useState(null);
    const [relatedCards, setRelatedCards] = useState([]);

    useEffect(() => {
      allProjectsToLists.forEach(project => {
        if(projectId === project.id) {
          if(project.boards && project.boards.length > 0) {
            setRelatedBoards([...project.boards])
          }
          project.boards.forEach(board => {
            if(currentBoard === null && board.id === boardId) {
              setCurrentBoard(board)
              if(board.lists && board.lists.length > 0) {
                let cards = [];
                board.lists.forEach(list => {
                  if(list.cards && list.cards.length > 0) {
                   const currentCards = cards;
                   cards = [...currentCards, ...list.cards]
                  }
                })
                setRelatedCards(cards)
              }
            } else if(currentBoard !== null && board.id === currentBoard.id) {
              if(board.lists && board.lists.length > 0) {
                let cards = [];
                board.lists.forEach(list => {
                  if(list.cards && list.cards.length > 0) {
                   const currentCards = cards;
                   cards = [...currentCards, ...list.cards]
                  }
                })
                setRelatedCards(cards)
              } else {
                setRelatedCards([])
              }
            }
            if(boardId === board.id) {
              setCurrentCardBoard(board);
              setCurrentCardLists(board.lists)
              if(board.lists && board.lists.length > 0) {
                if(board.lists.length <= 7) {
                  setIndexes([0, board.lists.length - 1]);
                }
                setTotalList(board.lists.length);
                board.lists.forEach((list, index) => {
                  if(list.id === listId) {
                    if(board.lists.length > 7) {
                      const previousListCount = index - 1;
                      if(previousListCount > 3) {
                        if((board.lists.length - 1 - index) < 3){
                          setIndexes([board.lists.length - 7, board.lists.length - 1])
                        } 
                        if((board.lists.length - 1 - index) >= 3) {
                          setIndexes([index - 3, index + 3])
                        }
                      }
                      if(previousListCount <= 3) {
                        setIndexes([0, index + (5 - previousListCount)])
                      }
                    } else {
                      setIndexes([0, board.lists.length])
                    }
                    setCurrentListIndex(index);
                    setAllCardsInCurrentCardList([...list.cards]);
                    list.cards.forEach((card, i) => {
                      if(card.id === currentCard) {
                        setCurrentCardIndex(i)
                      }
                    })
                  }
                })
              }
            }
          });
        }
      });
      if(tasks && tasks.length > 0) {
        const completedTasks = tasks.filter(task => task.isCompleted === true);
        if(completedTasks.length === tasks.length) {
          setAllTaskCompleted(true);
        } else {
          setAllTaskCompleted(false)
        }
      } else {
        setAllTaskCompleted(true)
      }
    }, [allProjectsToLists, projectId, boardId, listId, tasks, currentCard, currentBoard])
    const handleNameUpdate = useCallback(
      (newName) => {
        onUpdate({
          name: newName,
        });
      },
      [onUpdate],
    );

    const handleDescriptionUpdate = useCallback(
      (newDescription) => {
        onUpdate({
          description: newDescription,
        });
      },
      [onUpdate],
    );

    const handleDueDateUpdate = useCallback(
      (newDueDate) => {
        onUpdate({
          dueDate: newDueDate,
        });
      },
      [onUpdate],
    );

    const handleCoverUpdate = useCallback(
      (newCoverAttachmentId) => {
        onUpdate({
          coverAttachmentId: newCoverAttachmentId,
        });
      },
      [onUpdate],
    );


    const handleToggleSubscriptionClick = useCallback(() => {
      onUpdate({
        isSubscribed: !isSubscribed,
      });
    }, [isSubscribed, onUpdate]);

    const userIds = users.map((user) => user.id);
    const labelIds = labels.map((label) => label.id);

    const removeBoardCardLogEntry = () => {
      // // If the user explicitly closes this card modal,
      // // we will not show them this card by default
      // // when they open this board later.
      // // So we remove the card from the history of
      // // last viewed cards, for the board, for this user.
      // // See client/src/components/Sidebar/Sidebar.jsx for more info.
      if(localStorage.getItem('skiddlez-lastBoardId')) {
        // // last board id
        const lastBoardId = localStorage.getItem('skiddlez-lastBoardId');

        // // store those 2 in an associative array
        let boardCardLog = {};
        const lsKey = `skiddlez-boardCardLog-${currentUserId}`;
        if(localStorage.getItem(lsKey)) {
            boardCardLog = JSON.parse(localStorage.getItem(lsKey));
        }
        delete boardCardLog[lastBoardId];

        // // persist to user's browser
        localStorage.setItem(lsKey, JSON.stringify(boardCardLog));
      }
    }

    const preDelete = () => {
      removeBoardCardLogEntry();
      onDelete();
    }
    const preClose = () => {
      removeBoardCardLogEntry();
      onClose();
    }

    const [canCreateContent] = hasPermision('create_and_share_new_content:create');

    const [canUpdateContent] = hasPermision('create_and_share_new_content:update');

    const [canDeleteContent] = hasPermision('create_and_share_new_content:delete');

    return (
      <Modal open closeIcon
        id='card-modal'
        className = {classNames(theme)}
        dimmer={{ className: 'yena-dimmer' }}
        closeOnDimmerClick={false}
        onClose={preClose}>

        <Modal.Content >
          <div className = 'card-modal'>
          <div className='card-modal-toggle'>
            {(currentCardIndex !== null && currentCardIndex !== 0) ?
              <Link to = {`/cards/${allCardsInCurrentCardList[currentCardIndex - 1].id}`}>
              <button type='button' className='card-modal-previous glass-btn'>
                <i className="fas fa-chevron-left"/>
                <span/><span/><span/><span/>
              </button>
            </Link>
            :<></>}

            <div className='card-modal-title'>
              <h3>{name}</h3>
              <div className = 'card-modal-actions'>
                    <ul>
                      <li>
                        <NameField defaultValue={name} onUpdate={handleNameUpdate}>
                          <button type='button' className='glass-btn'>
                            <i className="fas fa-pencil-alt"/>
                            <span/><span/><span/><span/>
                          </button>
                        </NameField>
                      </li>
                      <li>
                        <button type='button' disabled className='glass-btn disabled'>
                          <i className="far fa-copy"/>
                          <span/><span/><span/><span/>
                        </button>
                      </li>
                      <li>
                        <button
                         className='glass-btn'
                          type = 'button'
                          onClick={handleToggleSubscriptionClick}
                        >
                          {isSubscribed ? <i className="fas fa-star"/> : <i className="far fa-star"/>}
                          <span/><span/><span/><span/>
                        </button>
                      </li>
                      <li>
                        <CardMovePopup
                          projectsToLists={allProjectsToLists}
                          defaultPath={{
                            projectId,
                            boardId,
                            listId,
                          }}
                          onMove={onMove}
                          onTransfer={onTransfer}
                          onBoardFetch={onBoardFetch}
                        >
                          <button
                            type = 'button'
                            className='glass-btn'
                            onClick={handleToggleSubscriptionClick}
                          >
                            <i className="far fa-share-square"/>
                            <span/><span/><span/><span/>
                          </button>
                        </CardMovePopup>
                      </li>
                      {canDeleteContent && (
                      <li>
                        <DeletePopup
                          title={t('common.deleteCard', {
                            context: 'title',
                          })}
                          content={t('common.areYouSureYouWantToDeleteThisCard')}
                          buttonContent={t('action.deleteCard')}
                          onConfirm={preDelete}
                        >
                          <button type = 'button' className='glass-btn'>
                          <i className="far fa-trash-alt"/>
                          <span/><span/><span/><span/>
                          </button>
                        </DeletePopup>
                      </li>
                      )}
                    </ul>
                </div>
            </div>

            {(currentCardIndex !== null && currentCardIndex !== allCardsInCurrentCardList.length - 1) ?
              <Link to = {`/cards/${allCardsInCurrentCardList[currentCardIndex + 1].id}`}>
              <button type='button' className='card-modal-next glass-btn'>
                <i className="fas fa-chevron-right"/>
                <span/><span/><span/><span/>
              </button>
            </Link>
            :<></>}
          </div>
          <AttachmentAddZone onCreate={onAttachmentCreate}>
            <div className='card-modal-box'>
              <div className="card-modal-steppers-wrapper">
              {(indexes[0] > 0) && (
                <div className='previous-step'/>
              )}
              {currentCardLists && currentCardLists.length > 0 && (
                <ul className='card-modal-steppers'>
                  {currentCardLists.map((list, index) => {
                    let currentClass = "";
                    if(index < currentListIndex) {
                      currentClass = "stepper completed";
                    }
                    else if(index === currentListIndex) {
                      if(allTaskCompleted) {
                        currentClass = "stepper completed active";
                      } else {
                        currentClass = "stepper active";
                      }
                    } else {
                      currentClass = "stepper";
                    }
                    if(index >= indexes[0] && index <= indexes[1]) {
                      return (
                        <li key = {`list${list.id}`} className={currentClass}>
                          <span>{index + 1}</span>
                          <p>{list.name}</p>
                        </li>
                      )
                    } 
                    return <></>
                  })}
               </ul>
              )}
              {(indexes[1] < totalList - 1) && (
                <div className='next-step'/>
              )}
              </div>
              <div className='card-modal-wrapper'>

                <div className= "card-modal-upper-section">
                  <div className="card-modal-upper-left-section">
                  <div className='card-modal-desc card-modal-card'>
                    <div className = 'card-modal-header'>
                      <i className="fas fa-align-left"/>
                      <h6>Description</h6>
                      {canUpdateContent && (
                      <DescriptionEdit defaultValue={description} onUpdate={handleDescriptionUpdate}>
                        <button type="button" className={description && description.length > 0 ? 'glass-btn edit' : 'glass-btn'}>
                          {description && description.length > 0 ? <i className="fas fa-pencil-alt"/> : <i className="fas fa-plus"/>}
                          <span/><span/><span/><span/>
                        </button>
                      </DescriptionEdit>
                      )}
                    </div>
                    <div className = 'card-modal-content'>
                      <p>{description}</p>
                    </div>
                  </div>
                  <div className='card-modal-tasks card-modal-card'>
                    <div className = 'card-modal-header'>
                      <i className="fas fa-check-double"/>
                      <h6>Tasks</h6>
                      {canCreateContent && (
                      <Add onCreate={onTaskCreate}>
                        <button type="button" className='glass-btn'>
                          <i className="fas fa-plus"/>
                          <span/><span/><span/><span/>
                        </button>
                      </Add>
                      )}
                    </div>
                    {tasks && tasks.length > 0 && (
                      <Tasks
                        items={tasks}
                        onCreate={onTaskCreate}
                        onUpdate={onTaskUpdate}
                        onDelete={onTaskDelete}
                        isEditable={canUpdateContent}
                      />
                    )}
                  </div>
                  </div>
                  <div className="card-modal-upper-right-section">
                    <div className = 'card-modal-users card-modal-card'>
                      <div className = 'card-modal-header'>
                        <i className="far fa-user"/>
                        <h6>Members</h6>
                        {canCreateContent && (
                        <ProjectMembershipsPopup
                          items={allProjectMemberships}
                          currentUserIds={userIds}
                          onUserSelect={onUserAdd}
                          onUserDeselect={onUserRemove}
                        >
                        <button type = 'button' className='glass-btn'>
                          <i className="fas fa-user-plus"/>
                          <span/><span/><span/><span/>
                        </button>
                        </ProjectMembershipsPopup>
                        )}
                      </div>
                      {users && users.length > 0  && (
                        <ul>
                          {users.map((user) => (
                            <li key={user.id}>
                              <User size = "tiny" name={user.name} avatarUrl={user.avatarUrl} />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className = 'card-modal-labels card-modal-card'>
                      <div className = 'card-modal-header'>
                        <i className="fas fa-tags"/>
                        <h6>Labels</h6>
                        {canCreateContent && (
                        <LabelsPopup
                          items={allLabels}
                          currentIds={labelIds}
                          onSelect={onLabelAdd}
                          onDeselect={onLabelRemove}
                          onCreate={onLabelCreate}
                          onUpdate={onLabelUpdate}
                          onDelete={onLabelDelete}
                        >
                          <button
                            type="button" className='glass-btn'
                          >
                            <i className="fas fa-plus"/>
                            <span/><span/><span/><span/>
                          </button>
                        </LabelsPopup>
                        )}
                      </div>
                      {labels && labels.length > 0 && (
                        <ul>
                          {labels.map((label) => (
                            <li key={label.id} className={styles.attachment}>
                              <LabelsPopup
                                key={label.id}
                                items={allLabels}
                                currentIds={labelIds}
                                onSelect={onLabelAdd}
                                onDeselect={onLabelRemove}
                                onCreate={onLabelCreate}
                                onUpdate={onLabelUpdate}
                                onDelete={onLabelDelete}
                              >
                                <Label size = 'small' name={label.name} color={label.color} />
                              </LabelsPopup>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className='card-modal-duedate card-modal-card'>
                      <div className='card-modal-header'>
                        <i className="far fa-calendar-alt"/>
                        <h6>Duedate</h6>
                        {canCreateContent && (
                        <DueDateEditPopup defaultValue={dueDate} onUpdate={handleDueDateUpdate}>
                          <button type='button' className='glass-btn'>
                            <i className="fas fa-plus"/>
                            <span/><span/><span/><span/>
                          </button>
                        </DueDateEditPopup>
                        )}
                      </div>
                      <div className='card-modal-content'>
                        <span><Moment date = {dueDate} format='DD MMMM,YYYY' /></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className= "card-modal-bottom-section">
                <div className='card-modal-card card-modal-related-info'>
                  <p>Current Board: {currentCardBoard && currentCardBoard.name}</p>
                  <h6>Related Boards:</h6>
                  <ul className=' card-modal-boards'>
                    { (relatedBoards.length > 0 && currentBoard) && (relatedBoards.map(board => {
                      if(board.id === currentBoard.id) {
                        return (
                          <li key = {`board------${board.id}`}>
                            <button className='glass-btn btn-max selected-btn' type='button' onClick={() => setCurrentBoard(board)}>{board.name}<span/><span/><span/><span/></button>
                          </li>
                        )
                      }
                      return (
                        <li key = {`board------${board.id}`}>
                          <button type='button' className='glass-btn' onClick={() => setCurrentBoard(board)}>{board.name}<span/><span/><span/><span/></button>
                        </li>
                      )
                    }))}
                  </ul>
                  <h6 style={{marginTop :"1rem"}}>Related Cards:</h6>
                  <ul className=' card-modal-board-cards'>
                    {(relatedCards.length > 0 && currentBoard) && (relatedCards.map(card => (
                      <li key = {`card----------${card.id}`}>
                        <Link to = {`/cards/${card.id}`}>
                          <button type='button' className={card.id === currentCard ? 'glass-btn selected-btn btn-max' : "glass-btn btn-max"}>{card.name}<span/><span/><span/><span/></button>
                        </Link>
                      </li>
                    )))}
                  </ul>
                </div>

                <div className='card-modal-card card-modal-attachments'>
                    <div className='card-modal-header'>
                      <i className="fas fa-paperclip"/>
                      <h6>Attachments</h6>
                      {/* isEditable && */}
                      {canCreateContent && (
                        <AttachmentAddPopup onCreate={onAttachmentCreate}>
                          <button type = 'button' className='glass-btn'>
                            <i className="fas fa-plus"/>
                            <span/><span/><span/><span/>
                          </button>
                        </AttachmentAddPopup>
                      )}
                    </div>
                      {attachments.length > 0 && (
                        <div className='card-modal-content'>
                          <Attachments
                          items={attachments}
                          onUpdate={onAttachmentUpdate}
                          onDelete={onAttachmentDelete}
                          onCoverUpdate={handleCoverUpdate}
                          />
                        </div>
                      )}
                  </div>
                  <Actions
                    items={actions}
                    isFetching={isActionsFetching}
                    isAllFetched={isAllActionsFetched}
                    isEditable={isEditable}
                    onFetch={onActionsFetch}
                    onCommentCreate={onCommentActionCreate}
                    onCommentUpdate={onCommentActionUpdate}
                    onCommentDelete={onCommentActionDelete}
                  />
                </div>
              </div>
            </div>
          </AttachmentAddZone>
          </div>
        </Modal.Content>
      </Modal>
    );
  },
);

CardModal.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  dueDate: PropTypes.instanceOf(Date),
  // timer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isSubscribed: PropTypes.bool.isRequired,
  isActionsFetching: PropTypes.bool.isRequired,
  isAllActionsFetched: PropTypes.bool.isRequired,
  listId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  /* eslint-disable react/forbid-prop-types */
  users: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  attachments: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
  allProjectsToLists: PropTypes.array.isRequired,
  allProjectMemberships: PropTypes.array.isRequired,
  allLabels: PropTypes.array.isRequired,
  /* eslint-enable react/forbid-prop-types */
  isEditable: PropTypes.bool.isRequired,
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
  onTaskCreate: PropTypes.func.isRequired,
  onTaskUpdate: PropTypes.func.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  onAttachmentCreate: PropTypes.func.isRequired,
  onAttachmentUpdate: PropTypes.func.isRequired,
  onAttachmentDelete: PropTypes.func.isRequired,
  onActionsFetch: PropTypes.func.isRequired,
  onCommentActionCreate: PropTypes.func.isRequired,
  onCommentActionUpdate: PropTypes.func.isRequired,
  onCommentActionDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  currentCard: PropTypes.string.isRequired,
  currentUserId: PropTypes.string.isRequired,
};

CardModal.defaultProps = {
  description: undefined,
  dueDate: undefined,
  // timer: undefined,
};

export default CardModal;
