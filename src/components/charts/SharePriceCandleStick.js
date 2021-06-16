import { makeStyles } from '@material-ui/core'
import { threeDots } from 'helpers/helpers'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
  },
  title: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 6,
    lineHeight: '7px',
    letterSpacing: 0.5,
    display: 'flex',
    position: 'absolute',
    top: 0,
    right: 30,
  },
  rulerText: {
    fontSize: 5.68,
    letterSpacing: 0.47,
    fontFamily: theme.typography.mediumFontFamily,
    fill: theme.palette.common.primaryText,
  },

  svgLine: {
    stroke: theme.palette.common.primaryText,
    strokeWidth: 0.5,
  },
  svgWrapper: {
    overflow: 'initial',
    marginTop: 20,
  },
  risingCandle: {
    fill: 'transparent',
    stroke: theme.palette.common.secondaryGreen,
    strokeWidth: 0.5,
  },
  fallingCandle: {
    fill: 'transparent',
    stroke: theme.palette.common.primaryRed,
    strokeWidth: 0.5,
  },
  graphLine: {
    stroke: theme.palette.common.primaryBlue,
    strokeWidth: 3,
  },

  blue: {
    fill: theme.palette.common.thirdBlue,
    color: theme.palette.common.thirdBlue,
    stroke: theme.palette.common.thirdBlue,
  },
  cyan: {
    fill: theme.palette.common.primaryCyan,
    color: theme.palette.common.primaryCyan,
    stroke: theme.palette.common.primaryCyan,
  },
  red: {
    fill: theme.palette.common.primaryRed,
    color: theme.palette.common.primaryRed,
    stroke: theme.palette.common.primaryRed,
  },
  green: {
    fill: theme.palette.common.secondaryGreen,
    color: theme.palette.common.secondaryGreen,
    stroke: theme.palette.common.secondaryGreen,
  },
  white: {
    fill: theme.palette.common.primaryText,
    color: theme.palette.common.primaryText,
    stroke: theme.palette.common.primaryText,
  },

  circleBlue: {
    fill: theme.palette.common.thirdBlue,
  },
  circleCyan: {
    fill: theme.palette.common.primaryCyan,
  },
}))

const SharePriceCandleStick = ({ width = 370, height = 420, graphData = [], strokeWidth = 0.5 }) => {
  const classes = useStyles()

  // Graph initialization
  let totalCount = graphData.length * 12 + 1
  let startXOffset = 20
  let endXOffset = 25
  let startYOffset = 0
  let endYOffset = 10

  let candleStickWidth = width - startXOffset - endXOffset
  let candleStickHeight = height - startYOffset - endYOffset
  let rectWidth = candleStickWidth / totalCount - 2

  let data = []
  graphData.map(each => (data = [...data, ...each.shares]))

  // Candle stick initialization
  let candle_min = Math.floor(Math.min(...data.map(temp => temp.lowPrice)))
  let candle_max = Math.ceil(Math.max(...data.map(temp => temp.highPrice)))
  let market_min = Math.floor(Math.min(...data.map(temp => Math.min(temp.ftse, temp.marketCap))))
  let market_max = Math.ceil(Math.max(...data.map(temp => Math.max(temp.ftse, temp.marketCap))))

  candle_min = Math.floor(candle_min / 25) * 25
  candle_max = Math.ceil(candle_max / 25) * 25
  market_min = Math.floor(market_min / 200) * 200
  market_max = Math.ceil(market_max / 200) * 200

  const getXPos = idx => (candleStickWidth / totalCount) * idx + rectWidth / 2 + 1 + startXOffset
  const getYPosForCandle = value =>
    (candleStickHeight / (candle_max - candle_min)) * (candle_max - value) + startYOffset
  const getYPosForMarket = value =>
    (candleStickHeight / (market_max - market_min)) * (market_max - value) + startYOffset

  let rulers = []

  //draw vertical and horizontal line for graph
  rulers.push(
    <g key="vertical-horizontal-lines">
      <path
        className={classes.svgLine}
        d={`M ${startXOffset} ${startYOffset}, L ${startXOffset} ${height - endYOffset}`}
        strokeWidth={strokeWidth}
      ></path>
      <path
        className={classes.svgLine}
        d={`M ${width - endXOffset} ${startYOffset}, L ${width - endXOffset} ${height - endYOffset}`}
        strokeWidth={strokeWidth}
      ></path>
      <path
        className={classes.svgLine}
        d={`M ${startXOffset} ${height - endYOffset}, L ${width - endXOffset} ${height - endYOffset}`}
        strokeWidth={strokeWidth}
      ></path>
    </g>
  )

  // draw the ruler marks and text of the left (for share price candle stick)
  for (let i = candle_min; i <= candle_max; i += 25) {
    if (i === candle_min) continue
    rulers.push(
      <g key={`candle-stick-rulers-${i}`}>
        <text x={0} y={getYPosForCandle(i) + 3} className={classes.rulerText}>
          {threeDots(i)}
        </text>
        <line
          x1={startXOffset}
          y1={getYPosForCandle(i)}
          x2={startXOffset - 5}
          y2={getYPosForCandle(i)}
          className={classes.svgLine}
        ></line>
      </g>
    )
  }

  // draw the ruler marks and text of the right (for market cap & ftse 350)
  for (let i = market_min; i <= market_max; i += 200) {
    if (i === market_min) continue
    rulers.push(
      <g key={`market_cap-ftse350-rulers-${i}`}>
        <text x={width - endXOffset + 7} y={getYPosForMarket(i) + 3} className={classes.rulerText}>
          {threeDots(i)}
        </text>
        <line
          x1={width - endXOffset}
          y1={getYPosForMarket(i)}
          x2={width - endXOffset + 5}
          y2={getYPosForMarket(i)}
          className={classes.svgLine}
        ></line>
      </g>
    )
  }

  // draw the bottom ruler of the graph
  let yearWidth = candleStickWidth / graphData.length
  graphData.forEach((each, idx) => {
    if (idx === graphData.length - 1)
      rulers.push(
        <g key={`market-graph-years-lines-${idx + 1}`}>
          <line
            x1={width - endXOffset}
            y1={height - endYOffset}
            x2={width - endXOffset}
            y2={height - endYOffset + 5}
            className={classes.svgLine}
          ></line>
        </g>
      )

    rulers.push(
      <g key={`market-graph-years-lines-${idx}`}>
        <line
          x1={yearWidth * idx + startXOffset}
          y1={height - endYOffset}
          x2={yearWidth * idx + startXOffset}
          y2={height - endYOffset + 5}
          className={classes.svgLine}
        ></line>
        <text
          x={yearWidth * idx + startXOffset + yearWidth / 3}
          y={height - endYOffset + 8}
          className={classes.rulerText}
        >
          {each.year}
        </text>
      </g>
    )
  })

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>
        <span className={classes.green}> Positive Performance&nbsp;</span> |
        <span className={classes.red}>&nbsp;Adverse Performance&nbsp;</span> |
        <span className={classes.blue}>&nbsp;Company Market Cap&nbsp;</span> |
        <span className={classes.cyan}>&nbsp;FTSE 350 </span>
      </div>
      <svg
        className={classes.svgWrapper}
        height={height}
        width={width}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {rulers}
        {data.map((item, idx) => {
          return (
            <g key={`oneCandStick${idx}`}>
              <rect
                x={getXPos(idx)}
                y={getYPosForCandle(Math.max(item.openPrice, item.closePrice))}
                width={rectWidth}
                height={(candleStickHeight * Math.abs(item.openPrice - item.closePrice)) / (candle_max - candle_min)}
                className={item.openPrice > item.closePrice ? classes.risingCandle : classes.fallingCandle}
              />
              <line
                x1={getXPos(idx) + rectWidth / 2}
                y1={getYPosForCandle(item.highPrice)}
                x2={getXPos(idx) + rectWidth / 2}
                y2={getYPosForCandle(item.openPrice > item.closePrice ? item.openPrice : item.closePrice)}
                className={clsx(classes.svgLine, {
                  [classes.risingCandle]: item.openPrice > item.closePrice,
                  [classes.fallingCandle]: item.openPrice <= item.closePrice,
                })}
              />
              <line
                x1={getXPos(idx) + rectWidth / 2}
                y1={getYPosForCandle(item.lowPrice)}
                x2={getXPos(idx) + rectWidth / 2}
                y2={getYPosForCandle(item.openPrice < item.closePrice ? item.openPrice : item.closePrice)}
                className={clsx(classes.svgLine, {
                  [classes.risingCandle]: item.openPrice > item.closePrice,
                  [classes.fallingCandle]: item.openPrice <= item.closePrice,
                })}
              />

              {item.marketCap && (
                <g>
                  {idx !== 0 && (
                    <line
                      x1={getXPos(idx) + rectWidth / 2}
                      y1={getYPosForMarket(item.marketCap)}
                      x2={getXPos(idx - 1) + rectWidth / 2}
                      y2={getYPosForMarket(data[idx - 1].marketCap)}
                      className={clsx(classes.svgLine, classes.blue)}
                    ></line>
                  )}
                  <circle
                    cx={getXPos(idx) + rectWidth / 2}
                    cy={getYPosForMarket(item.marketCap)}
                    className={classes.circleBlue}
                    r={0.89}
                  ></circle>
                </g>
              )}

              {item.ftse && (
                <g>
                  {idx !== 0 && (
                    <line
                      x1={getXPos(idx) + rectWidth / 2}
                      y1={getYPosForMarket(item.ftse)}
                      x2={getXPos(idx - 1) + rectWidth / 2}
                      y2={getYPosForMarket(data[idx - 1].ftse)}
                      className={clsx(classes.svgLine, classes.cyan)}
                    ></line>
                  )}
                  <circle
                    cx={getXPos(idx) + rectWidth / 2}
                    cy={getYPosForMarket(item.ftse)}
                    className={classes.circleCyan}
                    r={0.89}
                  ></circle>
                </g>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default SharePriceCandleStick
