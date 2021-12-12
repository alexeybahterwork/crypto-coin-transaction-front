import React, { useEffect } from 'react';
import { Typography, Paper, CircularProgress } from '@material-ui/core';

import { useStyles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserRequest } from '../../store/auth/actions';
import jwt_decode from 'jwt-decode';

export const UserInfo = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => {
    return {
      currentUser: state.auth.currentUser,
    };
  });

  useEffect(() => {
    const accessUserToken = localStorage.getItem('access_token');

    if (accessUserToken) {
      const payload = jwt_decode(accessUserToken);

      dispatch(getCurrentUserRequest(payload.id));
    }
  }, [dispatch]);

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography className={classes.title} component='h1' variant='h4' align='center'>
          User Info
        </Typography>
        {currentUser === null ? (
          <CircularProgress className={classes.center} />
        ) : (
          <>
            <Typography component='h1' variant='h6' align='left'>
              Name: {currentUser.name}
            </Typography>
            <Typography component='h1' variant='h6' align='left'>
              Email: {currentUser.email}
            </Typography>
            <Typography component='h1' variant='h6' align='left'>
              Count: PW {currentUser.pw_count}
            </Typography>
          </>
        )}
      </Paper>
    </main>
  );
};
