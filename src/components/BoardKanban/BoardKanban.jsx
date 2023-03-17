import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import hasPermision from '../../utils/has-permission';

import { closePopup } from '../../lib/popup';

import DroppableTypes from '../../constants/DroppableTypes';
import ListContainer from '../../containers/ListContainer';
import CardModalContainer from '../../containers/CardModalContainer';
// import ListAdd from './ListAdd';
import Filter from './Filter';
// import CardAdd from '../List/CardAdd';
// import AddPopup from '../Boards/AddPopup';
import CreateActions from './CreateActions/CreateActions';

import BoardsContainer from '../../containers/BoardsContainer';
// import ActionsPopup from './ActionsPopup';
// import MembershipAddPopup from './MembershipAddPopup';
// import MembershipEditPopup from './MembershipEditPopup';
import User from '../User';
import ProjectsPopup from './ProjectsPopup';
import MemebershipPopup from './MemebershipPopup';
import ProjectNameEdit from './ProjectNameEdit';
import BoardNameEdit from './BoardsNameEdit';

// import styles from './BoardKanban.module.scss';

const parseDndId = (dndId) => dndId.split(':')[1];

const BoardKanban = React.memo(
  ({
    listIds,
    filterUsers,
    filterLabels,
    allProjectMemberships,
    allLabels,
    isCardModalOpened,
    onListCreate,
    onListMove,
    onCardMove,
    onUserToFilterAdd,
    onUserFromFilterRemove,
    onLabelToFilterAdd,
    onLabelFromFilterRemove,
    onLabelCreate,
    onLabelUpdate,
    onLabelDelete,
    name,
    background,
    backgroundImage,
    isBackgroundImageUpdating,
    memberships,
    isEditable,
    onUpdate,
    onBackgroundImageUpdate,
    onDelete,
    onMembershipDelete,
    allUsers,
    onMembershipCreate,
    onCardCreate,
    onCreate,
    theme,
    allProjects,
    currentProject,
    currentBoard,
    onUpdateBoard
  }) => {
    const projectNameEdit = useRef(null)
    const boardNameEdit = useRef(null)
    const wrapper = useRef(null);
    const prevPosition = useRef(null);
    const handleMembershipDelete = useCallback(
      (id) => {
        onMembershipDelete(id);
      },
      [onMembershipDelete],
    );

    // const handleAddListClick = useCallback(() => {
    //   setIsAddListOpened(true);
    // }, []);

    // const handleAddListClose = useCallback(() => {
    //   setIsAddListOpened(false);
    // }, []);

    const handleDragStart = useCallback(() => {
      closePopup();
    }, []);

    const handleDragEnd = useCallback(
      ({ draggableId, type, source, destination }) => {
        if (
          !destination ||
          (source.droppableId === destination.droppableId && source.index === destination.index)
        ) {
          return;
        }

        const id = parseDndId(draggableId);

        switch (type) {
          case DroppableTypes.LIST:
            onListMove(id, destination.index);

            break;
          case DroppableTypes.CARD:
            onCardMove(id, parseDndId(destination.droppableId), destination.index);

            break;
          default:
        }
      },
      [onListMove, onCardMove],
    );

    const handleMouseDown = useCallback(
      (event) => {
        if (event.target !== wrapper.current && !event.target.dataset.dragScroller) {
          return;
        }

        prevPosition.current = event.clientX;
      },
      [wrapper],
    );

    const handleWindowMouseMove = useCallback(
      (event) => {
        if (!prevPosition.current) {
          return;
        }

        event.preventDefault();

        window.scrollBy({
          left: prevPosition.current - event.clientX,
        });

        prevPosition.current = event.clientX;
      },
      [prevPosition],
    );

    const handleWindowMouseUp = useCallback(() => {
      prevPosition.current = null;
    }, [prevPosition]);

    useEffect(() => {
      document.body.style.overflowX = 'auto';
 
      return () => {
        document.body.style.overflowX = null;
      };
    }, []);

    const handleProjectNameUpdate = useCallback(
      (newName) => {
        onUpdate({
          name: newName,
        });
      },
      [onUpdate],
    );

    const handleBoardNameUpdate = useCallback(
      (id, data) => {
        onUpdateBoard(id, data);
      },
      [onUpdateBoard],
    );
    

    const handleProjectHeaderClick = useCallback(() => {
      if (isEditable) {
        if (projectNameEdit.current) {
          projectNameEdit.current.open();
        }
      }
    }, [isEditable]);

    const handleBoardHeaderClick = useCallback(() => {
      if (isEditable) {
        if (boardNameEdit.current) {
          boardNameEdit.current.open();
        }
      }
    }, [isEditable]);

    const handleCardCreate = (data) => {
      onCardCreate(listIds[0],data)
    }

    useEffect(() => {
      window.addEventListener('mouseup', handleWindowMouseUp);
      window.addEventListener('mousemove', handleWindowMouseMove);

      return () => {
        window.removeEventListener('mouseup', handleWindowMouseUp);
        window.removeEventListener('mousemove', handleWindowMouseMove);
      };
    }, [handleWindowMouseUp, handleWindowMouseMove]);

    const [canCreateUser] = hasPermision('user_accessible_in_same_domain:create');

    const [canCreateContent] = hasPermision('create_and_share_new_content:create');

    return (
      <>
      <div className="project pages">
        <div className = "project-section1">
          <ul className = "project-section1-top">
            <li>
              <ProjectNameEdit ref={projectNameEdit} defaultValue={name} onUpdate={handleProjectNameUpdate}>
                <button type='button' onClick={handleProjectHeaderClick}><i className="fas fa-th-list"/>
                  <span>{name}</span></button>
              </ProjectNameEdit>
            </li>
            <li>
            <ProjectsPopup projectsList = {allProjects}  project={{
                    name,
                    background,
                    backgroundImage,
                    isBackgroundImageUpdating,
                    currentProject
                  }} isEditable = {isEditable}
                  onUpdate={onUpdate}
                  onBackgroundImageUpdate={onBackgroundImageUpdate}
                  onDelete={onDelete}
                  id = 'projects-popup'>
                    <button className = 'glass-btn btn-max project-btn' type = 'button'>Projects<i className="fas fa-sort-down"/>
                  <span/>
                  <span/>
                  <span/>
                  <span/></button>
              </ProjectsPopup>
            </li>
            <li>
            <button className = 'glass-btn btn-max disabled' type = 'button'><i className="far fa-sticky-note"/>
                  <span/>
                  <span/>
                  <span/>
                  <span/></button>
            </li>
            <li>
              {canCreateContent && (
              <CreateActions
                onCardCreate = {handleCardCreate}
                onListCreate = {onListCreate}
                onCreate = {onCreate}
                onLabelCreate={onLabelCreate}
                allLabels={allLabels}
                id = "board-activity"
                >
                <button className = 'glass-btn btn-max project-btn' type = 'button'>Create<i className="fas fa-sort-down"/>
                  <span/>
                  <span/>
                  <span/>
                  <span/></button>
              </CreateActions>
              )}
            </li>
            <li>
              <Filter
                users={filterUsers}
                labels={filterLabels}
                allProjectMemberships={allProjectMemberships}
                allLabels={allLabels}
                onUserAdd={onUserToFilterAdd}
                onUserRemove={onUserFromFilterRemove}
                onLabelAdd={onLabelToFilterAdd}
                onLabelRemove={onLabelFromFilterRemove}
                onLabelCreate={onLabelCreate}
                onLabelUpdate={onLabelUpdate}
                onLabelDelete={onLabelDelete}
                id = "filter-modal"
              >
                <button type='button' className = 'glass-btn btn-max project-btn'>Filter<i className="fas fa-sort-down"/>
                <span/>
                  <span/>
                  <span/>
                  <span/></button>
              </Filter>
            </li>
          </ul>
            <ul className='project-section1-bottom'>
              <li>
              <BoardNameEdit ref={boardNameEdit} defaultValue={currentBoard.name} onUpdate={handleBoardNameUpdate} id={currentBoard.id}>
                <button type='button' onClick={handleBoardHeaderClick}><i className="fas fa-clipboard-list"/>
                  <span>{currentBoard.name}</span></button>
              </BoardNameEdit>
              {/* <h4><i className="fas fa-clipboard-list"/><span>{currentBoard.name}</span></h4> */}
              </li>
              <li>
                <BoardsContainer id = 'boards-popup'>
                  <button className = 'glass-btn btn-max boards-btn project-btn' type='button'>Boards<i className="fas fa-sort-down"/>
                    <span/>
                    <span/>
                    <span/>
                    <span/></button>
                </BoardsContainer>
              </li>
              <li>
                <div className='project-screen-members'>
                  {memberships.map((membership, memberIndex) => {
                    if(memberIndex < 6) {
                      return (
                        <User
                        key = {`membership===${membership.user.id}`}
                          name={membership.user.name}
                          avatarUrl={membership.user.avatarUrl}
                          size="small"
                          isDisabled={!membership.isPersisted}
                        />
                      )
                    }
                    return <></>
                  } )}
                </div>
                {canCreateUser && (
                <MemebershipPopup id = 'add-membership-popup' memberships = {memberships} isEditable = {isEditable} onDelete = {handleMembershipDelete} users = {allUsers} currentUserIds={memberships.map((membership) => membership.user.id)} onCreate={onMembershipCreate} mode = {theme}>
                  <button type='button' className='glass-btn btn-max'>
                  <i className="fas fa-users"/>
                    <span/><span/><span/><span/></button>
                </MemebershipPopup>
                )}
              </li>
            </ul>
          
        </div>

        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div ref={wrapper} className="project-section2" onMouseDown={handleMouseDown}>
            <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              <Droppable droppableId="board" type={DroppableTypes.LIST} direction="horizontal">
                {({ innerRef, droppableProps, placeholder }) => (
                  <div
                    {...droppableProps} // eslint-disable-line react/jsx-props-no-spreading
                    data-drag-scroller
                    ref={innerRef}
                    className="lists"
                  >
                    {listIds.map((listId, index) => (
                      <ListContainer max = {listIds.length} key={listId} id={listId} index={index} />
                    ))}
                    {placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
        </div>
        {isCardModalOpened && <CardModalContainer />}
      </div>
      </>
    );
  },
);

BoardKanban.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  listIds: PropTypes.array.isRequired,
  filterUsers: PropTypes.array.isRequired,
  filterLabels: PropTypes.array.isRequired,
  allProjectMemberships: PropTypes.array.isRequired,
  allLabels: PropTypes.array.isRequired,
  allProjects : PropTypes.array.isRequired,
  currentProject : PropTypes.string.isRequired,
  currentBoard : PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
  isCardModalOpened: PropTypes.bool.isRequired,
  onListCreate: PropTypes.func.isRequired,
  onListMove: PropTypes.func.isRequired,
  onCardMove: PropTypes.func.isRequired,
  onUserToFilterAdd: PropTypes.func.isRequired,
  onUserFromFilterRemove: PropTypes.func.isRequired,
  onLabelToFilterAdd: PropTypes.func.isRequired,
  onLabelFromFilterRemove: PropTypes.func.isRequired,
  onLabelCreate: PropTypes.func.isRequired,
  onLabelUpdate: PropTypes.func.isRequired,
  onLabelDelete: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  /* eslint-disable react/forbid-prop-types */
  background: PropTypes.object,
  backgroundImage: PropTypes.object,
  /* eslint-enable react/forbid-prop-types */
  isBackgroundImageUpdating: PropTypes.bool.isRequired,
  /* eslint-disable react/forbid-prop-types */
  memberships: PropTypes.array.isRequired,
  allUsers: PropTypes.array.isRequired,
  /* eslint-enable react/forbid-prop-types */
  isEditable: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onUpdateBoard: PropTypes.func.isRequired,
  onBackgroundImageUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMembershipCreate: PropTypes.func.isRequired,
  onMembershipDelete: PropTypes.func.isRequired,
  onCardCreate: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired
};

BoardKanban.defaultProps = {
  background: undefined,
  backgroundImage: undefined,
};

export default BoardKanban;
