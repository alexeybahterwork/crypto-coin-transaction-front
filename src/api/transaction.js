import { api } from './index';

export const getTransactions = (params = { page: 1, perPage: 5, order: 'desc', orderBy: 'id' }) => {
  return api.get(`transactions?page=${params.page}&per_page=${params.perPage}&sort_item=${params.orderBy}&sort_method=${params.order}`);
};

export const createTransaction = (data) => {
  return api.post(`transactions`, { ...data });
};
