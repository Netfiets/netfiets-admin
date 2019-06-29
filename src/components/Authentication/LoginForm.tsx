import React, { useState } from 'react'
import { inject, observer } from 'mobx-react';
import { Theme, Button, Paper, Typography, Divider, Input } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';

import { AuthStore } from '../';

interface LoginFormProps {
  authStore?: AuthStore
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  headline: {
    margin: theme.spacing(2),
  },
  subhead: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'stretch',
    width: '16em',
    margin: theme.spacing(2),
    marginTop: 0,
  },
  formItem: {
    marginTop: theme.spacing(2),
  },
}))

const LoginForm: React.FC<LoginFormProps> = ({ authStore }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    authStore!.signInWithEmailAndPassword(email, password)
  }

  const classes = useStyles()

  const { error } = authStore!

  return (
    <Paper elevation={4} className={classes.root}>
      <Typography variant="h4" className={classes.headline} align="center">
        Einfach anmelden und mitmachen
      </Typography>
      <Divider />
      <Typography variant="body1" className={classes.subhead} align="center">
        Option 1: Mit Email und password anmelden
      </Typography>
      <form className={classes.form} onSubmit={onSubmit}>
        <Input
          id="login-email"
          placeholder="Email"
          type="email"
          value={email}
          error={Boolean(error)}
          onChange={e => setEmail(e.target.value)}
          className={classes.formItem}
        />
        <Input
          id="login-password"
          placeholder="Password"
          type="password"
          value={password}
          error={Boolean(error)}
          onChange={e => setPassword(e.target.value)}
          className={classes.formItem}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.formItem}
          type="submit"
        >
          Login
        </Button>
      </form>
    </Paper>
  )
}

export default inject('authStore')(observer(LoginForm))