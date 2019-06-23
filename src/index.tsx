import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase/app'
import { Provider } from 'mobx-react'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import { SnackbarProvider } from 'notistack'

import App from './App'
import * as serviceWorker from './serviceWorker'
import theme from './theme'
import stores from './stores'

const env = process.env

firebase.initializeApp({
  apiKey: env.REACT_APP_FIREBASE_API_KEY,
  authDomain: env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: env.REACT_APP_FIREBASE_PROJECT_ID,
})

ReactDOM.render(
  <ThemeProvider theme={createMuiTheme(theme)}>
    <Provider {...stores()}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
