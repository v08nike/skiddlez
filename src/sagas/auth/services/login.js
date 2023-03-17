import { call, put } from 'redux-saga/effects';

import { authenticateRequest, authenticateGoogleRequest, verifyRequest } from '../requests';
import { authenticate, authenticateGoogle, verify, clearAuthenticateError } from '../../../actions';

export function* authenticateService(data) {
  yield put(authenticate(data));
  yield call(authenticateRequest, data);
}
export function* authenticateGoogleService(data) {
  yield put(authenticateGoogle(data));
  yield call(authenticateGoogleRequest, data);
}

export function* verifyService(data) {
  yield put(verify(data));
  yield call(verifyRequest, data);
}

export function* clearAuthenticateErrorService() {
  yield put(clearAuthenticateError());
}
