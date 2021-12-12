import { GET_USER_NAMES_REQUEST, GET_USER_NAMES_SUCCESS, GET_USER_NAMES_ERROR } from './actionNames';
import { getUserNames } from '../../api/user';

export const getUserNamesRequest = () => (dispatch) => {
  dispatch({ type: GET_USER_NAMES_REQUEST });

  getUserNames()
    .then(({ data: { users } }) => {
      dispatch({ type: GET_USER_NAMES_SUCCESS, data: users });
    })
    .catch((err) => {
      if (err.response && err.response.data.error) {
        dispatch({
          type: GET_USER_NAMES_ERROR,
          data: err.response.data.error.message,
        });
        return;
      }

      dispatch({ type: GET_USER_NAMES_ERROR, data: err.toJSON().message });
    });
};
