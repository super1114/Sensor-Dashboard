import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { dateStyling } from 'helpers/helpers'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: theme.typography.mediumFontFamily,
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 12,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  svgText: {
    fill: theme.palette.common.primaryText,
    fontSize: 8,
  },

  gridPath: {
    fill: 'transparent',
    stroke: theme.palette.common.primaryText,
    strokeWidth: 0.5,
  },

  gridPathOpacity: {
    fill: 'transparent',
    stroke: theme.palette.common.primaryText,
    strokeOpacity: 0.5,
    strokeWidth: 0.3,
  },

  rangePath: {
    fill: 'transparent',
    strokeWidth: 1,
    stroke: theme.palette.common.primaryText,
  },
  outerCircleBlue: {
    stroke: theme.palette.common.primaryBlue,
    strokeWidth: 2,
    fill: theme.palette.common.primaryBlue,
    opacity: 0.5,
  },
  innerCircleBlue: {
    fill: theme.palette.common.primaryBlue,
  },

  outerCircleCyan: {
    stroke: theme.palette.common.primaryCyan,
    strokeWidth: 2,
    fill: theme.palette.common.primaryCyan,
    opacity: 0.5,
  },
  innerCircleCyan: {
    fill: theme.palette.common.primaryCyan,
  },

  blueText: {
    fontSize: 6,
    fontFamily: theme.typography.mediumFontFamily,
    fill: theme.palette.common.primaryBlue,
  },
  cyanText: {
    fontSize: 6,
    fontFamily: theme.typography.mediumFontFamily,
    fill: theme.palette.common.primaryCyan,
  },
}))
const YearlyPriceTable = ({ height = 207, width = 205, data = [] }) => {
  const classes = useStyles()

  let graphWidth = width - 10
  let graphHeight = height - 30

  let startXOffset = 40
  let startYOffset = 25
  let innerRadius = 2
  let outerRadius = 4

  let max = Math.max(...data.data.map(each => each.ub))
  max = Math.ceil(max / 5) * 5

  const getXPos = value => startXOffset + ((graphWidth - startXOffset) * value) / max
  const getYPos = idx => startYOffset + ((graphHeight - startYOffset) * idx) / data.data.length + 5

  // draw value rulers
  const grids = []

  const rulers = []
  for (let i = 0; i < 8; i++) {
    rulers.push(
      <text key={i} x={getXPos((i * max) / 7) - 5} y={10} className={classes.svgText}>
        {((i * max) / 7).toFixed(0)}
      </text>
    )

    grids.push(
      <path
        key={`grid-verti-${i}`}
        d={`M ${getXPos((i * max) / 7)} 15 , L ${getXPos((i * max) / 7)} ${graphHeight}`}
        className={clsx({
          [classes.gridPathOpacity]: i !== 0,
          [classes.gridPath]: i === 0,
        })}
      ></path>
    )
  }

  const dates = []

  data.data.forEach((each, idx) => {
    dates.push(
      <text key={idx} x={3} y={getYPos(idx)} className={classes.svgText} style={{ fontSize: 7 }}>
        {dateStyling(each.date)}
      </text>
    )

    grids.push(
      <path
        key={`grid-hori-${idx}`}
        d={`M ${startXOffset}, ${getYPos(idx)} , L ${graphWidth} ${getYPos(idx)}`}
        className={classes.gridPathOpacity}
      ></path>
    )
  })

  const determineColor = idx => {
    return idx < 1 || Math.floor((idx - 1) / 2) % 2 === 1
  }

  return (
    <div
      className={classes.background}
      style={{
        height: height,
        width: width,
      }}
    >
      <div className={classes.title}>{data.title}</div>
      <svg
        width={width}
        height={graphHeight}
        viewBox={`0 0 ${width + 3} ${graphHeight}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* value rulers */}
        {rulers}
        {dates}
        {grids}
        {data.data.map((each, idx) => {
          let y = getYPos(idx)
          let colorMode = determineColor(idx)
          return (
            <g key={idx}>
              <text
                x={getXPos(each.lb) - 13}
                y={y + 2}
                className={clsx({
                  [classes.cyanText]: colorMode,
                  [classes.blueText]: !colorMode,
                })}
              >
                {each.lb}
              </text>
              <text
                x={getXPos(each.ub) + 10}
                y={y + 2}
                className={clsx({
                  [classes.blueText]: colorMode,
                  [classes.cyanText]: !colorMode,
                })}
              >
                {each.ub}
              </text>
              <path d={`M ${getXPos(each.lb)} ${y}, L ${getXPos(each.ub)} ${y}`} className={classes.rangePath}></path>

              <circle
                className={clsx({
                  [classes.outerCircleBlue]: colorMode,
                  [classes.outerCircleCyan]: !colorMode,
                })}
                cx={getXPos(each.ub)}
                cy={y}
                r={outerRadius}
              ></circle>
              <circle
                className={clsx({
                  [classes.outerCircleBlue]: colorMode,
                  [classes.outerCircleCyan]: !colorMode,
                })}
                cx={getXPos(each.ub)}
                cy={y}
                r={innerRadius}
              ></circle>

              <circle
                className={clsx({
                  [classes.outerCircleCyan]: colorMode,
                  [classes.outerCircleBlue]: !colorMode,
                })}
                cx={getXPos(each.lb)}
                cy={y}
                r={outerRadius}
              ></circle>
              <circle
                className={clsx({
                  [classes.outerCircleCyan]: colorMode,
                  [classes.outerCircleBlue]: !colorMode,
                })}
                cx={getXPos(each.lb)}
                cy={y}
                r={innerRadius}
              ></circle>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default YearlyPriceTable
