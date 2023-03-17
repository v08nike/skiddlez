import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { currentUserSelector, projectsForCurrentUserSelector } from '../selectors';
// import { createProject, updateCurrentProject } from '../actions/entry';
import { createProject, updateProject } from '../actions/entry/project';
import { updateProjectMembership } from '../actions/entry/project-membership';

import Projects from '../components/Projects';

const mapStateToProps = (state) => {
  const { isAdmin } = currentUserSelector(state);
  const projects = projectsForCurrentUserSelector(state);

  return {
    items: projects,
    isEditable: isAdmin,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onCreate: createProject,
      onUpdate: updateProject,
      onUpdateProjectMembership: updateProjectMembership,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
