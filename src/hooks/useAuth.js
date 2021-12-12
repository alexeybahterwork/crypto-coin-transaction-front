import React, { useContext, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInRequest, signUpRequest, signOut as signOutAction } from '../store/auth/actions';

const authContext = createContext('');

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const { currentUser, error } = useSelector((state) => ({
    currentUser: state.auth.currentUser,
    error: state.auth.error,
  }));

  const dispatch = useDispatch();

  const signIn = ({ email, password }) => {
    dispatch(signInRequest({ email, password }));
  };

  const signUp = (name, email, password) => {
    dispatch(signUpRequest({ email, password }));
  };

  const signOut = () => {
    dispatch(signOutAction());

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  return {
    currentUser,
    error,
    signIn,
    signUp,
    signOut,
  };
}
