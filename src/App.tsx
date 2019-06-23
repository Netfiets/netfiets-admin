import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'

import { LoginForm, AuthStore, Notifier, Dashboard } from './components'

interface AppProps {
  authStore?: AuthStore
}

const App: React.FC<AppProps> = ({ authStore }) => {
  return (
    <Fragment>
      <Notifier/>
      <main>
        {authStore!.user
          ? <Dashboard/>
          : <LoginForm/>
        }
      </main>
    </Fragment>
  )
}

export default inject('authStore')(observer(App))
