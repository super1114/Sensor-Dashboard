import { makeStyles } from '@material-ui/core/styles'
import transitions from '@material-ui/core/styles/transitions'
import clsx from 'clsx'
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
  },
  progressWrapperDefault: {
    position: 'relative',
    height: 14,
    background: theme.palette.common.secondaryCardBackground,
    borderRadius: 20,
    fontSize: 7,
    lineHeight: 0.58,
    fontFamily: theme.typography.mediumFontFamily,
  },
  progress: {
    height: '100%',
    background: 'transparent',
    borderRadius: 20,
    minWidth: 14,
    textAlign: 'center',
    color: theme.palette.common.primaryBlack,
  },
  blue: {
    border: `1px solid ${theme.palette.common.thirdBlue}`,
  },
  cyan: {
    border: `1px solid ${theme.palette.common.primaryCyan}`,
  },
  secondBlue: {
    border: `1px solid ${theme.palette.common.secondaryBlue}`,
  },
  green: {
    border: `1px solid ${theme.palette.common.primaryGreen}`,
  },
  secondGreen: {
    border: `1px solid ${theme.palette.common.secondaryGreen}`,
  },
  red: {
    border: `1px solid ${theme.palette.common.primaryRed}`,
  },

  labels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: theme.typography.mediumFontFamily,
    marginTop: 1,
  },

  textStyleStart: {
    textAlign: 'start',
  },
  textStyleCenter: {
    textAlign: 'center',
  },
  textStyleEnd: {
    textAlign: 'end',
  },
}))

const Committe = ({ info = {}, data = {}, width = 0, height = 0, fontSize = 6 }) => {
  const classes = useStyles()
  return (
    <div className={classes.root} style={{ width: width }}>
      <div className={classes.progressWrapperDefault} style={{ height: height }}>
        <div
          className={clsx(classes.progress, {
            [classes.blue]: data.color === 'blue',
            [classes.cyan]: data.color === 'cyan',
            [classes.secondBlue]: data.color === 'secondBlue',
            [classes.green]: data.color === 'green',
            [classes.secondGreen]: data.color === 'secondGreen',
            [classes.red]: data.color === 'red',
          })}
          style={{
            width: `${((data.value - info.min) / (info.max - info.min)) * 100}%`,
            height: height - 2,
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: 1,
            left: 0,
            width: width,
            textAlign: 'center',
          }}
        >
          {info.title}
        </div>
      </div>
      <div className={classes.labels} style={{ fontSize: fontSize }}>
        <div className={classes.textStyleStart}>{info.min}</div>
        <div className={classes.textStyleEnd}>{info.max}</div>
      </div>
    </div>
  )
}

export default Committe
