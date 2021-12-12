import { api } from './index';

export const signUp = (credentials) => {
  return api.post(`auth/sign-up`, { ...credentials });
};

export const signIn = (credentials) => {
  return api.post('auth/sign-in', { ...credentials });
};

export const getCurrentUser = (id) => {
  return api.get(`users/${id}`);
};
