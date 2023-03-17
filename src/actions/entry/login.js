import EntryActionTypes from '../../constants/EntryActionTypes';

export const authenticate = (data) => ({
  type: EntryActionTypes.AUTHENTICATE,
  payload: {
    data,
  },
});
export const authenticateGoogle = (data) => ({
  type: EntryActionTypes.AUTHENTICATE_GOOGLE,
  payload: data,
});
export const closeAccount = () => ({
  type: EntryActionTypes.CLOSE_ACCOUNT,
  payload: {},
});

export const clearAuthenticateError = () => ({
  type: EntryActionTypes.AUTHENTICATE_ERROR_CLEAR,
  payload: {},
});

export const logout = () => ({
  type: EntryActionTypes.LOGOUT,
  payload: {},
});

export const register = (data) => ({
  type: EntryActionTypes.REGISTER,
  payload: {
    data,
  },
});
export const verify = (data) => ({
  type: EntryActionTypes.VERIFY,
  payload: data,
});
export const clearRegisterError = () => ({
  type: EntryActionTypes.REGISTER_ERROR_CLEAR,
  payload: {},
});
export const registerError = (data) => ({
  type: EntryActionTypes.REGISTER_ERROR,
  payload: data,
});
