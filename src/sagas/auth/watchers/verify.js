import { all, takeLatest } from 'redux-saga/effects';

import { verifyService, clearAuthenticateErrorService } from '../services';
import EntryActionTypes from '../../../constants/EntryActionTypes';

export default function* verifyWatchers() {
  yield all([
    takeLatest(EntryActionTypes.VERIFY, ({ payload }) => verifyService(payload)),
    takeLatest(EntryActionTypes.AUTHENTICATE_ERROR_CLEAR, () => clearAuthenticateErrorService()),
  ]);
}
