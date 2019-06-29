import React from 'react'
import { Menu, MenuItem, Divider } from '@material-ui/core'
import { inject, observer } from 'mobx-react'

import { AuthStore } from '../Authentication'

interface UserMenuProps {
  user: any
  open: boolean
  onClose: React.MouseEventHandler
  anchorEl: Element
  authStore?: AuthStore
}

const UserMenu: React.FC<UserMenuProps> = ({ user, open, onClose, anchorEl, authStore }) => (
  <Menu
    id="menu-appbar"
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={open}
    onClose={onClose}
  >
    <MenuItem onClick={onClose}>
      Mein Profil
      </MenuItem>
    <MenuItem onClick={onClose}>Mein Konto</MenuItem>
    <Divider />
    <MenuItem onClick={() => authStore!.signOut()}>Abmelden</MenuItem>
  </Menu>
)

export default inject('authStore')(observer(UserMenu))
