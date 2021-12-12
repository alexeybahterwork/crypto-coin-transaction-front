import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Button, CssBaseline, Toolbar, Typography } from '@material-ui/core';

import { useRequireAuth, useRouter } from '../../hooks';

import { useStyles } from './styles';

export var Navbar = function () {
  const auth = useRequireAuth();
  const router = useRouter();

  const classes = useStyles();

  if (!auth.user && !(router.pathname === '/')) {
    return '';
  }

  return (
    <>
      <CssBaseline />
      <AppBar position='absolute' color='default' className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Typography variant='h6' color='inherit' noWrap>
            PW Transactions App
          </Typography>
          <Button onClick={auth.signOut}>Sign Out</Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};
