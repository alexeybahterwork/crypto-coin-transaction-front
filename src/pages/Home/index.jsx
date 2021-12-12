import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsRequest } from '../../store/transactions/actions';
import { getUserNamesRequest } from '../../store/users/actions';
import { Alert } from '../../ui';
import { EnhancedTable, Form, UserInfo } from '../../components';
import { useStyles } from './styles';

const tableHeadCells = [
  { id: 'sender_id', align: 'left', disablePadding: false, label: 'Sender' },
  {
    id: 'recipient_id',
    align: 'left',
    disablePadding: false,
    label: 'Recipient',
  },
  { id: 'count', align: 'center', disablePadding: false, label: 'Count' },
  {
    id: 'pw_count_resulted',
    align: 'center',
    disablePadding: false,
    label: 'Resulted Count',
  },
  { id: 'date', align: 'right', disablePadding: false, label: 'Date' },
];

export var Home = function () {
  const [alert, setAlert] = useState({ open: false, type: '', message: '' });

  const dispatch = useDispatch();

  const { transactions, pagination, userNames } = useSelector((state) => ({
    transactions: state.transaction.transactions,
    pagination: state.transaction.pagination,
    userNames: state.users.userNames,
  }));

  const classes = useStyles();

  useEffect(() => {
    dispatch(getUserNamesRequest());
    dispatch(
      getTransactionsRequest({
        page: 1,
        perPage: 5,
        order: 'desc',
        orderBy: 'id',
      })
    );
  }, [dispatch]);

  return (
    <>
      <Grid className={classes.container} container spacing={2} direction='row' justifyContent='space-evenly'>
        <Grid item xs={12} sm={6} md={6}>
          <UserInfo />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Form showAlert={setAlert} userList={userNames} />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <EnhancedTable headCells={tableHeadCells} data={{ transactions, pagination }} />
        </Grid>
      </Grid>
      <Alert alert={alert} setAlert={setAlert} />
    </>
  );
};
