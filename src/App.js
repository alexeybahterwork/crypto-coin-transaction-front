import React from 'react';
import { CssBaseline } from '@material-ui/core';

import { Route, Routes } from 'react-router-dom';

import { ProvideAuth } from './hooks/useAuth';
import { Navbar } from './components';
import { Copyright } from './ui';
import { Home, SignIn, SignUp } from './pages';

import { useStyles } from './styles';

const App = function () {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <div className={classes.app}>
        <ProvideAuth>
          <Routes>
            <Route path='/' element={<Navbar />}>
              <Route path='/' element={<Home />} exact />
            </Route>

            <Route path='/sign-up' element={<SignUp />} exact />
            <Route path='/sign-in' element={<SignIn />} exact />
          </Routes>
        </ProvideAuth>
      </div>
      <Copyright />
    </>
  );
};

export default App;
