import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { fillingType, borderType } from 'constants/common'
import clsx from 'clsx'
import { threeDots } from 'helpers/helpers'

const useStyles = makeStyles(theme => ({
  progressBarFillThirdBlue: {
    background: theme.palette.common.thirdBlue,
  },
  progressBarFillCyan: {
    background: theme.palette.common.primaryCyan,
  },
  progressBarFillSecondaryBlue: {
    background: theme.palette.common.secondaryBlue,
  },
  progressBarFillGreen: {
    background: theme.palette.common.primaryGreen,
  },
  progressBarFillWhite: {
    background: theme.palette.common.primaryText,
  },
  progressBarFillSecondaryGreen: {
    background: theme.palette.common.secondaryGreen,
  },

  progressBarOutlineThirdBlue: {
    border: `1px solid ${theme.palette.common.thirdBlue}`,
  },
  progressBarOutlineCyan: {
    border: `1px solid ${theme.palette.common.primaryCyan}`,
  },
  progressBarOutlineSecondaryBlue: {
    border: `1px solid ${theme.palette.common.secondaryBlue}`,
  },
  progressBarOutlineGreen: {
    border: `1px solid ${theme.palette.common.primaryGreen}`,
  },
  progressBarOutlineWhite: {
    border: `1px solid ${theme.palette.common.primaryText}`,
  },
  progressBarOutlineSecondaryGreen: {
    border: `1px solid ${theme.palette.common.secondaryGreen}`,
  },

  textThirdBlue: {
    color: theme.palette.common.thirdBlue,
  },
  textCyan: {
    color: theme.palette.common.primaryCyan,
  },
  textSecondaryBlue: {
    color: theme.palette.common.secondaryBlue,
  },
  textGreen: {
    color: theme.palette.common.primaryGreen,
  },
  textWhite: {
    color: theme.palette.common.primaryText,
  },
  textSecondaryGreen: {
    color: theme.palette.common.secondaryGreen,
  },

  valueWrapper: {
    fontSize: 8,
    fontFamily: theme.typography.mediumFontFamily,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },

  blackFont: {
    color: theme.palette.common.primaryBlack,
  },
  whiteFont: {
    color: theme.palette.common.primaryText,
  },

  bgWrapper: {
    position: 'absolute',
    right: 0,
  },
  text: {
    paddingRight: 2,
    paddingLeft: 2,
    letterSpacing: '0.53px',
  },
  borderRightStrict: {
    borderTopRightRadius: 'unset !important',
    borderBottomRightRadius: 'unset !important',
  },
  borderLeftStrict: {
    borderTopLeftRadius: 'unset !important',
    borderBottomLeftRadius: 'unset !important',
  },
}))
const OneLineBarChart = ({
  height = 10,
  width = 0,
  radius = 4,
  fillType = fillingType.filled,
  borderRightType = borderType.round,
  borderLeftType = borderType.round,
  colors = [],
  data = [],
  max = null,
  suffix = null,
}) => {
  const classes = useStyles()

  let minimumWidth = radius * 2
  let barWidth = width
  let sum = 0

  data.map(each => (sum += each))
  if (max) sum = max
  let rest = sum

  if (borderRightType !== borderType.round || borderLeftType !== borderType.round) barWidth -= 20

  let borderRightStrict = false
  let borderLeftStrict = false

  if (borderRightType === borderType.strict) borderRightStrict = true
  if (borderLeftType === borderType.strict) borderLeftStrict = true

  return (
    <div
      style={{
        width: width,
        height: height,
        display: 'flex',
        justifyContent: borderRightType === borderType.strict ? 'flex-end' : 'flex-start',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {borderRightType === borderType.strict && (
        <div
          className={clsx(classes.text, {
            [classes.textThirdBlue]: colors[0] === 'thirdBlue',
            [classes.textCyan]: colors[0] === 'cyan',
            [classes.textSecondaryBlue]: colors[0] === 'secondaryBlue',
            [classes.textSecondaryGreen]: colors[0] === 'secondaryGreen',
            [classes.textGreen]: colors[0] === 'green',
            [classes.textWhite]: colors[0] === 'white',
          })}
        >
          {threeDots(data[0])}
        </div>
      )}
      {data.map((each, idx) => {
        if (idx > 0) rest -= data[idx - 1]

        let eachRadius = 0
        let textShown = true

        if (borderRightType === borderType.round && borderLeftType === borderType.round) eachRadius = radius
        else if (borderRightType === borderType.strict && idx === 0) {
          textShown = false
          eachRadius = radius
        } else if (borderLeftType === borderType.strict && idx === data.length - 1) {
          textShown = false
          eachRadius = radius
        }

        if (fillType === fillingType.filled)
          return (
            <div
              key={idx}
              className={clsx(
                classes.valueWrapper,
                {
                  [classes.blackFont]: colors[idx] === 'cyan' || colors[idx] === 'white',
                },
                {
                  [classes.progressBarFillThirdBlue]: colors[idx] === 'thirdBlue',
                  [classes.progressBarFillCyan]: colors[idx] === 'cyan',
                  [classes.progressBarFillSecondaryBlue]: colors[idx] === 'secondaryBlue',
                  [classes.progressBarFillSecondaryGreen]: colors[idx] === 'secondaryGreen',
                  [classes.progressBarFillGreen]: colors[idx] === 'green',
                  [classes.progressBarFillWhite]: colors[idx] === 'white',
                  [classes.borderRightStrict]: borderRightStrict === true,
                  [classes.borderLeftStrict]: borderLeftStrict === true,
                }
              )}
              style={{
                width: (barWidth * each) / sum,
                height: height,
                minWidth: textShown ? 'max-content' : radius,
                borderRadius: eachRadius,
                overflow: 'visible',
                position: 'relative',
              }}
            >
              {textShown && (
                <div className={classes.text} style={{ zIndex: idx + 100 }}>
                  {threeDots(each)}
                  {suffix}
                </div>
              )}
              {idx !== data.length - 1 && borderRightType === borderType.round && borderLeftType === borderType.round && (
                <div
                  className={clsx({
                    [classes.progressBarFillThirdBlue]: colors[idx] === 'thirdBlue',
                    [classes.progressBarFillCyan]: colors[idx] === 'cyan',
                    [classes.progressBarFillSecondaryBlue]: colors[idx] === 'secondaryBlue',
                    [classes.progressBarFillSecondaryGreen]: colors[idx] === 'secondaryGreen',
                    [classes.progressBarFillGreen]: colors[idx] === 'green',
                    [classes.progressBarFillWhite]: colors[idx] === 'white',
                  })}
                  style={{
                    width: minimumWidth,
                    height: height,
                    border: 'none',
                    position: 'absolute',
                    right: -radius,
                  }}
                ></div>
              )}
            </div>
          )

        return (
          <div
            key={idx}
            className={clsx(classes.valueWrapper, {
              [classes.progressBarOutlineThirdBlue]: colors[idx] === 'thirdBlue',
              [classes.progressBarOutlineCyan]: colors[idx] === 'cyan',
              [classes.progressBarOutlineSecondaryBlue]: colors[idx] === 'secondaryBlue',
              [classes.progressBarOutlineSecondaryGreen]: colors[idx] === 'secondaryGreen',
              [classes.progressBarOutlineGreen]: colors[idx] === 'green',
              [classes.progressBarOutlineWhite]: colors[idx] === 'white',
              [classes.borderRightStrict]: borderRightStrict === true,
              [classes.borderLeftStrict]: borderLeftStrict === true,
            })}
            style={{
              width: (barWidth * each) / sum,
              height: height,
              minWidth: textShown ? 'max-content' : radius,
              borderRadius: eachRadius,
              overflow: 'visible',
              position: 'relative',
              borderRight: idx !== data.length - 1 && 0,
              borderTopRightRadius: idx !== data.length - 1 ? 0 : radius,
              borderBottomRightRadius: idx !== data.length - 1 ? 0 : radius,
            }}
          >
            {textShown && (
              <div className={classes.text} style={{ zIndex: idx + 100 }}>
                {threeDots(each)}
                {suffix}
              </div>
            )}
            {idx !== data.length - 1 && borderRightType === borderType.round && borderLeftType === borderType.round && (
              <div
                className={clsx({
                  [classes.progressBarOutlineThirdBlue]: colors[idx] === 'thirdBlue',
                  [classes.progressBarOutlineCyan]: colors[idx] === 'cyan',
                  [classes.progressBarOutlineSecondaryBlue]: colors[idx] === 'secondaryBlue',
                  [classes.progressBarOutlineSecondaryGreen]: colors[idx] === 'secondaryGreen',
                  [classes.progressBarOutlineGreen]: colors[idx] === 'green',
                  [classes.progressBarOutlineWhite]: colors[idx] === 'white',
                })}
                style={{
                  width: minimumWidth,
                  height: height,
                  position: 'absolute',
                  borderRight: 'none',
                  borderLeft: 'none',
                  right: -radius,
                }}
              ></div>
            )}
          </div>
        )
      })}
      {borderLeftType === borderType.strict && (
        <div
          className={clsx(classes.text, {
            [classes.textThirdBlue]: colors[data.length - 1] === 'thirdBlue',
            [classes.textCyan]: colors[data.length - 1] === 'cyan',
            [classes.textSecondaryBlue]: colors[data.length - 1] === 'secondaryBlue',
            [classes.textSecondaryGreen]: colors[data.length - 1] === 'secondaryGreen',
            [classes.textGreen]: colors[data.length - 1] === 'green',
            [classes.textWhite]: colors[data.length - 1] === 'white',
          })}
        >
          {threeDots(data[data.length - 1])}
        </div>
      )}
    </div>
  )
}

export default OneLineBarChart
