import ActionTypes from '../constants/ActionTypes';

/* Actions */

export const register = (data) => ({
  type: ActionTypes.REGISTER,
  payload: {
    data,
  },
});

export const clearRegisterError = () => ({
  type: ActionTypes.REGISTER_ERROR_CLEAR,
  payload: {},
});

export const registerError = (data) => ({
  type: ActionTypes.REGISTER_ERROR,
  payload: data,
});

/* Events */

export const registerRequested = (data) => ({
  type: ActionTypes.REGISTER_REQUESTED,
  payload: {
    data,
  },
});

export const registerSucceeded = (status) => ({
  type: ActionTypes.REGISTER_SUCCEEDED,
  payload: {
    status,
  },
});

export const registerFailed = (error) => ({
  type: ActionTypes.REGISTER_FAILED,
  payload: {
    error,
  },
});
