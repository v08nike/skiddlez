import { all, takeLatest } from 'redux-saga/effects';

import { logoutService, closeAccountService } from '../services';
import EntryActionTypes from '../../../constants/EntryActionTypes';

export default function* loginWatchers() {
  yield all([
    takeLatest(EntryActionTypes.LOGOUT, () => logoutService()),
    takeLatest(EntryActionTypes.CLOSE_ACCOUNT, () => closeAccountService()),
  ]);
}
