import { observable, action, decorate, computed } from 'mobx'
import firebase from 'firebase/app'
import 'firebase/auth'

import { NotifierStore } from '../Notifier';

const STORAGE_ID = 'auth:user'

export default class AuthStore {
  _user: any
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

  set user(user) {
    this._user = user
    localStorage.setItem(STORAGE_ID, JSON.stringify(user))
  }

  get user() {
    if (!this._user) {
      try {
        const data = localStorage.getItem(STORAGE_ID)
        return data && (this._user = JSON.parse(data))
      } catch(e) {
        // nth
      }
    }
    return this._user
  }
}

decorate(AuthStore, {
  user: computed,
  _user: observable,
  error: observable,
  onSignInError: action,
  onAuthStateChanged: action,
})
