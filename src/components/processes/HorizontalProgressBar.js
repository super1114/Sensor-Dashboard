import { makeStyles } from '@material-ui/core/styles'
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
  },
  progressWrapperCyan: {
    position: 'relative',
    height: 14,
    background: theme.palette.common.primaryCyan,
    borderRadius: 20,
  },
  progress: {
    height: '100%',
    background: theme.palette.common.primaryBlue,
    borderRadius: 20,
    minWidth: 14,
    textAlign: 'center',
    color: theme.palette.common.primaryBlack,
  },
  progressThirdBlue: {
    height: '100%',
    background: theme.palette.common.thirdBlue,
    borderRadius: 20,
    minWidth: 14,
    textAlign: 'center',
    color: theme.palette.common.primaryBlack,
  },
  labels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: theme.typography.lightFontFamily,
    letterSpacing: 1.5,
    fontSize: 15,
    marginTop: 5,
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

const HorizontalProgressBar = ({
  lb,
  ub,
  lbText,
  ubText,
  value,
  innerColor = 'blue',
  bkColor = 'default',
  sticky = false,
  progressText = null,
  progressHeight = 14,
  progressTextfontSize = 14,
  progressLabelFontSize = 15,
}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div
        className={clsx({
          [classes.progressWrapperDefault]: bkColor === 'default',
          [classes.progressWrapperCyan]: bkColor === 'cyan',
        })}
        style={{ height: progressHeight }}
      >
        <div
          className={clsx({
            [classes.progress]: innerColor === 'blue',
            [classes.progressThirdBlue]: innerColor === 'thirdBlue',
          })}
          style={{
            width: `${((value - lb) / (ub - lb)) * 100}%`,
            height: progressHeight,
            fontSize: progressTextfontSize,
          }}
        >
          {progressText}
        </div>
      </div>
      <div className={classes.labels} style={{ fontSize: progressLabelFontSize }}>
        <div className={sticky ? classes.textStyleStart : classes.textStyleCenter}>{lbText}</div>
        <div className={sticky ? classes.textStyleEnd : classes.textStyleCenter}>{ubText}</div>
      </div>
    </div>
  )
}

export default HorizontalProgressBar
