import { call, select } from 'redux-saga/effects';

import authSaga from './auth';
import coreSaga from './core';
import { accessTokenSelector } from '../selectors';

export default function* rootSaga() {
  const accessToken = yield select(accessTokenSelector);

  if (!accessToken) {
    yield call(authSaga);
  }

  yield call(coreSaga);
}
