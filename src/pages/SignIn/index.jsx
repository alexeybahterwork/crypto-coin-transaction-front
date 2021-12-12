import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Link, TextField, Typography } from '@material-ui/core';
import { Alert } from '../../ui';
import { useAuth, useRouter } from '../../hooks';
import { useStyles } from './styles';

export const SignIn = () => {
  const [alert, setAlert] = useState({ open: false, type: '', message: '' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  const router = useRouter();
  const { signIn, currentUser, error } = useAuth();

  const onSubmit = (event) => {
    event.preventDefault();
    signIn({ email, password });
  };

  useEffect(() => {
    currentUser && router.push('/');

    error &&
      setAlert((alert) => ({
        ...alert,
        type: 'error',
        message: error,
        open: true,
      }));
  }, [currentUser, error, router]);

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                autoFocus
                variant='outlined'
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                type='email'
                value={email}
                onInput={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant='outlined'
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button type='submit' variant='contained' color='primary' className={classes.submit}>
            Sign In
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/sign-up' variant='body2'>
                First time? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Alert alert={alert} setAlert={setAlert} />
    </Container>
  );
};
