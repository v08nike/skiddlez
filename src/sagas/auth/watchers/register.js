import { all, takeLatest } from 'redux-saga/effects';

import { registerService, clearRegisterErrorService } from '../services';
import EntryActionTypes from '../../../constants/EntryActionTypes';

export default function* registerWatchers() {
  yield all([
    takeLatest(EntryActionTypes.REGISTER, ({ payload: { data } }) => registerService(data)),
    takeLatest(EntryActionTypes.REGISTER_ERROR_CLEAR, () => clearRegisterErrorService()),
  ]);
}
