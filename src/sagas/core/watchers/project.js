import { all, takeLatest } from 'redux-saga/effects';

import {
  createProjectService,
  deleteCurrentProjectService,
  updateCurrentProjectBackgroundImageService,
  updateCurrentProjectService,
  updateProjectService,
} from '../services';
import EntryActionTypes from '../../../constants/EntryActionTypes';

export default function* projectWatchers() {
  yield all([
    takeLatest(EntryActionTypes.PROJECT_CREATE, ({ payload: { data } }) =>
      createProjectService(data),
    ),
    takeLatest(EntryActionTypes.PROJECT_UPDATE, ({ payload: { id, data } }) =>
      updateProjectService(id, data),
    ),
    takeLatest(EntryActionTypes.CURRENT_PROJECT_UPDATE, ({ payload: { data } }) =>
      updateCurrentProjectService(data),
    ),
    takeLatest(EntryActionTypes.CURRENT_PROJECT_BACKGROUND_IMAGE_UPDATE, ({ payload: { data } }) =>
      updateCurrentProjectBackgroundImageService(data),
    ),
    takeLatest(EntryActionTypes.CURRENT_PROJECT_DELETE, () => deleteCurrentProjectService()),
  ]);
}
