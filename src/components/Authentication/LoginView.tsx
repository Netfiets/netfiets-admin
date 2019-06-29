import React from 'react'
import { makeStyles } from '@material-ui/core'

import LoginForm from './LoginForm'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundImage: 'url(./cover.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}))

const LoginView = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <LoginForm />
    </div>
  )
}

export default LoginView
