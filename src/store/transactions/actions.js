import {
  CREATE_TRANSACTION_REQUEST,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_ERROR,
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_ERROR,
} from './actionNames';
import { createTransaction, getTransactions } from '../../api/transaction';

export const getTransactionsRequest = (params) => (dispatch) => {
  dispatch({ type: GET_TRANSACTIONS_REQUEST });

  getTransactions(params)
    .then(({ data }) => {
      dispatch({ type: GET_TRANSACTIONS_SUCCESS, data });
    })
    .catch((err) => {
      if (err.response && err.response.data.error) {
        dispatch({
          type: GET_TRANSACTIONS_ERROR,
          data: err.response.data.error.message,
        });
        return;
      }

      dispatch({ type: GET_TRANSACTIONS_ERROR, data: err.toJSON().message });
    });
};
export const createTransactionRequest = (transaction) => (dispatch) => {
  dispatch({ type: CREATE_TRANSACTION_REQUEST });

  createTransaction(transaction)
    .then(({ data }) => {
      dispatch({ type: CREATE_TRANSACTION_SUCCESS, data });
      return data;
    })
    .catch((err) => {
      if (err.response && err.response.data.error) {
        dispatch({
          type: CREATE_TRANSACTION_ERROR,
          data: err.response.data.error.message,
        });
        return err.response.data.error;
      }

      dispatch({ type: CREATE_TRANSACTION_ERROR, data: err.toJSON().message });
      return err.toJSON().message;
    });
};
