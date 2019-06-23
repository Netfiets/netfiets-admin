import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { inject, observer } from 'mobx-react';

import NotifierStore from './NotifierStore';

interface NotifierProps {
  notifierStore?: NotifierStore
}

const Notifier: React.FC<NotifierProps> = ({ notifierStore }) => {
  const { notifications } = notifierStore!
  const { enqueueSnackbar } = useSnackbar()
  const [displayedNotifications, setDisplayedNotifications] = useState([] as string[])

  useEffect(() => {
    notifications
    .filter(({ key }) => !displayedNotifications.includes(key))
    .forEach(notification => {
      const { message, options, key } = notification
      enqueueSnackbar(message, options)
      setDisplayedNotifications!([...displayedNotifications, key])
    })
  })

  return null
}

export default inject('notifierStore')(observer(Notifier))
