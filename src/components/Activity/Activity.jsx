import React from "react";
import PropTypes from "prop-types";
import DueDates from "./DueDates";
import Feed from "./Feed";
import RecentActions from "./RecentActions";
import { CardStatuses, Statuses } from "../../constants/Enums";

// const Activity = React.memo(() => {
const Activity = React.memo(
  ({
    projectsForCurrentUser,
    projectsCreatedByCurrentUser,
    projectsAssignedToCurrentUser,
    projectsFavoritedByCurrentUser,
    // // pause ...
    cardsForCurrentUser,
    cardsCreatedByCurrentUser,
    cardsAssignedToCurrentUser,
    cardsFavoritedByCurrentUser,
    // // pause ...
    actionsFromAccessibleProjects,
    actionsFromFavoritedProjects,
    actionsFromFavoritedCards,
    // // pause ...
    onFilterMyActivityFeed,
  }) => {
    // // Make the 'unused' complaints go away
    if (onFilterMyActivityFeed) {
      console.log("placate react");
    }

    return (
      <div className="activity-dashboard">
        {/*
          <div className='activity-works activity-dashboard-card'>
              <div className='activity-dashboard-card-header'>
                  <h3>My Works</h3>
              </div>
              <div className='activity-dashboard-card-filter'>
                  <span>Showing:</span>
                  <button type='button'>Everything <i className="fas fa-sort-down"/></button>
              </div>
              <div className='activity-works-tasks'>
                  <div className='activity-works-tasks-header'>
                      <h6>Ready to Deploy</h6>
                      <span>2</span>
                  </div>
                  <ul className='activity-works-tasks-cards'>
                      <li className='activity-works-tasks-card'>testitle long enxeteded to seehow it looks on the cards interface</li>
                      <li className='activity-works-tasks-card'>This is a description for this project</li>
                  </ul>
              </div>
          </div>
          <div className='actvity-dashboard-middle-section'>
            <div className='activity-active-tasks activity-dashboard-card'>
              <div className='activity-dashboard-card-header'>
                <h3>My Active Tasks</h3>
                <i className="fas fa-question-circle"/>
              </div>
              <div className='activity-dashboard-card-filter'>
                  <span>Showing:</span>
                  <button type='button'>Started only <i className="fas fa-sort-down"/></button>
              </div>
              <div className='activity-dashboard-card-no-data'>
                <i className="fas fa-clipboard-list"/>
                <span>You have no active tasks</span>
                <p>Create your first Story to add a Task</p>
              </div>
            </div>
            <div className='activity-due-date activity-dashboard-card'>
              <div className='activity-dashboard-card-header'>
                <h3>Upcoming Due Dates</h3>
                <i className="fas fa-question-circle"/>
              </div>
              <div className='activity-dashboard-card-filter'>
                  <span>Showing:</span>
                  <button type='button'>Everything <i className="fas fa-sort-down"/></button>
              </div>
              <div className='activity-dashboard-card-no-data'>
                <i className="far fa-calendar-alt"/>
                <p>No Stories or Epics are due in the next 30 days</p>
              </div>
            </div>
          </div>
          <div className='activity-feed activity-dashboard-card'>
            <div className='activity-dashboard-card-header'>
              <h3>My Activity Feed</h3>
              <i className="fas fa-question-circle"/>
            </div>
            <div className='activity-dashboard-card-filter'>
                <span>Showing:</span>
                <button type='button'>Started only <i className="fas fa-sort-down"/></button>
            </div>
            <div className='activity-dashboard-card-no-data'>
            <i className="fas fa-comments"/>
              <span>No Activity in your feed</span>
              <p>The Activity Feed can help you keep up to date with Stories, Epics, and Projects.</p>
            </div>
          </div>
          */}

        <div className="activity-works">
          <DueDates
            allProjects={projectsForCurrentUser}
            favoritedProjects={projectsFavoritedByCurrentUser}
            allCards={cardsForCurrentUser}
            favoritedCards={cardsFavoritedByCurrentUser}
            assignedCards={cardsAssignedToCurrentUser}
          />

          <RecentActions
            actionsFromAccessibleProjects={actionsFromAccessibleProjects}
            actionsFromFavoritedProjects={actionsFromFavoritedProjects}
            actionsFromFavoritedCards={actionsFromFavoritedCards}
          />
        </div>

        <div className="actvity-dashboard-middle-section">
          <Feed
            title="My Projects"
            statusEnum={Statuses}
            itemsForCurrentUser={projectsForCurrentUser}
            itemsCreatedByCurrentUser={projectsCreatedByCurrentUser}
            itemsAssignedToCurrentUser={projectsAssignedToCurrentUser}
            itemsFavoritedByCurrentUser={projectsFavoritedByCurrentUser}
          />

          <Feed
            title="My Cards"
            statusEnum={CardStatuses}
            itemsForCurrentUser={cardsForCurrentUser}
            itemsCreatedByCurrentUser={cardsCreatedByCurrentUser}
            itemsAssignedToCurrentUser={cardsAssignedToCurrentUser}
            itemsFavoritedByCurrentUser={cardsFavoritedByCurrentUser}
          />
        </div>
      </div>
    );
  }
);

Activity.propTypes = {
  projectsForCurrentUser: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  projectsCreatedByCurrentUser: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  projectsAssignedToCurrentUser: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  projectsFavoritedByCurrentUser: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  // // pause ...
  cardsForCurrentUser: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  cardsCreatedByCurrentUser: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  cardsAssignedToCurrentUser: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  cardsFavoritedByCurrentUser: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  // // pause ...
  actionsFromAccessibleProjects: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  actionsFromFavoritedProjects: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  actionsFromFavoritedCards: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  // onCreate: PropTypes.func.isRequired,
  // onUpdate: PropTypes.func.isRequired,
  onFilterMyActivityFeed: PropTypes.func.isRequired,
};

export default Activity;
