import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

import informGreen from 'assets/icons/informGreen.svg'
import alertRed from 'assets/icons/alertRed.svg'

import { PercentageMode } from 'constants/common'

const useStyles = makeStyles(theme => ({
  root: {
    borderWidth: 3,
    borderStyle: 'solid',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },

  value: {
    fontFamily: theme.typography.thinFontFamily,
    fontSize: 20,
    letterSpacing: 1.67,
    marginBottom: 10,
  },

  success: {
    borderColor: theme.palette.common.secondaryGreen,
  },
  danger: {
    borderColor: theme.palette.common.primaryRed,
  },
  PathSuccess: {
    // stroke: theme.palette.common.secondaryGreen,
    stroke: 'url(#gradienttrue)',
    fill: 'transparent',
  },
  PathDanger: {
    // stroke: theme.palette.common.secondaryGreen,
    stroke: 'url(#gradientfalse)',
    fill: 'transparent',
  },

  successGradientTransparent: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    // background: `linear-gradient(to right, {#98D265},#E8F2B5)`,
    background: `linear-gradient(to right, ${theme.palette.common.primaryGreen}, ${theme.palette.common.secondaryGreen})`,
    opacity: 0.15,
  },

  dangerGradientTransparent: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    background: `linear-gradient(to right, ${theme.palette.common.primaryRed}, ${theme.palette.common.secondaryRed})`,
    // background: `linear-gradient(to right, #F65C6B,#FcaCf5)`,
    opacity: 0.15,
  },

  icon: {
    position: 'absolute',
    bottom: -14,
    right: -13,
  },
  bottomIcon: {
    width: 23,
    height: 23,
  },
  middleLine: {
    stroke: theme.palette.common.primaryText,
    strokeDasharray: [2, 1],
  },
}))

const HorizontalBarChart = ({
  mode = PercentageMode.success,
  value,
  width = 0,
  height = 0,
  eachHeight = 5,
  middleLine = false,
  data = [],
}) => {
  const classes = useStyles()

  let graphWidth = width - 10
  return (
    <div
      className={clsx(classes.root, {
        [classes.success]: mode === PercentageMode.success,
        [classes.danger]: mode === PercentageMode.danger,
      })}
      style={{ height: height, width: width }}
    >
      <div
        className={
          mode === PercentageMode.success ? classes.successGradientTransparent : classes.dangerGradientTransparent
        }
      ></div>
      <div className={classes.value}>{value}</div>

      <svg
        style={{ marginLeft: 3 }}
        height={eachHeight * data.length}
        viewBox={`0 0 ${graphWidth} ${eachHeight * data.length}`}
        width={graphWidth}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`gradient${mode === PercentageMode.success}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={mode === PercentageMode.success ? '#3D4A56' : '#503257'} />
            <stop offset="100%" stopColor={mode === PercentageMode.success ? '#98D265' : '#F65C6B'} />
          </linearGradient>
        </defs>

        {data.map((each, idx) => {
          return (
            <path
              key={idx}
              className={mode === PercentageMode.success ? classes.PathSuccess : classes.PathDanger}
              d={`M ${0} ${idx * eachHeight},L ${(graphWidth * each) / 100} ${idx * eachHeight}
                      M ${(graphWidth * each) / 100} ${idx * eachHeight},L ${(graphWidth * each) / 100} ${
                (idx + 1) * eachHeight
              }
                      M ${(graphWidth * each) / 100} ${(idx + 1) * eachHeight},L ${0} ${(idx + 1) * eachHeight}
                      M ${0} ${(idx + 1) * eachHeight},L ${0} ${idx * eachHeight}`}
              strokeWidth={0.5}
            ></path>
          )
        })}

        {middleLine && (
          <line
            x1={graphWidth / 2}
            y1={0}
            x2={graphWidth / 2}
            y2={eachHeight * data.length}
            strokeWidth={0.3}
            className={classes.middleLine}
          ></line>
        )}
      </svg>
      <div className={classes.icon}>
        {mode === PercentageMode.success ? (
          <img src={informGreen} className={classes.bottomIcon} alt=""></img>
        ) : (
          <img src={alertRed} className={classes.bottomIcon} alt=""></img>
        )}
      </div>
    </div>
  )
}

export default HorizontalBarChart
