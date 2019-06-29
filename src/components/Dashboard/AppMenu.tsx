import React from 'react'
import { List, ListItem, Typography, Divider, MenuItem, makeStyles } from '@material-ui/core'

import { version } from '../../../package.json'

const useStyles = makeStyles(theme => ({
  root: {
    width: 250,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: theme.palette.grey[500],
  },
  headLogo: {
    fontSize: '2.5em',
  },
  headSmall: {
    fontSize: '.8em',
  },
}))

const AppMenu: React.FC = () => {
  const classes = useStyles()
  return (
    <List className={classes.root}>
      <ListItem className={classes.header}>
        <Typography className={classes.headLogo}>Netfiets</Typography>
        <Typography className={classes.headSmall}>v{version}</Typography>
      </ListItem>
      <Divider />
      <>
        {[
          'Fahrrad Suchen',
          'Meine Buchungen',
          'Alle Fahrräder',
          'Hilfe',
          <Divider />,
          'Impressum & Kontakt',
        ].map((item, index) =>
          typeof item === 'string'
            ? <MenuItem key={index}>{item}</MenuItem>
            : React.cloneElement(item, { key: index })
        )}
      </>
    </List>
  )
}

export default AppMenu
