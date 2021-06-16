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

  svgWrapper: {
    overflow: 'overlay',
    marginTop: 10,
    marginLeft: -5,
  },
  risingCandle: {
    fill: 'transparent',
    stroke: theme.palette.common.primaryGreen,
    strokeWidth: 0.5,
  },
  fallingCandle: {
    fill: 'transparent',
    stroke: theme.palette.common.primaryRed,
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

const ShareInIssuesGraph = ({ width = 370, height = 420, graphData = [], strokeWidth = 0.5 }) => {
  const classes = useStyles()

  // Graph initialization
  let totalCount = graphData.length * 12 + 1
  let startXOffset = 25
  let endXOffset = 25
  let startYOffset = 0
  let endYOffset = 10

  let graphWidth = width - startXOffset - endXOffset
  let graphHeight = height - startYOffset - endYOffset
  let rectWidth = graphWidth / totalCount - 2

  let data = []
  graphData.map(each => (data = [...data, ...each.shares]))

  // Candle stick initialization
  let issues_min = Math.floor(Math.min(...data.map(temp => temp.sharesInIssues)))
  let issues_max = Math.ceil(Math.max(...data.map(temp => temp.sharesInIssues)))

  issues_min = Math.floor(issues_min / 250) * 250
  issues_max = Math.ceil(issues_max / 250) * 250

  const getXPos = idx => (graphWidth / totalCount) * idx + rectWidth / 2 + 1 + startXOffset
  const getYPos = value => (graphHeight / (issues_max - issues_min)) * (issues_max - value) + startYOffset

  let rulers = []

  //draw vertical and horizontal line for graph
  rulers.push(
    <g key="vertical-horizontal-lines">
      <path
        className={classes.svgLine}
        d={`M ${startXOffset} ${startYOffset}, L ${startXOffset} ${height - endYOffset + 2}`}
        strokeWidth={strokeWidth}
      ></path>
      <path
        className={classes.svgLine}
        d={`M ${startXOffset} ${height - endYOffset + 2}, L ${width - endXOffset} ${height - endYOffset + 2}`}
        strokeWidth={strokeWidth}
      ></path>
    </g>
  )

  // draw the ruler marks and text of the left (for share price candle stick)
  for (let i = issues_min; i <= issues_max; i += 250) {
    rulers.push(
      <g key={`candle-stick-rulers-${i}`}>
        <text x={17} y={getYPos(i) + 3} textAnchor="end" className={classes.rulerText}>
          {threeDots(i)}
        </text>
        <line
          x1={startXOffset}
          y1={getYPos(i)}
          x2={startXOffset - 5}
          y2={getYPos(i)}
          className={classes.svgLine}
        ></line>
      </g>
    )
  }

  // draw the bottom ruler of the graph
  let yearWidth = graphWidth / graphData.length
  graphData.forEach((each, idx) => {
    if (idx === graphData.length - 1)
      rulers.push(
        <g key={`market-graph-years-lines-${idx + 1}`}>
          <line
            x1={width - endXOffset}
            y1={height - endYOffset + 2}
            x2={width - endXOffset}
            y2={height - endYOffset - 3}
            className={classes.svgLine}
          ></line>
        </g>
      )

    rulers.push(
      <g key={`market-graph-years-lines-${idx}`}>
        {idx !== 0 && (
          <line
            x1={yearWidth * idx + startXOffset}
            y1={height - endYOffset + 2}
            x2={yearWidth * idx + startXOffset}
            y2={height - endYOffset - 3}
            className={classes.svgLine}
          ></line>
        )}
        <text
          x={yearWidth * idx + startXOffset + yearWidth / 3}
          y={height - endYOffset + 10}
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
        <span className={classes.blue}>Shares in issue</span>
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
              {item.sharesInIssues && (
                <g>
                  {idx !== 0 && (
                    <line
                      x1={getXPos(idx) + rectWidth / 2}
                      y1={getYPos(item.sharesInIssues)}
                      x2={getXPos(idx - 1) + rectWidth / 2}
                      y2={getYPos(data[idx - 1].sharesInIssues)}
                      className={clsx(classes.svgLine, classes.blue)}
                    ></line>
                  )}
                  <circle
                    cx={getXPos(idx) + rectWidth / 2}
                    cy={getYPos(item.sharesInIssues)}
                    className={classes.circleBlue}
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

export default ShareInIssuesGraph
