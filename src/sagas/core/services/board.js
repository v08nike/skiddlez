import { call, put, select } from 'redux-saga/effects';

import { goToBoardService, goToProjectService } from './router';
import {
  createBoardRequest,
  deleteBoardRequest,
  fetchBoardRequest,
  updateBoardRequest,
} from '../requests';
import { boardByIdSelector, nextBoardPositionSelector, pathSelector, boardsForCurrentProjectSelector} from '../../../selectors';
import { createBoard, deleteBoard, updateBoard } from '../../../actions';
import { createLocalId } from '../../../utils/local-id';

export function* createBoardService(projectId, data) {
  const nextData = {
    ...data,
    position: yield select(nextBoardPositionSelector, projectId),
  };

  const localId = yield call(createLocalId);

  yield put(
    createBoard({
      ...nextData, 
      projectId,
      id: localId,
    }),
  );

  const {
    success,
    payload: { board },
  } = yield call(createBoardRequest, projectId, localId, nextData);

  if (success) {
    yield call(goToBoardService, board.id);
  }
}

export function* createBoardInCurrentProjectService(data) {
  const { projectId } = yield select(pathSelector);

  yield call(createBoardService, projectId, data);
}

export function* fetchBoard(id) {
  yield call(fetchBoardRequest, id);
}

export function* updateBoardService(id, data) {
  yield put(updateBoard(id, data));
  yield call(updateBoardRequest, id, data);
}

export function* moveBoardService(id, index) {
  const { projectId } = yield select(boardByIdSelector, id);
  const position = yield select(nextBoardPositionSelector, projectId, index, id);

  yield call(updateBoardService, id, {
    position,
  });
}

export function* deleteBoardService(id) {
  const { boardId, projectId } = yield select(pathSelector);
  const boards = yield select(boardsForCurrentProjectSelector);
  let nextBoardId = null;
  if(boards.length > 1) {
    boards.forEach(board => {
      if(board.id === boardId) {
        if(boards[0].id !== board.id) {
          nextBoardId = boards[0].id;
        } else {
          nextBoardId = boards[1].id;
        }
      }
    })
  }

  yield put(deleteBoard(id));
  const result = yield call(deleteBoardRequest, id);
  if(result.success ) {
    if (id === boardId) {
      if(nextBoardId) {
        yield call(goToBoardService, nextBoardId);
      } else {
        yield call(goToProjectService, projectId);
      }
    }
  }
}
