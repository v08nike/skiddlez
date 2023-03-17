import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  labelsForCurrentBoardSelector,
  makeCardByIdSelector,
  makeLabelsByCardIdSelector,
  makeNotificationsTotalByCardIdSelector,
  makeTasksByCardIdSelector,
  makeUsersByCardIdSelector,
  membershipsForCurrentProjectSelector,
  pathSelector,
  projectsToListsForCurrentUserSelector,
} from '../selectors';
import {
  addLabelToCard,
  addUserToCard,
  createLabelInCurrentBoard,
  deleteCard,
  deleteLabel,
  fetchBoard,
  moveCard,
  removeLabelFromCard,
  removeUserFromCard,
  transferCard,
  updateLabel,
  updateCard,
} from '../actions/entry';
import Card from '../components/Card';

const makeMapStateToProps = () => {
  const cardByIdSelector = makeCardByIdSelector();
  const usersByCardIdSelector = makeUsersByCardIdSelector();
  const labelsByCardIdSelector = makeLabelsByCardIdSelector();
  const tasksByCardIdSelector = makeTasksByCardIdSelector();
  const notificationsTotalByCardIdSelector = makeNotificationsTotalByCardIdSelector();

  return (state, { id, index }) => {
    const { projectId } = pathSelector(state);
    const allProjectsToLists = projectsToListsForCurrentUserSelector(state);
    const allProjectMemberships = membershipsForCurrentProjectSelector(state);
    const allLabels = labelsForCurrentBoardSelector(state);

    const { name, status, dueDate, description, timer, coverUrl, boardId,
      listId, isPersisted, activityCount } = cardByIdSelector(
      state,
      id,
    );

    const users = usersByCardIdSelector(state, id);
    const labels = labelsByCardIdSelector(state, id);
    const tasks = tasksByCardIdSelector(state, id);
    const notificationsTotal = notificationsTotalByCardIdSelector(state, id);

    return {
      id,
      index,
      name,
      status,
      dueDate,
      description,
      timer,
      coverUrl,
      activityCount,
      boardId,
      listId,
      projectId,
      isPersisted,
      notificationsTotal,
      users,
      labels,
      tasks,
      allProjectsToLists,
      allProjectMemberships,
      allLabels,
      theme: state.theme.theme
    };
  };
};

const mapDispatchToProps = (dispatch, { id }) =>
  bindActionCreators(
    {
      onUpdate: (data) => updateCard(id, data),
      onMove: (listId, index) => moveCard(id, listId, index),
      onTransfer: (boardId, listId) => transferCard(id, boardId, listId),
      onDelete: () => deleteCard(id),
      onUserAdd: (userId) => addUserToCard(userId, id),
      onUserRemove: (userId) => removeUserFromCard(userId, id),
      onBoardFetch: fetchBoard,
      onLabelAdd: (labelId) => addLabelToCard(labelId, id),
      onLabelRemove: (labelId) => removeLabelFromCard(labelId, id),
      onLabelCreate: (data) => createLabelInCurrentBoard(data),
      onLabelUpdate: (labelId, data) => updateLabel(labelId, data),
      onLabelDelete: (labelId) => deleteLabel(labelId),
    },
    dispatch,
  );

export default connect(makeMapStateToProps, mapDispatchToProps)(Card);
