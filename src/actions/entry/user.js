import EntryActionTypes from '../../constants/EntryActionTypes';

export const createUser = (data) => ({
  type: EntryActionTypes.USER_CREATE,
  payload: {
    data,
  },
});

export const clearUserCreateError = () => ({
  type: EntryActionTypes.USER_CREATE_ERROR_CLEAR,
  payload: {},
});

export const updateUser = (id, data) => ({
  type: EntryActionTypes.USER_UPDATE,
  payload: {
    id,
    data,
  },
});

export const updateCurrentUser = (data) => ({
  type: EntryActionTypes.CURRENT_USER_UPDATE,
  payload: {
    data,
  },
});

export const updateCurrentUserEmail = (data) => ({
  type: EntryActionTypes.CURRENT_USER_EMAIL_UPDATE,
  payload: {
    data,
  },
});

export const clearCurrentUserEmailUpdateError = () => ({
  type: EntryActionTypes.CURRENT_USER_EMAIL_UPDATE_ERROR_CLEAR,
  payload: {},
});

export const updateCurrentUserPassword = (data) => ({
  type: EntryActionTypes.CURRENT_USER_PASSWORD_UPDATE,
  payload: {
    data,
  },
});

export const clearCurrentUserPasswordUpdateError = () => ({
  type: EntryActionTypes.CURRENT_USER_PASSWORD_UPDATE_ERROR_CLEAR,
  payload: {},
});

export const updateCurrentUserUsername = (data) => ({
  type: EntryActionTypes.CURRENT_USER_USERNAME_UPDATE,
  payload: {
    data,
  },
});

export const clearCurrentUserUsernameUpdateError = () => ({
  type: EntryActionTypes.CURRENT_USER_USERNAME_UPDATE_ERROR_CLEAR,
  payload: {},
});

export const updateCurrentUserAvatar = (data) => ({
  type: EntryActionTypes.CURRENT_USER_AVATAR_UPDATE,
  payload: {
    data,
  },
});

export const deleteUser = (id) => ({
  type: EntryActionTypes.USER_DELETE,
  payload: {
    id,
  },
});

export const addUserToCard = (id, cardId) => ({
  type: EntryActionTypes.USER_TO_CARD_ADD,
  payload: {
    id,
    cardId,
  },
});

export const addUserToCurrentCard = (id) => ({
  type: EntryActionTypes.USER_TO_CURRENT_CARD_ADD,
  payload: {
    id,
  },
});

export const removeUserFromCard = (id, cardId) => ({
  type: EntryActionTypes.USER_FROM_CARD_REMOVE,
  payload: {
    id,
    cardId,
  },
});

export const removeUserFromCurrentCard = (id) => ({
  type: EntryActionTypes.USER_FROM_CURRENT_CARD_REMOVE,
  payload: {
    id,
  },
});

export const addUserToFilterInCurrentBoard = (id) => ({
  type: EntryActionTypes.USER_TO_FILTER_IN_CURRENT_BOARD_ADD,
  payload: {
    id,
  },
});

export const removeUserFromFilterInCurrentBoard = (id) => ({
  type: EntryActionTypes.USER_FROM_FILTER_IN_CURRENT_BOARD_REMOVE,
  payload: {
    id,
  },
});
