import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { Dvr } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
}))

const FacesButton = ({ onClick = () => {} }) => {
  const classes = useStyles()
  return (
    <IconButton onClick={onClick} color="secondary" classes={classes}>
      <Dvr />
    </IconButton>
  )
}

export default FacesButton
