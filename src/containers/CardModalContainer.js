import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import omit from 'lodash/omit';

import {
  actionsForCurrentCardSelector,
  attachmentsForCurrentCardSelector,
  currentCardSelector,
  currentUserSelector,
  labelsForCurrentBoardSelector,
  labelsForCurrentCardSelector,
  membershipsForCurrentProjectSelector,
  pathSelector,
  projectsToListsForCurrentUserSelector,
  tasksForCurrentCardSelector,
  usersForCurrentCardSelector,
  cardIdsByListIdSelector,
  cardByIdSelector
} from '../selectors';
import {
  addLabelToCurrentCard,
  addUserToCurrentCard,
  createAttachmentInCurrentCard,
  createCommentActionInCurrentCard,
  createLabelInCurrentBoard,
  createTaskInCurrentCard,
  deleteAttachment,
  deleteCommentAction,
  deleteCurrentCard,
  deleteLabel,
  deleteTask,
  fetchActionsInCurrentCard,
  fetchBoard,
  moveCurrentCard,
  removeLabelFromCurrentCard,
  removeUserFromCurrentCard,
  transferCurrentCard,
  updateAttachment,
  updateCommentAction,
  updateCurrentCard,
  updateLabel,
  updateTask,
} from '../actions/entry';
import Paths from '../constants/Paths';
import CardModal from '../components/CardModal';

const mapStateToProps = (state) => {
  const { projectId } = pathSelector(state);
  const { id: currentUserId, isAdmin } = currentUserSelector(state);
  const allProjectsToLists = projectsToListsForCurrentUserSelector(state);
  const allProjectMemberships = membershipsForCurrentProjectSelector(state);
  const allLabels = labelsForCurrentBoardSelector(state);

  allProjectsToLists.forEach((project, i) => {
    project.boards.forEach((board, j) => {
      board.lists.forEach((list, k) => {
        const cards = []
          cardIdsByListIdSelector(state, list.id).forEach(id => {
          const card = cardByIdSelector(state, id);
          cards.push({
            name : card.name,
            id : card.id
          })
        })
        allProjectsToLists[i].boards[j].lists[k].cards = cards
      })
    })
  })

  const {
    name,
    description,
    dueDate,
    timer,
    isSubscribed,
    isActionsFetching,
    isAllActionsFetched,
    boardId,
    listId,
    id
  } = currentCardSelector(state);

  const users = usersForCurrentCardSelector(state);
  const labels = labelsForCurrentCardSelector(state);
  const tasks = tasksForCurrentCardSelector(state);
  const attachments = attachmentsForCurrentCardSelector(state);
  const actions = actionsForCurrentCardSelector(state);

  return {
    name,
    description,
    dueDate,
    timer,
    isSubscribed,
    isActionsFetching,
    isAllActionsFetched,
    listId,
    boardId,
    projectId,
    users,
    labels,
    tasks,
    attachments,
    actions,
    allProjectsToLists,
    allProjectMemberships,
    allLabels,
    isEditable: isAdmin,
    theme : state.theme.theme,
    currentCard : id,
    currentUserId,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onUpdate: updateCurrentCard,
      onMove: moveCurrentCard,
      onTransfer: transferCurrentCard,
      onDelete: deleteCurrentCard,
      onUserAdd: addUserToCurrentCard,
      onUserRemove: removeUserFromCurrentCard,
      onBoardFetch: fetchBoard,
      onLabelAdd: addLabelToCurrentCard,
      onLabelRemove: removeLabelFromCurrentCard,
      onLabelCreate: createLabelInCurrentBoard,
      onLabelUpdate: updateLabel,
      onLabelDelete: deleteLabel,
      onTaskCreate: createTaskInCurrentCard,
      onTaskUpdate: updateTask,
      onTaskDelete: deleteTask,
      onAttachmentCreate: createAttachmentInCurrentCard,
      onAttachmentUpdate: updateAttachment,
      onAttachmentDelete: deleteAttachment,
      onActionsFetch: fetchActionsInCurrentCard,
      onCommentActionCreate: createCommentActionInCurrentCard,
      onCommentActionUpdate: updateCommentAction,
      onCommentActionDelete: deleteCommentAction,
      push,
    },
    dispatch,
  );

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...omit(dispatchProps, 'push'),
  onClose: () => {
    dispatchProps.push(Paths.BOARDS.replace(':id', stateProps.boardId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CardModal);
