import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BoardKanban from '../components/BoardKanban/BoardKanban';

import {
  filterLabelsForCurrentBoardSelector,
  filterUsersForCurrentBoardSelector,
  labelsForCurrentBoardSelector,
  listIdsForCurrentBoardSelector,
  pathSelector,
  allUsersSelector,
  currentProjectSelector,
  currentUserSelector,
  membershipsForCurrentProjectSelector,
  projectsForCurrentUserSelector,
  boardsForCurrentProjectSelector
} from '../selectors';
import {
  updateCurrentProject,
  updateCurrentProjectBackgroundImage,
  deleteCurrentProject,
  deleteProjectMembership,
  addLabelToFilterInCurrentBoard,
  addUserToFilterInCurrentBoard,
  createLabelInCurrentBoard,
  createListInCurrentBoard,
  deleteLabel,
  moveCard,
  moveList,
  removeLabelFromFilterInCurrentBoard,
  removeUserFromFilterInCurrentBoard,
  updateLabel,
  createMembershipInCurrentProject,
  createCard,
  createBoardInCurrentProject,
  updateBoard
} from '../actions/entry';

const mapStateToProps = (state) => {
  const { cardId } = pathSelector(state);
  const allProjectMemberships = membershipsForCurrentProjectSelector(state);
  const allLabels = labelsForCurrentBoardSelector(state);
  const listIds = listIdsForCurrentBoardSelector(state);
  const filterUsers = filterUsersForCurrentBoardSelector(state);
  const filterLabels = filterLabelsForCurrentBoardSelector(state);
  const allUsers = allUsersSelector(state);
  const { isAdmin } = currentUserSelector(state);
  const { name, background, backgroundImage, isBackgroundImageUpdating, id } = currentProjectSelector(
    state,
  );
  const memberships = membershipsForCurrentProjectSelector(state);
  const projectsForCurrentUser = projectsForCurrentUserSelector(state);
  const boards = boardsForCurrentProjectSelector(state);
  const { boardId } = pathSelector(state);
  const currentBoard = boards.filter(board => board.id === boardId);

  return {
    listIds,
    filterUsers,
    filterLabels,
    allProjectMemberships,
    allLabels,
    isCardModalOpened: !!cardId, 
    name,
    background,
    backgroundImage,
    isBackgroundImageUpdating,
    memberships,
    allUsers,
    isEditable: isAdmin,
    theme: state.theme.theme,
    allProjects : projectsForCurrentUser,
    currentProject : id,
    currentBoard : currentBoard[0]
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onListCreate: createListInCurrentBoard,
      onListMove: moveList,
      onCardMove: moveCard,
      onUserToFilterAdd: addUserToFilterInCurrentBoard,
      onUserFromFilterRemove: removeUserFromFilterInCurrentBoard,
      onLabelToFilterAdd: addLabelToFilterInCurrentBoard,
      onLabelFromFilterRemove: removeLabelFromFilterInCurrentBoard,
      onLabelCreate: createLabelInCurrentBoard,
      onLabelUpdate: updateLabel,
      onLabelDelete: deleteLabel,
      onUpdate: updateCurrentProject,
      onBackgroundImageUpdate: updateCurrentProjectBackgroundImage,
      onDelete: deleteCurrentProject,
      onMembershipCreate: createMembershipInCurrentProject,
      onMembershipDelete: deleteProjectMembership,
      onCardCreate: (id,data) => createCard(id, data),
      onCreate: createBoardInCurrentProject,
      onUpdateBoard: updateBoard
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(BoardKanban);
