import React from 'react'
import { inject, observer } from 'mobx-react'
import { LinearProgress, makeStyles } from '@material-ui/core'

import { LoginView, AuthStore, Notifier, Dashboard } from './components'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
  }
}))

interface AppProps {
  authStore?: AuthStore
}

const App: React.FC<AppProps> = ({ authStore }) => {
  const classes = useStyles()
  const { isLoading } = authStore!
  return (
    <>
      {isLoading && <LinearProgress />}
      <Notifier />
      <main className={classes.root}>
        {!isLoading && (authStore!.user
          ? <Dashboard />
          : <LoginView />
        )}
      </main>
    </>
  )
}

export default inject('authStore')(observer(App))
