import React from 'react'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import FacesButton from './FacesButton'
import { CardMode } from 'constants/common'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.baseCardBackground,
    color: theme.palette.common.primaryText,
    padding: 15,
    margin: '10px 8px',
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    borderRadius: 20,

    display: 'flex',

    overflowX: 'auto',
  },
  auto: {
    width: 'auto',
  },
  facesButton: {},
}))

const DashboardCard = ({ mode = CardMode.full, style = {}, multiface = false, children }) => {
  const classes = useStyles()

  return (
    <Card
      classes={{
        root: clsx(classes.root, {
          [classes.auto]: mode === CardMode.auto,
        }),
      }}
      style={{ ...style }}
    >
      {children}
      {multiface && <FacesButton className={classes.facesButton} />}
    </Card>
  )
}

export default DashboardCard
