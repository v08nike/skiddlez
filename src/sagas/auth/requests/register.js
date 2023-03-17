import { call, put } from 'redux-saga/effects';

import { registerFailed, registerRequested, registerSucceeded } from '../../../actions';
import api from '../../../api';

// eslint-disable-next-line import/prefer-default-export
export function* registerRequest(data) {
  yield put(registerRequested(data));

  try {
    const {status} = yield call(api.registerUser, data);

    const action = registerSucceeded(status);
    yield put(action);

    return {
      success: true,
      payload: action.payload,
    };
  } catch (error) {
    const action = registerFailed(error);
    yield put(action);

    return {
      success: false,
      payload: action.payload,
    };
  }
}
