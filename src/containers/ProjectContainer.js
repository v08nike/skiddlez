import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  allUsersSelector,
  currentProjectSelector,
  currentUserSelector,
  membershipsForCurrentProjectSelector,
  projectsForCurrentUserSelector
} from '../selectors';
import {
  createMembershipInCurrentProject,
  deleteCurrentProject,
  deleteProjectMembership,
  updateCurrentProject,
  updateCurrentProjectBackgroundImage,
  createBoardInCurrentProject 
} from '../actions/entry';
import Project from '../components/Project';

const mapStateToProps = (state) => {
  const allUsers = allUsersSelector(state);
  const { isAdmin } = currentUserSelector(state);
  const { name, background, backgroundImage, isBackgroundImageUpdating, id } = currentProjectSelector(
    state
  );
  const memberships = membershipsForCurrentProjectSelector(state);
  const allProjects = projectsForCurrentUserSelector(state);

  return {
    name,
    background,
    backgroundImage,
    isBackgroundImageUpdating,
    memberships,
    allUsers,
    isEditable: isAdmin,
    userProjects : allProjects,
    currentProject : id
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators( 
    {
      onUpdate: updateCurrentProject,
      onBackgroundImageUpdate: updateCurrentProjectBackgroundImage,
      onDelete: deleteCurrentProject,
      onMembershipCreate: createMembershipInCurrentProject,
      onMembershipDelete: deleteProjectMembership,
      onCreate: createBoardInCurrentProject
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Project);
