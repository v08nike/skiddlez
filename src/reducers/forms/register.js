import ActionTypes from '../../constants/ActionTypes';

const initialState = {
  data: {
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  },
  isSubmitting: false,
  status: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.REGISTER:
      return {
        ...state,
        data: {
          ...state.data,
          ...payload.data,
        },
      };
    case ActionTypes.REGISTER_ERROR_CLEAR:
      return {
        ...state,
        error: null,
      };
    case ActionTypes.REGISTER_ERROR:
      return {
        ...state,
        error: { message: payload },
      };
    case ActionTypes.REGISTER_REQUESTED:
      return {
        ...state,
        isSubmitting: true,
      };
    case ActionTypes.REGISTER_SUCCEEDED:
      return {
        ...state,
        status: true,
      };
    case ActionTypes.REGISTER_FAILED:
      return {
        ...state,
        isSubmitting: false,
        status: false,
        error: payload.error,
      };
    default:
      return state;
  }
};
