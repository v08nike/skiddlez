import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// import { Button } from 'semantic-ui-react';

// import BoardsContainer from '../../containers/BoardsContainer';
import AddPopupProject from '../Boards/AddPopupProject';
import MemebershipPopup from '../BoardKanban/MemebershipPopup';
import User from '../User';
import ProjectsPopup from '../BoardKanban/ProjectsPopup';
import ProjectNameEdit from '../BoardKanban/ProjectNameEdit';

// import styles from './Project.module.scss';

const Project = React.memo(
  ({
    name,
    background,
    backgroundImage,
    isBackgroundImageUpdating,
    memberships,
    allUsers,
    isEditable,
    onUpdate,
    onBackgroundImageUpdate,
    onDelete,
    onMembershipCreate,
    onMembershipDelete,
    onCreate,
    userProjects,
    currentProject
  }) => {

    const projectNameEdit = useRef(null);
    const handleMembershipDelete = useCallback(
      (id) => {
        onMembershipDelete(id);
      },
      [onMembershipDelete],
    );

    const handleProjectNameUpdate = useCallback(
      (newName) => {
        onUpdate({
          name: newName,
        });
      },
      [onUpdate],
    );
    

    const handleProjectHeaderClick = useCallback(() => {
      if (isEditable) {
        if (projectNameEdit.current) {
          projectNameEdit.current.open();
        }
      }
    }, [isEditable]);

    useEffect(() => {
      return () => {
        document.body.style.background = null;
      };
    }, []);

    return (
      <div className="project">
        <div className = "project-section1">
        <ul className = "project-section1-top">
          <li>
              <ProjectNameEdit ref={projectNameEdit} defaultValue={name} onUpdate={handleProjectNameUpdate}>
                <button type='button' onClick={handleProjectHeaderClick}><i className="fas fa-th-list"/>
                  <span>{name}</span></button>
              </ProjectNameEdit>
            </li>
            <li>
            <ProjectsPopup projectsList = {userProjects}  project={{
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
          </ul>
            <ul className='project-section1-bottom'>
              <li style={{flex : '0'}} />
            <li>
              <AddPopupProject onCreate={onCreate}>
                <button type = "button" className="glass-btn btn-max">
                  Create Board
                  <span/>
                  <span/>
                  <span/>
                  <span/> 
                </button>
              </AddPopupProject>
            </li>
              <li>
                <div className='project-screen-members'>
                  {memberships.map((membership, memberIndex) => {
                    if(memberIndex < 6) {
                      return (
                        <User
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
                <MemebershipPopup memberships = {memberships} isEditable = {isEditable} onDelete = {handleMembershipDelete} users = {allUsers} currentUserIds={memberships.map((membership) => membership.user.id)} onCreate={onMembershipCreate}>
                  <button type='button' className='glass-btn btn-max'>
                  <i className="fas fa-users"/>
                    <span/><span/><span/><span/></button>
                </MemebershipPopup>
              </li>
            </ul>
            <div className='create-board-section'>
            <i className="far fa-hand-point-up"/>
            <p>Create new board for your project by clicking on create board.</p>
            </div>
        </div>
      </div>
    );
  },
);

Project.propTypes = {
  name: PropTypes.string.isRequired,
  currentProject: PropTypes.string.isRequired,
  /* eslint-disable react/forbid-prop-types */
  background: PropTypes.object,
  userProjects : PropTypes.array.isRequired,
  backgroundImage: PropTypes.object,
  /* eslint-enable react/forbid-prop-types */
  isBackgroundImageUpdating: PropTypes.bool.isRequired,
  /* eslint-disable react/forbid-prop-types */
  memberships: PropTypes.array.isRequired,
  allUsers: PropTypes.array.isRequired,
  /* eslint-enable react/forbid-prop-types */
  isEditable: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onBackgroundImageUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMembershipCreate: PropTypes.func.isRequired,
  onMembershipDelete: PropTypes.func.isRequired,
  onCreate:PropTypes.func.isRequired
};

Project.defaultProps = {
  background: undefined,
  backgroundImage: undefined,
};

export default Project;
