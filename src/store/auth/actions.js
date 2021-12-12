import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_REQUEST,
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_ERROR,
  SUBTRACTION_TOTAL_COUNT_USER,
  SIGN_OUT,
} from './actionNames';
import { getCurrentUser, signIn, signUp } from '../../api/auth';

export const signInRequest = (credentials) => (dispatch) => {
  dispatch({ type: SIGN_IN_REQUEST });

  signIn(credentials)
    .then(({ data: { user, accessToken, refreshToken } }) => {
      if (user) {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);

        dispatch({ type: SIGN_IN_SUCCESS, data: user });
      }
    })
    .catch((err) => {
      if (err.response && err.response.data.error) {
        dispatch({
          type: SIGN_IN_ERROR,
          data: err.response.data.error.message,
        });
        return;
      }

      dispatch({ type: SIGN_IN_ERROR, data: err.toJSON().message });
    });
};

export const signUpRequest = (credentials) => (dispatch) => {
  dispatch({ type: SIGN_UP_REQUEST });
  signUp(credentials)
    .then(({ data: { user, accessToken, refreshToken } }) => {
      if (user) {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);

        dispatch({ type: SIGN_UP_SUCCESS, data: user });
      }
    })
    .catch((err) => {
      if (err.response && err.response.data.error) {
        dispatch({
          type: SIGN_UP_ERROR,
          data: err.response.data.error.message,
        });
        return;
      }

      dispatch({ type: SIGN_UP_ERROR, data: err.toJSON().message });
    });
};

export const getCurrentUserRequest = (id) => (dispatch) => {
  dispatch({ type: GET_CURRENT_USER_REQUEST });

  getCurrentUser(id)
    .then(({ data: { user } }) => {
      dispatch({ type: GET_CURRENT_USER_SUCCESS, data: user });
    })
    .catch((err) => {
      if (err.response && err.response.data.error) {
        dispatch({
          type: GET_CURRENT_USER_ERROR,
          data: err.response.data.error.message,
        });
        return;
      }

      dispatch({ type: GET_CURRENT_USER_ERROR, data: err.toJSON().message });
    });
};

export const subtractionTotalCountUser = (subtractionNumber) => ({
  type: SUBTRACTION_TOTAL_COUNT_USER,
  data: subtractionNumber,
});

export const signOut = () => ({
  type: SIGN_OUT,
});
