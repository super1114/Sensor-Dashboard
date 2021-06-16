import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { getTextWidth } from 'helpers/helpers'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  progressBarSuccess: {
    backgroundImage: `linear-gradient(left , transparent 0%, ${theme.palette.common.secondaryGreen} 100%)`,
  },
  progressBarDanger: {
    backgroundImage: `linear-gradient(left , ${theme.palette.common.primaryRed} 0%, transparent 100%)`,
  },
  progressBarBlue: {
    backgroundImage: `linear-gradient(left , ${theme.palette.common.baseCardBackground} 0%, ${theme.palette.common.primaryBlue} 100%)`,
  },
  progressBarBlueDark: {
    backgroundImage: `linear-gradient(left , #272953 0%, ${theme.palette.common.primaryBlue} 100%)`,
  },
  progressBarBlueDarkRevert: {
    backgroundImage: `linear-gradient(left , ${theme.palette.common.primaryBlue} 0%, #272953 100%)`,
  },
  progressBarCyan: {
    backgroundImage: `linear-gradient(left , transparent 0%, ${theme.palette.common.primaryCyan} 100%)`,
  },
  progressBarCyanRevert: {
    backgroundImage: `linear-gradient(left , ${theme.palette.common.primaryCyan} 0%, ${theme.palette.common.baseCardBackground} 100%)`,
  },

  progressBarBorderSuccess: {
    display: 'flex',
    border: 'double 1px transparent',
    borderRadius: '100%',
    backgroundImage: `linear-gradient(#272953,#272953 ), radial-gradient(circle at left, transparent, ${theme.palette.common.secondaryGreen})`,
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
    marginTop: -2,
  },
  progressBarBorderDanger: {
    display: 'flex',
    border: 'double 1px transparent',
    borderRadius: '100%',
    backgroundImage: `linear-gradient(#272953,#272953 ), radial-gradient(circle at left, ${theme.palette.common.primaryRed}, transparent)`,
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
    marginTop: -2,
  },

  valueText: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.thirdBlue,
    position: 'absolute',
  },
  blueValueText: {
    direction: 'rtl',
  },
  maskText: {
    color: theme.typography.primaryText,
    fontFamily: theme.typography.mediumFontFamily,
    paddingLeft: 35,
  },
}))
const GradientProgress = ({
  height = 10,
  width = 0,
  progressWidth = 0,
  value = 0,
  maxValue = 100,
  mode = 'success',
  color = 'default',
  radius = 5,
  processType = null,

  valueLabel = null,
  labelShownMode = 'left',
  fontSize = 8,
}) => {
  const classes = useStyles()
  return (
    <div
      className={classes.root}
      style={{
        width: width,
        height: height,
        justifyContent: mode === 'success' ? 'flex-start' : 'flex-end',
      }}
    >
      {valueLabel && labelShownMode === 'left' && (
        <div
          className={clsx(classes.valueText, classes.blueValueText)}
          style={{
            fontSize: fontSize,
            left: -getTextWidth(valueLabel, fontSize),
          }}
        >
          {valueLabel}
        </div>
      )}
      <div
        className={clsx({
          [classes.progressBarBlue]: color === 'blue',
          [classes.progressBarBlueDark]: color === 'blueDark',
          [classes.progressBarBlueDarkRevert]: color === 'blueDarkRevert',
          [classes.progressBarCyan]: color === 'cyan',
          [classes.progressBarCyanRevert]: color === 'cyanRevert',

          [classes.progressBarSuccess]: processType === null && mode === 'success',
          [classes.progressBarDanger]: processType === null && mode !== 'success',
          [classes.progressBarBorderSuccess]: processType !== null && mode === 'success',
          [classes.progressBarBorderDanger]: processType !== null && mode !== 'success',
        })}
        style={{
          height: height,
          width: (progressWidth * value) / maxValue,
          borderRadius: radius,
          borderRight: mode === 'danger' ? 'none' : '',
          borderLeft: mode === 'success' ? 'none' : '',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          justifyContent: color.includes('Revert') ? 'flex-end' : 'flex-start',
        }}
      >
        {valueLabel && labelShownMode === 'right' && <div className={classes.maskText}>{valueLabel}</div>}
      </div>
      {valueLabel && labelShownMode === 'right' && (
        <div
          className={clsx(classes.valueText)}
          style={{
            left: 35,
            mixBlendMode: 'screen',
          }}
        >
          {valueLabel}
        </div>
      )}
    </div>
  )
}

export default GradientProgress
