import {
  CREATE_TRANSACTION_ERROR,
  CREATE_TRANSACTION_REQUEST,
  CREATE_TRANSACTION_SUCCESS,
  GET_TRANSACTIONS_ERROR,
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTIONS_SUCCESS,
} from './actionNames';

const getInitialStore = () => ({
  transactions: [],
  pagination: {},
  error: null,
  isLoading: false,
});

export default (store = getInitialStore(), { type, data } = {}) => {
  switch (type) {
    case CREATE_TRANSACTION_REQUEST:
      return { ...store, isLoading: true };
    case CREATE_TRANSACTION_SUCCESS:
      const sortedTransactions = [...store.transactions, data.transaction].sort(({ id }, { id: idNext }) => idNext - id).slice(0, 5);

      return { ...store, transactions: sortedTransactions, isLoading: false };
    case CREATE_TRANSACTION_ERROR:
      return { ...store, error: data, isLoading: false };

    case GET_TRANSACTIONS_REQUEST:
      return { ...store, transactions: [], pagination: {}, isLoading: true };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        transactions: data.transactions,
        pagination: data.pagination,
        isLoading: false,
      };
    case GET_TRANSACTIONS_ERROR:
      return { ...store, error: data, isLoading: false };

    default:
      return store;
  }
};
