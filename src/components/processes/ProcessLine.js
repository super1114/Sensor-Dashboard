import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  background: {
    backgroundColor: theme.palette.common.secondaryCardBackground,
  },
  blueBg: {
    backgroundColor: theme.palette.common.primaryBlue,
  },
  cyanBg: {
    backgroundColor: theme.palette.common.primaryCyan,
  },
}))
const ProcessLine = ({ height = 10, width, value, bgColor = 'gray', radius = 5, processColor = 'blue' }) => {
  const classes = useStyles()
  return (
    <div
      className={classes.background}
      style={{
        height: height,
        width: width,
        borderRadius: radius,
      }}
    >
      <div
        className={processColor === 'blue' ? classes.blueBg : classes.cyanBg}
        style={{
          height: height,
          width: (width * value) / 100,
          borderRadius: radius,
        }}
      ></div>
    </div>
  )
}

export default ProcessLine
