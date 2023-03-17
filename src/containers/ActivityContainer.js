import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Activity from "../components/Activity/Activity";
import { updateProjectMembership } from '../actions/entry/project-membership';

import {
  projectsForCurrentUserSelector,
  cardsForCurrentUserSelector,
} from '../selectors/current';
import {
  projectsCreatedByCurrentUserSelector,
  projectsAssignedToCurrentUserSelector,
  projectsFavoritedByCurrentUserSelector,
  // // pause ...
  cardsCreatedByCurrentUserSelector,
  cardsAssignedToCurrentUserSelector,
  cardsFavoritedByCurrentUserSelector,
  // // pause ...
  actionsFromAccessibleProjectsSelector,
  actionsFromFavoritedProjectsSelector,
  actionsFromFavoritedCardsSelector,
} from '../selectors/user';

const mapStateToProps = (state) => {
  const projectsForCurrentUser =
    projectsForCurrentUserSelector(state);
  const projectsCreatedByCurrentUser =
    projectsCreatedByCurrentUserSelector(state);
  const projectsAssignedToCurrentUser =
    projectsAssignedToCurrentUserSelector(state);
  const projectsFavoritedByCurrentUser =
    projectsFavoritedByCurrentUserSelector(state);
  // const { isAdmin } = currentUserSelector(state);
  const cardsForCurrentUser =
    cardsForCurrentUserSelector(state);
  const cardsCreatedByCurrentUser =
    cardsCreatedByCurrentUserSelector(state);
  const cardsAssignedToCurrentUser =
    cardsAssignedToCurrentUserSelector(state);
  const cardsFavoritedByCurrentUser =
    cardsFavoritedByCurrentUserSelector(state);
    // // pause ...
    const actionsFromAccessibleProjects =
      actionsFromAccessibleProjectsSelector(state);
    const actionsFromFavoritedProjects =
      actionsFromFavoritedProjectsSelector(state);
    const actionsFromFavoritedCards =
      actionsFromFavoritedCardsSelector(state);

  return {
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
    // isEditable: isAdmin,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // onCreate: createProject,
      // onUpdate: updateProject,
      onFilterMyActivityFeed: updateProjectMembership,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
// export default Activity;
