import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.common.secondaryText,
    fontFamily: theme.typography.ultralightFontFamily,
    fontSize: 20,
    marginLeft: 20,
  },
  wrapperColor: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.common.primaryText,
    fontSize: 20,
    marginLeft: 20,
  },

  equal: {
    backgroundColor: theme.palette.common.primaryCyan,
    height: 2,
    marginLeft: '40%',
    width: 25,
    marginTop: 4,
  },
  up: {
    color: theme.palette.common.secondaryGreen,
    fontSize: 13.5,
    alignItems: 'baseline',
    display: 'flex',
  },
  down: {
    fontSize: 13.5,
    display: 'flex',
    alignItems: 'baseline',
    color: theme.palette.common.primaryRed,
  },

  success: {
    borderColor: theme.palette.common.secondaryGreen,
  },
  business: {
    borderColor: theme.palette.common.primaryBlue,
  },

  upArrow: {
    fill: 'transparent',
    stroke: theme.palette.common.secondaryGreen,
    strokeWidth: 2,
  },

  downArrow: {
    fill: 'transparent',
    stroke: theme.palette.common.primaryRed,
    strokeWidth: 2,
  },
}))

const TableChartTwoLineCell = ({
  value = null,
  growth = null,
  percentage = null,
  width = 90,
  height = 60,
  fontSize = 20,
  styles = {},
  color = false,
}) => {
  const classes = useStyles()
  let growthComponent = null
  switch (growth) {
    case 'equal':
      growthComponent = <div className={classes.equal}></div>
      break
    case 'up':
      growthComponent = (
        <div className={classes.up}>
          <svg width="30" height="15" style={{ marginRight: 6 }}>
            <path d="M 0 15 L 30 15 L 15 0 Z" className={classes.upArrow} />
          </svg>
          ({percentage}%)
        </div>
      )
      break
    case 'down':
      growthComponent = (
        <div className={classes.down}>
          <svg width="30" height="15" style={{ marginRight: 6 }}>
            <path d="M 0 0 L 30 0 L 15 15 Z" className={classes.downArrow} />
          </svg>
          ({percentage}%)
        </div>
      )
      break
    default:
      growthComponent = <div style={{ visibility: 'hidden' }}>({percentage}%)</div>
  }

  return (
    <div
      className={color ? classes.wrapperColor : classes.wrapper}
      style={{
        width: width,
        height: height,
        fontSize: fontSize,
      }}
    >
      <div>{value ? value : '-'}</div>
      <div style={{ height: 7 }}></div>
      {growthComponent}
    </div>
  )
}

export default TableChartTwoLineCell
