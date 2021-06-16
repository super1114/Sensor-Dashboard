import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  cyanColor: {
    width: 0,
    height: 0,
    border: '1px solid',
    borderRadius: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.palette.common.primaryCyan,
    fontFamily: theme.typography.thinFontFamily
  },
  blueColor: {
    width: 0,
    height: 0,
    border: '1px solid',
    borderRadius: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: theme.typography.thinFontFamily,
    borderColor: theme.palette.common.primaryBlue,
  },
}))

const CirclePercentage = ({
  color = 'cyan',
  value = 0,
  radius = 20,
  fontSize = 6
}) => {
  const classes = useStyles()

  return (
    <div
      className={color === 'cyan' ? classes.cyanColor : classes.blueColor}
      style={{
        height: radius,
        width: radius,
        fontSize: fontSize
      }}>
      {value}%
    </div>
  )
}

export default CirclePercentage
