import { put, call } from 'redux-saga/effects';

import { logout } from '../../../actions';
import { closeAccountRequest } from '../requests';
// eslint-disable-next-line import/prefer-default-export
export function* logoutService() {
  yield put(logout());
}
export function* closeAccountService() {
  const { success } = yield call(closeAccountRequest);
  console.log(success, "success");
  if (success) yield put(logout());
  
}
