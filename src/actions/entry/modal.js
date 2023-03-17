import EntryActionTypes from '../../constants/EntryActionTypes';
import ModalTypes from '../../constants/ModalTypes';

export const openUsersModal = () => ({
  type: EntryActionTypes.MODAL_OPEN,
  payload: {
    type: ModalTypes.USERS,
  },
});

export const openNotificationsModal = () => ({
  type: EntryActionTypes.MODAL_OPEN,
  payload: {
    type: ModalTypes.NOTIFICATIONS,
  },
});


export const openUserSettingsModal = () => ({
  type: EntryActionTypes.MODAL_OPEN,
  payload: {
    type: ModalTypes.USER_SETTINGS,
  },
});

export const openProjectAddModal = () => ({
  type: EntryActionTypes.MODAL_OPEN,
  payload: {
    type: ModalTypes.PROJECT_ADD,
  },
});

export const closeModal = () => ({
  type: EntryActionTypes.MODAL_CLOSE,
  payload: {},
});
