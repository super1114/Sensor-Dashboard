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
    fontSize: 12,
  },

  dateRulerWrapper: {
    display: 'flex',
    position: 'absolute',
  },
  dateRuler: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 12,
    letterSpacing: 1,
    width: 30,
  },
  gridPath: {
    fill: 'transparent',
    strokeWidth: 0.3,
    stroke: theme.palette.common.primaryText,
  },

  blueColor: {
    fill: theme.palette.common.thirdBlue,
  },
  greenColor: {
    fill: theme.palette.common.secondaryGreen,
  },
  redColor: {
    fill: theme.palette.common.primaryRed,
  },

  blueCircle: {
    strokeWidth: 2,
    fill: theme.palette.common.baseCardBackground,
    stroke: theme.palette.common.thirdBlue,
  },
  greenCircle: {
    strokeWidth: 2,
    fill: theme.palette.common.baseCardBackground,
    stroke: theme.palette.common.secondaryGreen,
  },
  redCircle: {
    strokeWidth: 2,
    fill: theme.palette.common.baseCardBackground,
    stroke: theme.palette.common.primaryRed,
  },

  value: {
    fontFamily: theme.typography.mediumFontFamily,
    fill: theme.palette.common.primaryText,
    fontSize: 12,
    letterSpacing: 1,
  },
  percentage: {
    fontFamily: theme.typography.lightFontFamily,
    fill: theme.palette.common.primaryText,
    fontSize: 9,
    letterSpacing: 0.75,
  },
}))
const DailyPriceTable = ({ width = 1153, height = 277, data = [] }) => {
  const classes = useStyles()

  let graphWidth = width - 10
  let graphHeight = height - 30

  let startXOffset = 150
  let startYOffset = 60
  let radius = 20
  let max = Math.max(
    ...data.map(each => each.veryPosi),
    ...data.map(each => each.posi),
    ...data.map(each => each.neutral),
    ...data.map(each => each.neg),
    ...data.map(each => each.veryNeg)
  )

  const getXPos = idx => startXOffset + ((graphWidth - startXOffset) * idx) / data.length
  const getYPos = idx => startYOffset + ((graphHeight - startYOffset) * idx) / 4

  // draw value rulers
  const grids = []

  const dates = []
  data.forEach((each, i) => {
    dates.push(
      <div
        key={i}
        className={clsx(classes.dateRuler)}
        style={{ marginLeft: (graphWidth - startXOffset) / data.length - 30 }}
      >
        <span>{dateStyling(each.date).split(' ')[0]}</span>
        <span>{dateStyling(each.date).split(' ')[1]}</span>
      </div>
    )

    grids.push(
      <path
        key={`grid-verti-${i}`}
        d={`M ${getXPos(i) + 50} 40 , L ${getXPos(i) + 50} ${graphHeight + 20}`}
        className={classes.gridPath}
      ></path>
    )
  })

  const columns = [
    'Very Positive (0.81 - 1)',
    'Positive (0.61 - 0.80)',
    'Neutral (0.41 - 0.60)',
    'Negative (0.21 - 0.40)',
    'Very Negative (0-0.20)',
  ]
  const contents = []

  columns.forEach((each, idx) => {
    contents.push(
      <text
        key={idx}
        x={3}
        y={getYPos(idx) + 5}
        className={clsx(classes.svgText, {
          [classes.greenColor]: idx < 2,
          [classes.blueColor]: idx === 2,
          [classes.redColor]: idx > 2,
        })}
        style={{
          fontSize: 12.32,
          letterSpacing: 0.62,
        }}
      >
        {each}
      </text>
    )

    grids.push(
      <path
        key={`grid-hori-${idx}`}
        d={`M ${startXOffset + 15}, ${getYPos(idx)} , L ${graphWidth - 15} ${getYPos(idx)}`}
        className={classes.gridPath}
      ></path>
    )
  })

  return (
    <div style={{ position: 'relative' }}>
      <div className={classes.dateRulerWrapper} style={{ left: startXOffset - 35 }}>
        {dates}
      </div>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
        {grids}
        {contents}
        {data.map((each, idx) => {
          let total = each.veryPosi + each.posi + each.neutral + each.neg + each.veryNeg
          return (
            <g key={idx}>
              <circle
                cx={getXPos(idx) + 50}
                cy={getYPos(0)}
                r={(radius * each.veryPosi) / max}
                className={classes.greenCircle}
              ></circle>
              <text x={getXPos(idx) + 55} y={getYPos(0) - 5} className={classes.value}>
                {each.veryPosi}
              </text>
              <text x={getXPos(idx) + 55} y={getYPos(0) + 10} className={classes.percentage}>
                {Math.round((100 / total) * each.veryPosi)}%
              </text>

              <circle
                cx={getXPos(idx) + 50}
                cy={getYPos(1)}
                r={(radius * each.posi) / max}
                className={classes.greenCircle}
              ></circle>
              <text x={getXPos(idx) + 55} y={getYPos(1) - 5} className={classes.value}>
                {each.posi}
              </text>
              <text x={getXPos(idx) + 55} y={getYPos(1) + 10} className={classes.percentage}>
                {Math.round((100 / total) * each.posi)}%
              </text>

              <circle
                cx={getXPos(idx) + 50}
                cy={getYPos(2)}
                r={(radius * each.neutral) / max}
                className={classes.blueCircle}
              ></circle>
              <text x={getXPos(idx) + 55} y={getYPos(2) - 5} className={classes.value}>
                {each.neutral}
              </text>
              <text x={getXPos(idx) + 55} y={getYPos(2) + 10} className={classes.percentage}>
                {Math.round((100 / total) * each.neutral)}%
              </text>

              <circle
                cx={getXPos(idx) + 50}
                cy={getYPos(3)}
                r={(radius * each.neg) / max}
                className={classes.redCircle}
              ></circle>
              <text x={getXPos(idx) + 55} y={getYPos(3) - 5} className={classes.value}>
                {each.neg}
              </text>
              <text x={getXPos(idx) + 55} y={getYPos(3) + 10} className={classes.percentage}>
                {Math.round((100 / total) * each.neg)}%
              </text>

              <circle
                cx={getXPos(idx) + 50}
                cy={getYPos(4)}
                r={(radius * each.veryNeg) / max}
                className={classes.redCircle}
              ></circle>
              <text x={getXPos(idx) + 55} y={getYPos(4) - 5} className={classes.value}>
                {each.veryNeg}
              </text>
              <text x={getXPos(idx) + 55} y={getYPos(4) + 10} className={classes.percentage}>
                {Math.round((100 / total) * each.veryNeg)}%
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default DailyPriceTable
