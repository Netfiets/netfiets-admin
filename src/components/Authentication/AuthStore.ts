import { observable, action, decorate } from 'mobx'
import firebase from 'firebase/app'
import 'firebase/auth'

import { NotifierStore } from '../Notifier';

export default class AuthStore {
  user: any
  error: any
  notifierStore: NotifierStore

  constructor(notifierStore: NotifierStore) {
    this.notifierStore = notifierStore

    firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this))
  }

  signInWithEmailAndPassword(email: string, password: string) {
    this.error = undefined
    firebase.auth().signInWithEmailAndPassword(email, password).catch(this.onSignInError.bind(this))
  }

  onSignInError(error: any) {
    this.error = error
    this.notifierStore.addError(error.message)
  }

  onAuthStateChanged(user: any) {
    this.user = user
    this.error = undefined
  }

  signOut() {
    this.user = undefined
  }
}

decorate(AuthStore, {
  user: observable,
  error: observable,
  onSignInError: action,
  onAuthStateChanged: action,
})
