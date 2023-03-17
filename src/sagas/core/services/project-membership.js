import { call, put, select } from 'redux-saga/effects';

import { createProjectMembershipRequest, deleteProjectMembershipRequest, updateProjectMembershipRequest } from '../requests';
import { pathSelector } from '../../../selectors';
import { createProjectMembership, deleteProjectMembership, updateProjectMembership } from '../../../actions';
import { createLocalId } from '../../../utils/local-id';

export function* createProjectMembershipService(projectId, data) {
  const localId = yield call(createLocalId);

  yield put(
    createProjectMembership({
      ...data,
      projectId,
      id: localId,
    }),
  );

  yield call(createProjectMembershipRequest, projectId, localId, data);
}

export function* createMembershipInCurrentProjectService(data) {
  const { projectId } = yield select(pathSelector);

  yield call(createProjectMembershipService, projectId, data);
}

export function* deleteProjectMembershipService(id) {
  yield put(deleteProjectMembership(id));
  yield call(deleteProjectMembershipRequest, id);
}

export function* updateProjectMembershipService(data) {
  yield put(updateProjectMembership(data));
  yield call(updateProjectMembershipRequest, data.projectId, data);
}
