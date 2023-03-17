import ActionTypes from '../../constants/ActionTypes';

const initialState = {
  data: {
    email: '',
    name: '',
    username: '',
  },
  isSubmitting: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_CREATE:
      return {
        ...state,
        data: {
          ...state.data,
          ...payload.data,
        },
        isSubmitting: true,
      };
    case ActionTypes.USER_CREATE__SUCCESS:
      return initialState;
    case ActionTypes.USER_CREATE__FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: payload.error,
      };
    case ActionTypes.USER_CREATE_ERROR_CLEAR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
