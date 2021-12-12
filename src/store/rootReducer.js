import { combineReducers } from 'redux';
import transactionStore from './transactions/reducer';
import authStore from './auth/reducer';
import usersStore from './users/reducer';

export default combineReducers({
  transaction: transactionStore,
  auth: authStore,
  users: usersStore,
});
