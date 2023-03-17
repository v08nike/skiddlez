import ActionTypes from '../constants/ActionTypes';

/* Actions */

export const openModal = (type) => ({
  type: ActionTypes.MODAL_OPEN,
  payload: {
    type,
  },
});

export const closeModal = () => ({
  type: ActionTypes.MODAL_CLOSE,
  payload: {},
});
