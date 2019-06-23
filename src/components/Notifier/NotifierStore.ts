import { action, decorate, observable } from 'mobx'
import uuid from 'uuid'

import { Notification } from './type';

export default class NotifierStore {
  notifications: Notification[] = []

  addError(message: string) {
    this.addNotification(message, { variant: 'error' })
  }

  addWarning(message: string) {
    this.addNotification(message, { variant: 'warning' })
  }

  addNote(message: string) {
    this.addNotification(message, { variant: 'notice' })
  }

  addSuccess(message: string) {
    this.addNotification(message, { variant: 'success' })
  }

  addNotification(message: string, options: any) {
    this.notifications = this.notifications.concat([{
      message,
      options,
      key: uuid.v4(),
    }])
  }
}

decorate(NotifierStore, {
  notifications: observable,
  addNotification: action,
})
