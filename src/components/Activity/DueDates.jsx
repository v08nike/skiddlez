import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import classNames from 'classnames';
import styles from "./Activity.module.scss";
import Paths from "../../constants/Paths";
import { CardDueDateFilter, ProjectDueDateFilter } from "../../constants/Enums";

const DueDates = React.memo(
  ({
    allProjects,
    favoritedProjects,
    allCards,
    favoritedCards,
    assignedCards,
  }) => {
    const [t] = useTranslation();

    // const [showProject, setShowProject] = useState(true);
    // const [showCard, setShowCard] = useState(false);

    const [showAllProjects, setShowAllProjects] = useState(false);
    const [showFavoritedProjects, setShowFavoritedProjects] = useState(false);
    const [showAllCards, setShowAllCards] = useState(false);
    const [showFavoritedCards, setShowFavoritedCards] = useState(false);
    const [showAssignedCards, setShowAssignedCards] = useState(false);
    // // Use the first entry in statusEnum as the default status.
    // // Remember to cast as String so that '===' works.
    const [itemType, setItemType] = useState("project");
    const [status, setStatus] = useState(
      String(Object.values(ProjectDueDateFilter)[0])
    );
    const [statusOptions, setStatusOptions] = useState([]);
    const [showing, setShowing] = useState("1");

    const setToFalse = useCallback(() => {
      if (showAllProjects) {
        setShowAllProjects(false);
      }
      if (showFavoritedProjects) {
        setShowFavoritedProjects(false);
      }
      if (showAllCards) {
        setShowAllCards(false);
      }
      if (showFavoritedCards) {
        setShowFavoritedCards(false);
      }
      if (showAssignedCards) {
        setShowAssignedCards(false);
      }
    }, [
      setShowAllProjects,
      showAllProjects,
      setShowFavoritedProjects,
      showFavoritedProjects,
      setShowAllCards,
      showAllCards,
      setShowFavoritedCards,
      showFavoritedCards,
      setShowAssignedCards,
      showAssignedCards,
    ]);

    useEffect(() => {
      const sos = [];

      switch (itemType) {
        case "project":
          Object.keys(ProjectDueDateFilter).forEach((k) => {
            sos.push({
              key: ProjectDueDateFilter[k],
              value: ProjectDueDateFilter[k],
              text: k,
            });
          });
          break;
        default:
          Object.keys(CardDueDateFilter).forEach((k) => {
            sos.push({
              key: CardDueDateFilter[k],
              value: CardDueDateFilter[k],
              text: k,
            });
          });
      }

      setStatusOptions(sos);
    }, [itemType, setStatusOptions]);

    useEffect(() => {
      setToFalse();

      console.log("itemType = ", itemType, "; status = ", status);

      switch (itemType) {
        case "project":
          switch (status) {
            // case 1:
            case "1":
              setShowAllProjects(true);
              break;
            default:
              setShowFavoritedProjects(true);
          }
          break;
        default:
          switch (status) {
            // case 1:
            case "1":
              setShowAllCards(true);
              break;
            // case 2:
            case "2":
              setShowFavoritedCards(true);
              break;
            default:
              setShowAssignedCards(true);
          }
      }
    }, [status, itemType, setToFalse]);

    const handleProjectClick = useCallback(
      (e) => {
        e.preventDefault();

        setItemType("project");
      },
      [setItemType]
    );

    const handleCardClick = useCallback(
      (e) => {
        e.preventDefault();

        setItemType("card");
      },
      [setItemType]
    );

    const handleShowingChange = (event) => {
      // setToFalse();

      switch (event.target.value) {
        // case 1:
        case "1":
          handleProjectClick(event);
          break;
        default:
          handleCardClick(event);
      }

      setShowing(event.target.value);
    };

    /*
  const statusOptions = [];
  Object.keys(ProjectDueDateFilter).forEach(k => {
    statusOptions.push({key: ProjectDueDateFilter[k], value: ProjectDueDateFilter[k], text: (k)});
  });
  */

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

    const buildList = (items) => {
      return (
        <ul className="activity-works-tasks-cards">
          {items.map((item) => {
            // console.log('item.dueDate = ', item.dueDate);

            return (
              <Link to={constructUrl(item)} key={item.id}>
                <div className="card-modal-comment">
                  <ul>
                    <li>&nbsp;</li>
                    <li>
                      <span>{item.name}</span>
                    </li>
                    <li>
                      <span>
                        {item.dueDate &&
                          t("format:longDateTime", {
                            postProcess: "formatDate",
                            value: item.dueDate,
                          })}
                        {!item.dueDate && " Due date not set "}
                      </span>
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
            <h3>Upcoming Due Dates</h3>
            <i className="fas fa-question-circle" />
          </div>
          <div className="activity-dashboard-card-filter">
            <span>Showing:</span>
            {/*
          <button type='button' onClick={handleProjectClick} className={classNames(showProject && styles.clicked)}>Project<i className="fas fa-sort-down"/></button>
          <button type='button' onClick={handleCardClick} className={classNames(showCard && styles.clicked)}>Card <i className="fas fa-sort-down"/></button>
          */}
            <select
              name="showing"
              value={showing}
              className={styles.clicked}
              onChange={(e) => handleShowingChange(e)}
            >
              <option key={Math.floor(Math.random() * 100 + 1)} value="1">
                Projects
              </option>
              <option key={Math.floor(Math.random() * 100 + 1)} value="2">
                Cards
              </option>
            </select>
          </div>
          <div className="activity-dashboard-card-filter">
            <span>Filter by :</span>
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

          {showAllProjects && buildList(allProjects)}

          {showFavoritedProjects && buildList(favoritedProjects)}

          {showAllCards && buildList(allCards)}

          {showFavoritedCards && buildList(favoritedCards)}

          {showAssignedCards && buildList(assignedCards)}
        </div>
      </>
    );
  }
);

DueDates.propTypes = {
  allProjects: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  favoritedProjects: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  allCards: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  favoritedCards: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  assignedCards: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default DueDates;
