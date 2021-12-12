import React, { useEffect, useState } from 'react';
import { Grid, Button, CircularProgress, Paper, Typography } from '@material-ui/core';

import { Autocomplete, InputNumber } from '../../ui';

import { useStyles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { createTransactionRequest } from '../../store/transactions/actions';
import { subtractionTotalCountUser } from '../../store/auth/actions';

export const Form = ({ showAlert }) => {
  const [clientName, setClientName] = useState(null);
  const [quantity, setQuantity] = useState({ number: '' });

  const classes = useStyles();

  const dispatch = useDispatch();

  const { transactions, userList, error, currentUser } = useSelector((state) => ({
    transactions: state.transaction.transactions,
    error: state.transaction.error,
    userList: state.users.userNames,
    currentUser: state.auth.currentUser,
  }));

  const onSubmit = async (event) => {
    event.preventDefault();

    if (currentUser.pw_count > quantity.number) {
      dispatch(
        createTransactionRequest({
          recipient_id: clientName.id,
          quantity: Number(quantity.number),
        })
      );

      if (transactions && clientName && Number(quantity.number)) {
        resetForm();

        dispatch(subtractionTotalCountUser(Number(quantity.number)));

        showAlert((alert) => ({
          ...alert,
          type: 'success',
          message: 'Transaction created!',
          open: true,
        }));
      }
      return;
    }

    showAlert((alert) => ({
      ...alert,
      type: 'error',
      message: 'Incorrect quantity value.',
      open: true,
    }));

    setQuantity({ number: '' });
  };

  const resetForm = () => {
    setClientName({ name: '' });
    setQuantity({ number: '' });
  };

  useEffect(() => {
    if (error) {
      resetForm();

      showAlert((alert) => ({
        ...alert,
        type: 'error',
        message: error,
        open: true,
      }));
    }
  }, [error, showAlert]);

  return (
    <>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography className={classes.title} component='h1' variant='h4' align='center'>
            Create Transaction
          </Typography>
          {userList === null ? (
            <CircularProgress className={classes.center} />
          ) : (
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Autocomplete
                    value={clientName}
                    setValue={setClientName}
                    options={userList}
                    keyName='name'
                    label={'Client Name'}
                    id='client-name-options'
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputNumber
                    label='Quantity'
                    value={quantity}
                    setValue={(val) => setQuantity(val)}
                    name='number'
                    variant='outlined'
                    id='formatted-quantity-input'
                  />
                </Grid>
                <Grid container item justifyContent='flex-end'>
                  <Button type='submit' variant='contained' color='primary' className={classes.button} disabled={quantity.number === 0}>
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Paper>
      </main>
    </>
  );
};
