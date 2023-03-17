import { call, put } from 'redux-saga/effects';

import { registerRequest } from '../requests';
import { register, clearRegisterError } from '../../../actions';

export function* registerService(data) {
  yield put(register(data));
  yield call(registerRequest, data);
}

export function* clearRegisterErrorService() {
  yield put(clearRegisterError());
}
