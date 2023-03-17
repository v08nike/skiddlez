import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import classNames from 'classnames';
import styles from "./Activity.module.scss";
import Paths from "../../constants/Paths";

const Feed = React.memo(
  ({
    title,
    statusEnum,
    itemsForCurrentUser,
    itemsCreatedByCurrentUser,
    itemsAssignedToCurrentUser,
    itemsFavoritedByCurrentUser,
  }) => {
    const [showAll, setShowAll] = useState(true);
    const [showCreated, setShowCreated] = useState(false);
    const [showAssigned, setShowAssigned] = useState(false);
    const [showFavorited, setShowFavorited] = useState(false);
    // // Use the first entry in statusEnum as the default status.
    // // Remember to cast as String so that '===' works.
    const [status, setStatus] = useState(String(Object.values(statusEnum)[0]));
    const [showing, setShowing] = useState("1");

    const setToFalse = useCallback(() => {
      if (showAll) {
        setShowAll(false);
      }
      if (showCreated) {
        setShowCreated(false);
      }
      if (showAssigned) {
        setShowAssigned(false);
      }
      if (showFavorited) {
        setShowFavorited(false);
      }
    }, [
      setShowAll,
      showAll,
      setShowCreated,
      showCreated,
      setShowAssigned,
      showAssigned,
      setShowFavorited,
      showFavorited,
    ]);

    /*
  const handleAll = useCallback((e) => {
    e.preventDefault();

    setToFalse();

    setShowAll(!showAll);
  }, [setShowAll, showAll, setToFalse]);

  const handleCreated = useCallback((e) => {
    e.preventDefault();

    setToFalse();

    setShowCreated(!showCreated);
  }, [setShowCreated, showCreated, setToFalse]);

  const handleAssigned = useCallback((e) => {
    e.preventDefault();

    setToFalse();

    setShowAssigned(!showAssigned);
  }, [setShowAssigned, showAssigned, setToFalse]);

  const handleFavorited = useCallback((e) => {
    e.preventDefault();

    setToFalse();

    setShowFavorited(!showFavorited);
  }, [setShowFavorited, showFavorited, setToFalse]);
  */

    const statusOptions = [];
    Object.keys(statusEnum).forEach((k) => {
      statusOptions.push({ key: statusEnum[k], value: statusEnum[k], text: k });
    });

    const handleStatusChange = (event) => {
      setStatus(event.target.value);
    };

    const constructUrl = (item) => {
      if (item.firstBoardId) {
        // // Display board
        return Paths.BOARDS.replace(":id", item.firstBoardId);
      }
      if (item.listId) {
        // // Display card
        return Paths.CARDS.replace(":id", item.id);
      }
      return Paths.PROJECTS.replace(":id", item.id);
    };

    const handleShowingChange = (event) => {
      setToFalse();

      switch (event.target.value) {
        // case 1:
        case "1":
          setShowAll(true);
          break;
        // case 2:
        case "2":
          setShowCreated(true);
          break;
        // case 3:
        case "3":
          setShowAssigned(true);
          break;
        default:
          setShowFavorited(true);
      }

      setShowing(event.target.value);
    };

    const buildList = (items) => {
      return (
        <ul className="activity-works-tasks-cards">
          {items
            .filter((item) => {
              return String(item.status) === status;
            })
            .map((item) => {
              // console.log('20 : item = ', item);

              return (
                <Link to={constructUrl(item)} key={item.id}>
                  <div className="card-modal-comment">
                    <ul>
                      <li>&nbsp;</li>
                      <li>
                        <span>{item.name}</span>
                      </li>
                    </ul>
                  </div>
                </Link>
              );
            })}
        </ul>
      );
    };

    return (
      <>
        <div className="activity-feed activity-dashboard-card">
          <div className="activity-dashboard-card-header">
            <h3>{title}</h3>
            <i className="fas fa-question-circle" />
          </div>
          <div className="activity-dashboard-card-filter">
            <span>Showing:</span>
            {/*
            <button type='button' onClick={handleAll} className={classNames(showAll && styles.clicked)}>All <i className="fas fa-sort-down"/></button>
            <button type='button' onClick={handleCreated} className={classNames(showCreated && styles.clicked)}>Created <i className="fas fa-sort-down"/></button>
            <button type='button' onClick={handleAssigned} className={classNames(showAssigned && styles.clicked)}>Assigned <i className="fas fa-sort-down"/></button>
            <button type='button' onClick={handleFavorited} className={classNames(showFavorited && styles.clicked)}>Favorited <i className="fas fa-sort-down"/></button>
            */}
            <select
              name="showing"
              value={showing}
              className={styles.clicked}
              onChange={(e) => handleShowingChange(e)}
            >
              <option key={900 + Math.floor(Math.random() * 100 + 1)} value="1">
                All
              </option>
              <option key={900 + Math.floor(Math.random() * 100 + 1)} value="2">
                Created
              </option>
              <option key={900 + Math.floor(Math.random() * 100 + 1)} value="3">
                Assigned
              </option>
              <option key={900 + Math.floor(Math.random() * 100 + 1)} value="4">
                Favorited
              </option>
            </select>
          </div>
          <div className="activity-dashboard-card-filter">
            <span>Filter by status:</span>
            <select
              name="status"
              value={status}
              onChange={(e) => handleStatusChange(e)}
            >
              {/* <option value='0' disabled style={{display : 'none'}}>Filter status</option> */}
              {statusOptions.map((item) => {
                return (
                  <option key={item.key} value={item.key}>
                    {item.text}
                  </option>
                );
              })}
            </select>
          </div>

          {showAll && buildList(itemsForCurrentUser, status)}

          {showCreated && buildList(itemsCreatedByCurrentUser, status)}

          {showAssigned && buildList(itemsAssignedToCurrentUser, status)}

          {showFavorited && buildList(itemsFavoritedByCurrentUser, status)}
        </div>
      </>
    );
  }
);

Feed.propTypes = {
  title: PropTypes.string.isRequired,
  statusEnum: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  itemsForCurrentUser: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  itemsCreatedByCurrentUser: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  itemsAssignedToCurrentUser: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  itemsFavoritedByCurrentUser: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Feed;
