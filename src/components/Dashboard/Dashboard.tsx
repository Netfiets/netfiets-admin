import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  Divider,
  MenuItem,
  ListItem,
} from '@material-ui/core'
import { Menu as MenuIcon, AccountCircle } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import { AuthStore } from '../Authentication'
import UserMenu from './UserMenu'

import { version } from '../../../package.json'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  sidebar: {
    width: 250
  },
  sidebarHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: theme.palette.grey[500],
  },
  headLogo: {
    fontSize: '2.5em',
  },
  headSmall: {
    fontSize: '.8em',
  }
}))

interface DashboardProps {
  authStore?: AuthStore
}

const Dashboard: React.FC<DashboardProps> = ({ authStore }) => {
  const { user } = authStore!

  const classes = useStyles()

  const [accountMenuAnchor, setAccountMenuAnchor] = React.useState<EventTarget & Element>()
  const openAccountMenu = Boolean(accountMenuAnchor)

  const onOpenAccountMenu: React.MouseEventHandler = event => {
    setAccountMenuAnchor(event.currentTarget)
  }

  const onCloseAccountMenu = () => {
    setAccountMenuAnchor(undefined)
  }

  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <main className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Netfiets
          </Typography>
          {authStore!.user && (
            <div>
              <IconButton
                aria-label="Benutzerkonto des aktuellen Benutzers"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={onOpenAccountMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <UserMenu
                user={user}
                open={openAccountMenu}
                onClose={onCloseAccountMenu}
                anchorEl={accountMenuAnchor!}
              />
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List className={classes.sidebar}>
          <ListItem className={classes.sidebarHeader}>
            <Typography className={classes.headLogo}>Netfiets</Typography>
            <Typography className={classes.headSmall}>v{version}</Typography>
          </ListItem>
          <Divider />
          <>
            {[
              'Fahrrad Suchen',
              'Meine Buchungen',
              'Hilfe',
              <Divider />,
              'Impressum & Kontakt',
            ].map((item, index) =>
              typeof item === 'string'
                ? <MenuItem key={index}>{item}</MenuItem>
                : item
            )}
          </>
        </List>
      </Drawer>
    </main>
  )
}

export default inject('authStore')(observer(Dashboard))
