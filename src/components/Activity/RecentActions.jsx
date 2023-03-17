import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
// import classNames from 'classnames';
// import { Link } from 'react-router-dom';
// import Paths from '../../constants/Paths';
// import { CardStatuses, Statuses } from '../../constants/Enums';
import styles from "./Activity.module.scss";
import { CardStatuses, Statuses } from "../../constants/Enums";
import Item from "./Item";

const RecentActions = React.memo(
  ({
    actionsFromAccessibleProjects,
    actionsFromFavoritedProjects,
    actionsFromFavoritedCards,
  }) => {
    const [showAccessibleProjects, setShowAccessibleProjects] = useState(true);
    const [showFavoritedProjects, setShowFavoritedProjects] = useState(false);
    const [showFavoritedCards, setShowFavoritedCards] = useState(false);
    // // Use the first entry in Statuses as the default status.
    // // Remember to cast as String so that '===' works.
    const [projectStatus, setProjectStatus] = useState(
      String(Object.values(Statuses)[0])
    );
    const [cardStatus, setCardStatus] = useState(
      String(Object.values(CardStatuses)[0])
    );
    const [showing, setShowing] = useState("1");

    const setToFalse = useCallback(() => {
      if (showAccessibleProjects) {
        setShowAccessibleProjects(false);
      }
      if (showFavoritedProjects) {
        setShowFavoritedProjects(false);
      }
      if (showFavoritedCards) {
        setShowFavoritedCards(false);
      }
    }, [
      setShowAccessibleProjects,
      showAccessibleProjects,
      setShowFavoritedProjects,
      showFavoritedProjects,
      setShowFavoritedCards,
      showFavoritedCards,
    ]);

    /*
  const handleAccessibleProjects = useCallback((e) => {
    e.preventDefault();

    setToFalse();

    setShowAccessibleProjects(!showAccessibleProjects);
  }, [setShowAccessibleProjects, showAccessibleProjects, setToFalse]);

  const handleFavoritedProjects = useCallback((e) => {
    e.preventDefault();

    setToFalse();

    setShowFavoritedProjects(!showFavoritedProjects);
  }, [setShowFavoritedProjects, showFavoritedProjects, setToFalse]);

  const handleFavoritedCards = useCallback((e) => {
    e.preventDefault();

    setToFalse();

    setShowFavoritedCards(!showFavoritedCards);
  }, [setShowFavoritedCards, showFavoritedCards, setToFalse]);
  */

    const statusOptions = [];
    Object.keys(Statuses).forEach((k) => {
      statusOptions.push({ key: Statuses[k], value: Statuses[k], text: k });
    });

    const cardStatusOptions = [];
    Object.keys(CardStatuses).forEach((k) => {
      cardStatusOptions.push({
        key: CardStatuses[k],
        value: CardStatuses[k],
        text: k,
      });
    });

    const handleProjectStatusChange = (event) => {
      setProjectStatus(event.target.value);
    };

    const handleCardStatusChange = (event) => {
      setCardStatus(event.target.value);
    };

    const handleShowingChange = (event) => {
      setToFalse();

      switch (event.target.value) {
        // case 1:
        case "1":
          // setShowAccessibleProjects(!showAccessibleProjects);
          setShowAccessibleProjects(true);
          break;
        // case 2:
        case "2":
          // setShowFavoritedProjects(!showFavoritedProjects);
          setShowFavoritedProjects(true);
          break;
        default:
          // setShowFavoritedCards(!showFavoritedCards);
          setShowFavoritedCards(true);
      }

      setShowing(event.target.value);
    };

    /*
  const constructUrl = (item) => {
    if (item.firstBoardId) {
      // // Display board
      return Paths.BOARDS.replace(':id', item.firstBoardId);
    }
    if (item.cardId) {
      // // Display card
      return Paths.CARDS.replace(':id', item.cardId);
    }
    return Paths.PROJECTS.replace(':id', item.id);
  }
  */

    return (
      <>
        <div className="activity-feed activity-dashboard-card">
          <div className="activity-dashboard-card-header">
            <h3>My Activity Feed</h3>
            <i className="fas fa-question-circle" />
          </div>
          <div className="activity-dashboard-card-filter">
            <span>Showing:</span>
            {/*
            <button type='button' onClick={handleAccessibleProjects} className={classNames(showAccessibleProjects && styles.clicked)}>All <i className="fas fa-sort-down"/></button>
            <button type='button' onClick={handleFavoritedProjects} className={classNames(showFavoritedProjects && styles.clicked)}>Favorited Projects <i className="fas fa-sort-down"/></button>
            <button type='button' onClick={handleFavoritedCards} className={classNames(showFavoritedCards && styles.clicked)}>Favorited Cards <i className="fas fa-sort-down"/></button>
            */}
            <select
              name="showing"
              value={showing}
              className={styles.clicked}
              onChange={(e) => handleShowingChange(e)}
            >
              <option key={Math.floor(Math.random() * 100 + 1)} value="1">
                Accessible projects
              </option>
              <option key={Math.floor(Math.random() * 100 + 1)} value="2">
                Favorited projects
              </option>
              <option key={Math.floor(Math.random() * 100 + 1)} value="3">
                Favorited cards
              </option>
            </select>
          </div>
          <div className="activity-dashboard-card-filter">
            <span>Filter by project status:</span>
            <select
              name="projectStatus"
              value={projectStatus}
              onChange={(e) => handleProjectStatusChange(e)}
            >
              {/* <option value='0' disabled style={{display : 'none'}}>Filter status</option> */}
              {statusOptions.map((statusOption) => {
                return (
                  <option key={statusOption.key} value={statusOption.value}>
                    {statusOption.text}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="activity-dashboard-card-filter">
            <span>Filter by card status:</span>
            <select
              name="cardStatus"
              value={cardStatus}
              onChange={(e) => handleCardStatusChange(e)}
            >
              {cardStatusOptions.map((cardStatusOption) => {
                return (
                  <option
                    key={cardStatusOption.key}
                    value={cardStatusOption.value}
                  >
                    {cardStatusOption.text}
                  </option>
                );
              })}
            </select>
          </div>

          {showAccessibleProjects && (
            <ul className="activity-works-tasks-cards">
              {actionsFromAccessibleProjects
                .filter((item) => {
                  const projectStatusString = String(item.projectStatus);
                  const cardStatusString = String(item.status);
                  return (
                    projectStatusString === projectStatus &&
                    cardStatusString === cardStatus
                  );
                })
                .map((item) => {
                  // console.log(item);

                  return (
                    <Item
                      key={item.id}
                      type={item.type}
                      data={item.data}
                      createdAt={new Date(item.createdAt)}
                      user={item.user}
                    />
                  );
                })}
            </ul>
          )}

          {showFavoritedProjects && (
            <ul className="activity-works-tasks-cards">
              {actionsFromFavoritedProjects
                .filter((item) => {
                  const projectStatusString = String(item.projectStatus);
                  const cardStatusString = String(item.status);
                  return (
                    projectStatusString === projectStatus &&
                    cardStatusString === cardStatus
                  );
                })
                .map((item) => {
                  // console.log(item);

                  return (
                    <Item
                      key={item.id}
                      type={item.type}
                      data={item.data}
                      createdAt={new Date(item.createdAt)}
                      user={item.user}
                    />
                  );
                })}
            </ul>
          )}

          {showFavoritedCards && (
            <ul className="activity-works-tasks-cards">
              {actionsFromFavoritedCards
                .filter((item) => {
                  const projectStatusString = String(item.projectStatus);
                  const cardStatusString = String(item.status);
                  return (
                    projectStatusString === projectStatus &&
                    cardStatusString === cardStatus
                  );
                })
                .map((item) => {
                  // console.log(item);

                  return (
                    <Item
                      key={item.id}
                      type={item.type}
                      data={item.data}
                      createdAt={new Date(item.createdAt)}
                      user={item.user}
                    />
                  );
                })}

              {/* <Link
            to={constructUrl(item)}
            key={item.id} >
            <li className='activity-works-tasks-card'>
               {item.type} : {item.data.text}
            </li>
          </Link> */}
            </ul>
          )}
        </div>
      </>
    );
  }
);

RecentActions.propTypes = {
  actionsFromAccessibleProjects: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  actionsFromFavoritedProjects: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  actionsFromFavoritedCards: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default RecentActions;
