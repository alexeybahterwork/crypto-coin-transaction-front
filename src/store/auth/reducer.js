import {
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_REQUEST,
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_ERROR,
  SUBTRACTION_TOTAL_COUNT_USER,
  SIGN_OUT,
} from './actionNames';

const getInitialStore = () => ({
  currentUser: null,
  error: null,
  isLoading: false,
});

export default (store = getInitialStore(), { type, data } = {}) => {
  switch (type) {
    case SIGN_IN_REQUEST:
      return { currentUser: null, error: null, isLoading: true };
    case SIGN_IN_SUCCESS:
      return { ...store, currentUser: data, isLoading: false };
    case SIGN_IN_ERROR:
      return { ...store, error: data, isLoading: false };

    case SIGN_UP_REQUEST:
      return { currentUser: null, error: null, isLoading: true };
    case SIGN_UP_SUCCESS:
      return { ...data, isLoading: false };
    case SIGN_UP_ERROR:
      return { ...store, error: data, isLoading: false };

    case GET_CURRENT_USER_REQUEST:
      return { currentUser: null, error: null, isLoading: true };
    case GET_CURRENT_USER_SUCCESS:
      return { ...store, currentUser: data, isLoading: false };
    case GET_CURRENT_USER_ERROR:
      return { ...store, error: data, isLoading: false };

    case SUBTRACTION_TOTAL_COUNT_USER:
      return {
        ...store,
        currentUser: {
          ...store.currentUser,
          pw_count: store.currentUser.pw_count - data,
        },
      };

    case SIGN_OUT:
      return { ...store, currentUser: null };

    default:
      return store;
  }
};
