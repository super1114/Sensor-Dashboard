import { makeStyles } from '@material-ui/core'
import { formatDate, getColorWithPercentage } from 'helpers/helpers'

const useStyles = makeStyles(theme => ({
  wrapper: {
    fontFamily: theme.typography.ultraFontFamily,
    paddingLeft: 30,
  },
  svgWrapper: {
    overflow: 'overlay',
  },
  risingCandle: {
    fill: theme.palette.common.primaryText,
    stroke: theme.palette.common.primaryBlue,
    strokeWidth: 0.5,
  },
  fallingCandle: {
    fill: theme.palette.common.primaryBlue,
    stroke: theme.palette.common.primaryBlue,
    strokeWidth: 0.5,
  },
  svgLine: {
    stroke: theme.palette.common.primaryText,
    strokeWidth: 0.5,
  },
  graphLine: {
    stroke: theme.palette.common.primaryBlue,
    strokeWidth: 3,
  },
  text: {
    fontSize: 8,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: theme.typography.mediumFontFamily,
    fill: theme.palette.common.primaryText,
  },
}))

const CandleStick = ({
  // data = []
  width = 370,
  height = 420,
  data = [],
  candleStickHeight = 240,
  graphHeight = 50,
  startOffset = 20,
}) => {
  const classes = useStyles()

  let totalDay = data.length
  let candleStickWidth = width - startOffset
  let rectWidth = width / totalDay - 2.5

  let min = Math.floor(Math.min(...data.map(temp => temp.lowPrice))) - 1
  let max = Math.ceil(Math.max(...data.map(temp => temp.highPrice)))

  let rulers = []

  for (let i = min; i <= max; i++) {
    rulers.push(
      <g key={`PriceLine${i}`}>
        <text x={0} y={(candleStickHeight / (max - min)) * (i - min) + 3} className={classes.text}>
          {min + i}
        </text>
        <line
          x1={startOffset}
          y1={(candleStickHeight / (max - min)) * (i - min)}
          x2={width}
          y2={(candleStickHeight / (max - min)) * (i - min)}
          className={classes.svgLine}
        ></line>
      </g>
    )
  }

  const generateDateRuler = height => {
    let dates = []
    for (let i = 0; i < totalDay; i += 14) {
      let date = new Date(data[i].date)
      dates.push(
        <g key={`DateRuler-${height}-${i}`}>
          <line
            className={classes.svgLine}
            x1={20 + (i / totalDay) * candleStickWidth}
            y1={height}
            x2={20 + (i / totalDay) * candleStickWidth}
            y2={height + 5}
          ></line>
          <text x={5 + (i / totalDay) * candleStickWidth} y={height + 15} className={classes.text}>
            {' '}
            {formatDate(date)}{' '}
          </text>
        </g>
      )
    }
    return dates
  }
  let dates = generateDateRuler(candleStickHeight)
  let marketRuler = generateDateRuler(candleStickHeight + 70 + graphHeight)
  marketRuler.push(
    <line
      key={'extra one'}
      x1={startOffset}
      y1={candleStickHeight + 70 + graphHeight}
      x2={width}
      y2={candleStickHeight + 70 + graphHeight}
      className={classes.svgLine}
    ></line>
  )

  return (
    <svg
      className={classes.svgWrapper}
      height={height}
      viewBox={`0 -10 ${width} ${height + 20}`}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      {rulers}
      {data.map((item, idx) => {
        return (
          <g key={`oneCandStick${idx}`}>
            <rect
              x={(candleStickWidth / totalDay) * idx + startOffset}
              y={(candleStickHeight * (max - Math.max(item.openPrice, item.closePrice))) / (max - min)}
              width={rectWidth}
              height={(candleStickHeight * Math.abs(item.openPrice - item.closePrice)) / (max - min)}
              className={item.openPrice > item.closePrice ? classes.fallingCandle : classes.risingCandle}
            />
            <line
              x1={(candleStickWidth / totalDay) * idx + candleStickWidth / totalDay / 2 - 1 + startOffset}
              y1={(candleStickHeight * (max - item.highPrice)) / (max - min)}
              x2={(candleStickWidth / totalDay) * idx + candleStickWidth / totalDay / 2 - 1 + startOffset}
              y2={(candleStickHeight * (max - item.lowPrice)) / (max - min)}
              className={classes.svgLine}
            />
          </g>
        )
      })}
      {dates}
      <text x={0} y={candleStickHeight + 32} className={classes.text} style={{ fontSize: 10 }}>
        Events
      </text>
      {data.map((item, idx) => {
        if (item.event)
          return (
            <circle
              key={`EventPointCircle${idx}`}
              cx={(candleStickWidth / totalDay) * idx + startOffset}
              cy={candleStickHeight + 30}
              r={6}
              fill={getColorWithPercentage('#D7F0FE', '#3DB6FC', item.event)}
            />
          )
      })}
      {marketRuler}
      {data.map((item, idx) => {
        if (idx !== data.length - 1)
          return (
            <line
              key={`marketRuler${idx}`}
              x1={(candleStickWidth / totalDay) * idx + candleStickWidth / totalDay / 2 + startOffset}
              y1={candleStickHeight + 50 + (graphHeight * (max - item.marketPrice)) / (max - min)}
              x2={(candleStickWidth / totalDay) * (idx + 1) + candleStickWidth / totalDay / 2 + startOffset}
              y2={candleStickHeight + 50 + (graphHeight * (max - data[idx + 1].marketPrice)) / (max - min)}
              className={classes.graphLine}
            ></line>
          )
      })}
    </svg>
  )
}

export default CandleStick
