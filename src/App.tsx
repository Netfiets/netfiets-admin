import React from 'react'
import { inject, observer } from 'mobx-react'
import { LinearProgress } from '@material-ui/core'

import { LoginForm, AuthStore, Notifier, Dashboard } from './components'

interface AppProps {
  authStore?: AuthStore
}

const App: React.FC<AppProps> = ({ authStore }) => {
  const { isLoading } = authStore!
  return (
    <>
      {isLoading && <LinearProgress />}
      <Notifier />
      <main>
        {!isLoading && (authStore!.user
          ? <Dashboard />
          : <LoginForm />
        )}
      </main>
    </>
  )
}

export default inject('authStore')(observer(App))
