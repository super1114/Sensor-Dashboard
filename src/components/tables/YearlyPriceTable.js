import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { wrapABS } from 'helpers/helpers'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: theme.typography.mediumFontFamily,
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 10,
    lineHeight: '11px',
    letterSpacing: 0.83,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  svgText: {
    fill: theme.palette.common.primaryText,
    fontSize: 8,
    letterSpacing: 0.67,
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
    stroke: theme.palette.common.thirdBlue,
  },
  outerCircleGreen: {
    stroke: theme.palette.common.secondaryGreen,
    strokeWidth: 2,
    fill: theme.palette.common.secondaryGreen,
    opacity: 0.5,
  },
  innerCircleGreen: {
    fill: theme.palette.common.secondaryGreen,
  },

  outerCircleRed: {
    stroke: theme.palette.common.primaryRed,
    strokeWidth: 2,
    fill: theme.palette.common.primaryRed,
    opacity: 0.5,
  },
  innerCircleRed: {
    fill: theme.palette.common.primaryRed,
  },

  greenText: {
    fontSize: 6,
    fontFamily: theme.typography.mediumFontFamily,
    fill: theme.palette.common.secondaryGreen,
  },
  redText: {
    fontSize: 6,
    fontFamily: theme.typography.mediumFontFamily,
    fill: theme.palette.common.primaryRed,
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

  let max = Math.max(...data.data.map(each => Math.max(each.ub, each.lb)))
  let min = Math.min(...data.data.map(each => Math.min(each.ub, each.lb)))
  max = Math.ceil(max / 10) * 10
  min = Math.floor(min / 10) * 10

  if (max - min < 70) min = max - 70

  const getXPos = value => startXOffset + ((graphWidth - startXOffset) * (value - min)) / (max - min)
  const getYPos = idx => startYOffset + ((graphHeight - startYOffset) * idx) / data.data.length + 5

  // draw value rulers
  const grids = []

  const rulers = []
  rulers.push(
    <text key={-1} x={5} y={10} className={classes.svgText}>
      £m
    </text>
  )
  for (let i = 0; i < 8; i++) {
    let value = (i * (max - min)) / 7 + min
    rulers.push(
      <text key={i} x={getXPos(value) - 5} y={10} className={classes.svgText}>
        {wrapABS(value)}
      </text>
    )

    grids.push(
      <path
        key={`grid-verti-${i}`}
        d={`M ${getXPos(value)} 15 , L ${getXPos(value)} ${graphHeight}`}
        className={clsx({
          [classes.gridPathOpacity]: i !== 0,
          [classes.gridPath]: i === 0,
        })}
      ></path>
    )
  }

  const years = []

  data.data.forEach((each, idx) => {
    years.push(
      <text key={idx} x={3} y={getYPos(idx)} className={classes.svgText} style={{ fontSize: 7 }}>
        {each.year}
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
        {years}
        {grids}
        {data.data.map((each, idx) => {
          let y = getYPos(idx)
          let colorMode = determineColor(idx)
          return (
            <g key={idx}>
              <text
                x={getXPos(each.lb) - (each.lb > each.ub ? -10 : 20)}
                y={y + 2}
                className={clsx({
                  [classes.redText]: colorMode,
                  [classes.greenText]: !colorMode,
                })}
              >
                {wrapABS(each.lb)}
              </text>
              <text
                x={getXPos(each.ub) - (each.ub > each.lb ? -10 : 20)}
                y={y + 2}
                className={clsx({
                  [classes.greenText]: colorMode,
                  [classes.redText]: !colorMode,
                })}
              >
                {wrapABS(each.ub)}
              </text>
              <path d={`M ${getXPos(each.lb)} ${y}, L ${getXPos(each.ub)} ${y}`} className={classes.rangePath}></path>

              <circle
                className={clsx({
                  [classes.outerCircleGreen]: colorMode,
                  [classes.outerCircleRed]: !colorMode,
                })}
                cx={getXPos(each.ub)}
                cy={y}
                r={outerRadius}
              ></circle>
              <circle
                className={clsx({
                  [classes.outerCircleGreen]: colorMode,
                  [classes.outerCircleRed]: !colorMode,
                })}
                cx={getXPos(each.ub)}
                cy={y}
                r={innerRadius}
              ></circle>

              <circle
                className={clsx({
                  [classes.outerCircleRed]: colorMode,
                  [classes.outerCircleGreen]: !colorMode,
                })}
                cx={getXPos(each.lb)}
                cy={y}
                r={outerRadius}
              ></circle>
              <circle
                className={clsx({
                  [classes.outerCircleRed]: colorMode,
                  [classes.outerCircleGreen]: !colorMode,
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
