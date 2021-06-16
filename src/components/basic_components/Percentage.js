import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Check, PriorityHigh } from '@material-ui/icons'

import { PercentageMode } from 'constants/common'

const useStyles = makeStyles(theme => ({
  root: {
    borderWidth: 7,
    borderStyle: 'solid',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
    position: 'relative',
    marginBottom: 20,
  },
  value: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 45,
    marginBottom: 5,
  },
  icon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(50%, 50%)',
    color: theme.palette.common.primaryText
  },
  successIcon: {
    background: theme.palette.common.secondaryGreen,
  },
  dangerIcon: {
    background: theme.palette.common.primaryRed,
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
    opacity: 0.15
  },

  dangerGradientTransparent: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    background: `linear-gradient(to right, ${theme.palette.common.primaryRed}, ${theme.palette.common.secondaryRed})`,
    // background: `linear-gradient(to right, #F65C6B,#FcaCf5)`,
    opacity: 0.15
  }
}))

const Percentage = ({ mode = PercentageMode.success, value }) => {
  const classes = useStyles()
  const classPath = mode === PercentageMode.success ? classes.PathSuccess : classes.PathDanger
  return (
    <div
      className={clsx(classes.root, {
        [classes.success]: mode === PercentageMode.success,
        [classes.danger]: mode === PercentageMode.danger,
      })}
    >
      <div
        className={mode === PercentageMode.success ? classes.successGradientTransparent : classes.dangerGradientTransparent}
      ></div>
      <div className={classes.value}>{value}</div>
      <div style={{ height: 20 }}></div>


      <svg height="100" viewBox={`0 0 200 100`} width="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`gradient${mode === PercentageMode.success}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={mode === PercentageMode.success ? '#3D4A56' : '#503257'} />
            <stop offset="100%" stopColor={mode === PercentageMode.success ? '#98D265' : '#F65C6B'} />
          </linearGradient>
        </defs>
        <path className={classPath} d="M 0,0 L 100,0 L 100,10 L 0,10" strokeWidth={2} />
        <path className={classPath} d="M 0,10 L 120,10 L 120,20 L 0,20" strokeWidth={2} />
        <path className={classPath} d="M 0,20 L 130,20 L 130,30 L 0,30" strokeWidth={2} />
        <path className={classPath} d="M 0,30 L 150,30 L 150,40 L 0,40" strokeWidth={2} />
        <path className={classPath} d="M 0,40 L 150,40 L 150,50 L 0,50" strokeWidth={2} />
        {/* <path className={classPath} d="M 150,50 L 140,50" strokeWidth={2} /> */}
        <path className={classPath} d="M 0,50 L 140,50 L 140,60 L 0,60" strokeWidth={2} />
        <path className={classPath} d="M 0,60 L 150,60 L 150,70 L 0,70" strokeWidth={2} />
        <path className={classPath} d="M 0,70 L 160,70 L 160,80 L 0,80" strokeWidth={2} />
        <path className={classPath} d="M 0,80 L 200,80 L 200,90 L 0,90" strokeWidth={2} />
        <path className={classPath} d="M 0,90 L 200,90 L 200,99 L 0,99" strokeWidth={2} />
      </svg>
      <div
        className={clsx(classes.icon, {
          [classes.successIcon]: mode === PercentageMode.success,
          [classes.dangerIcon]: mode === PercentageMode.danger,
        })}
      >
        {mode === PercentageMode.success ? (
          <Check style={{ fontSize: 35 }} />
        ) : (
            <PriorityHigh style={{ fontSize: 35 }} />
          )}
      </div>
    </div >
  )
}

export default Percentage
