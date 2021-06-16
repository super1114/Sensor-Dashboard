import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  equal: {
    backgroundColor: theme.palette.common.primaryCyan,
  },
}))

const EqualBarLine = ({ width = 20, height = 2, wrapperHeight = 10, color = 'cyan' }) => {
  const classes = useStyles()

  return (
    <div
      className={classes.wrapper}
      style={{
        width: width,
        height: wrapperHeight,
      }}
    >
      <div className={classes.equal} style={{ height: height, width: width }}></div>
    </div>
  )
}

export default EqualBarLine
