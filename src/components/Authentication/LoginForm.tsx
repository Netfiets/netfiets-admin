import React, { useState } from 'react'
import { inject, observer } from 'mobx-react';
import { TextField, Theme, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';

import { AuthStore } from '../';

interface LoginFormProps {
  authStore?: AuthStore
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  formItem: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  }
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
    <form className={classes.container} onSubmit={onSubmit}>
      <TextField
        id="login-email"
        label="Email"
        type="email"
        value={email}
        error={Boolean(error)}
        onChange={e => setEmail(e.target.value)}
        className={classes.formItem}
      />
      <TextField
        id="login-password"
        label="Password"
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
  )
}

export default inject('authStore')(observer(LoginForm))