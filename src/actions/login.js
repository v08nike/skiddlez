import ActionTypes from '../constants/ActionTypes';

/* Actions */

export const authenticate = (data) => ({
  type: ActionTypes.AUTHENTICATE,
  payload: {
    data,
  },
});
export const authenticateGoogle = (data) => ({
  type: ActionTypes.AUTHENTICATE_GOOGLE,
  payload: data
});
export const verify = (data) => ({
  type: ActionTypes.VERIFY,
  payload: data,
});

export const closeAccount = () => ({
  type: ActionTypes.CLOSE_ACCOUNT
});

export const clearAuthenticateError = () => ({
  type: ActionTypes.AUTHENTICATE_ERROR_CLEAR,
  payload: {},
});

export const logout = () => ({
  type: ActionTypes.LOGOUT,
  payload: {},
});

/* Events */

export const authenticateRequested = (data) => ({
  type: ActionTypes.AUTHENTICATE_REQUESTED,
  payload: {
    data,
  },
});
export const verifyRequested = (data) => ({
  type: ActionTypes.VERIFY_REQUESTED,
  payload: {
    data,
  },
});

export const authenticateSucceeded = (accessToken) => ({
  type: ActionTypes.AUTHENTICATE_SUCCEEDED,
  payload: {
    accessToken,
  },
});
export const closeAccountSucceeded = (status) => ({
  type: ActionTypes.CLOSE_ACCOUNT_SUCCEEDED,
  payload: {
    status,
  },
});

export const authenticateFailed = (error) => ({
  type: ActionTypes.AUTHENTICATE_FAILED,
  payload: {
    error,
  },
});
