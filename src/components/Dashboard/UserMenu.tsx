import React from 'react'
import { Menu, MenuItem, Divider } from '@material-ui/core'

interface UserMenuProps {
  user: any
  open: boolean
  onClose: React.MouseEventHandler
  anchorEl: Element
}
const UserMenu: React.FC<UserMenuProps> = ({ user, open, onClose, anchorEl }) => {

  return (
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
      <MenuItem onClick={onClose}>
        Abmelden
      </MenuItem>
    </Menu>
  )
}

export default UserMenu
