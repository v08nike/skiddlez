import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Countdown from 'react-countdown';
import Moment from 'react-moment';

import hasPermision from '../../utils/has-permission';

import SubscribeButton from './SubscribeButton';
import ProjectAddModal from '../ProjectAddModal';
import ProjectStatusModal from '../ProjectStatusModal';

import Paths from '../../constants/Paths';

import styles from './Projects.module.scss';

const Projects = React.memo(({
  items,
  isEditable,
  onCreate,
  onUpdate,
  onUpdateProjectMembership }) => {

  const [canCreateProject] = hasPermision('explicitly_added_projects_boards:create');
  console.log(isEditable)

  return (
    <>
    <div className = "dashboard pages">
      <div className = "dashboard-action">
        {/* Best leave isEditable alone, something might depend on it */}
        {/* {isEditable && (
          <span>&nbsp;</span>
        )} */}
        {/* isEditable && canCreateProject && ( */}
        {canCreateProject && (
        <div className = "dashboard-project-add">
          <ProjectAddModal id = 'project-add-modal' onCreate = {onCreate}>
          <button className = "glass-btn" type = "submit">
            Add Project
            <span/><span/><span/><span/>
          </button>
          </ProjectAddModal>
        </div>
        )}
      </div>
      <ul className = "dashboard-projects-list">
        {items.map((item) => {
          let cover = "";
          if(item.background && item.background.type === 'image' && item.backgroundImage.coverUrl) {
            if(process.env.NODE_ENV === 'development') {
              cover = item.backgroundImage.coverUrl.replace('http://localhost:3000/','http://localhost:1337/');
            } else {
              cover = item.backgroundImage.coverUrl;
            }
          }
          return (
            <li key = {`dashboard-project-${item.id}`} className = "dashboard-project"
            style={{
              background:
                (item.background &&
                item.background.type === 'image') &&
                `url("${cover}") center / cover`,
            }}>
              <div className = 'dashboard-project-wrapper'>
                <div className = "dashboard-project-creds">
                  <div className = 'dashboard-project-header'>
                  <input type = 'checkbox' />
                  <Link
                    to={
                      item.firstBoardId
                        ? Paths.BOARDS.replace(':id', item.firstBoardId)
                        : Paths.PROJECTS.replace(':id', item.id)
                    }
                  >
                    <h2>{item.name}</h2>
                  </Link>

                  {item.notificationsTotal > 0 && <span>{item.notificationsTotal}</span>}

                  <div>
                    {/*
                    <button
                     className={styles.ellipsis}
                      type = 'button'
                      onClick={handleToggleSubscriptionClick}
                    >
                      {item.isSubscribed ? <i className="fas fa-paper-plane"/> : <i className="far fa-paper-plane"/>}
                    </button>
                    */}
                    <SubscribeButton
                      klassName={styles.ellipsis}
                      project={item}
                      onToggleSubscribe={onUpdateProjectMembership} />

                    <ProjectStatusModal id = 'project-add-modal'
                      defaultData={item}
                      onUpdate={onUpdate}>
                      <button className={styles.ellipsis} type = "submit">
                        <i className="fas fa-ellipsis-h"/>
                      </button>
                    </ProjectStatusModal>
                  </div>
                </div>
                  <ul>
                    {(item.description && item.description.length > 0) ?
                      <li>
                        <i className="fas fa-crosshairs"/>
                        <span>{item.description}</span>
                      </li>
                    :
                      <></>
                    }
                    {
                      item.dueDate && (
                        <li>
                          <i className="far fa-calendar-alt"/>
                          {Math.ceil((Math.abs(new Date(item.dueDate) - new Date()) / (24 * 60 * 60 * 1000))) > 30 ?
                            <span>
                              <Moment date = {item.dueDate} format='DD MMMM,YYYY' />
                            </span>
                           :
                            <span>{Math.ceil((Math.abs(new Date(item.dueDate) - new Date()) / (24 * 60 * 60 * 1000)))} days left</span>
                           }
                        </li>
                      )
                    }
                  </ul>
                </div>
                <div className = "dashboard-project-info">
                  <div className = "dashboard-project-members">
                      <h4>Team members</h4>
                      <ul>
                        <li>
                          <img alt = "" src = "/Assets/Images/pic-1.jpeg" />
                        </li>
                        <li>
                          <img alt = "" src = "/Assets/Images/pic-2.jpg" />
                        </li>
                        <li>
                          <img alt = "" src = "/Assets/Images/pic-3.jpg" />
                        </li>
                        <li><span>+2</span></li>
                      </ul>
                    </div>
                    <div className = "dashboard-project-progress">
                      <h4>Progress</h4>
                      <span>74%</span>
                    </div>
                </div>
              {/* </Link> */}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
    </>
  );
});

Projects.propTypes = {
  items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  isEditable: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onUpdateProjectMembership: PropTypes.func.isRequired,
};

export default Projects;
