import React from 'react'
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../Authentication';

interface DashboardProps {
  authStore?: AuthStore
}

const Dashboard: React.FC<DashboardProps> = ({ authStore }) => (
  <main>
    Hey, {authStore!.user.email}!
  </main>
)

export default inject('authStore')(observer(Dashboard))
