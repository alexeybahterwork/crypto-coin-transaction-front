import { GET_USER_NAMES_REQUEST, GET_USER_NAMES_SUCCESS, GET_USER_NAMES_ERROR } from './actionNames';

const getInitialStore = () => ({
  userNames: [],
  error: null,
  isLoading: false,
});

export default (store = getInitialStore(), { type, data } = {}) => {
  switch (type) {
    case GET_USER_NAMES_REQUEST:
      return { userNames: [], isLoading: true };
    case GET_USER_NAMES_SUCCESS:
      return {
        userNames: data,
      };
    case GET_USER_NAMES_ERROR:
      return { ...store, error: data, isLoading: true };

    default:
      return store;
  }
};
