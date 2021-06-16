import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    fontFamily: theme.typography.lightFontFamily,
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 42,
  },
  title: {
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.62,
    fontFamily: theme.typography.mediumFontFamily,
    height: 15,
    justifyContent: 'center',
    textAlign: 'center',
  },
  subTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.62,
    fontFamily: theme.typography.lightFontFamily,
    height: 54,
    width: 38,
    marginRight: 4,
    wordSpacing: '100vw',
  },

  path: {
    fill: 'transparent',
    stroke: theme.palette.common.primaryText,
  },
  blue: {
    color: theme.palette.common.thirdBlue,
    fill: theme.palette.common.thirdBlue,
    stroke: theme.palette.common.thirdBlue,
  },
  green: {
    color: theme.palette.common.primaryGreen,
    fill: theme.palette.common.primaryGreen,
    stroke: theme.palette.common.primaryGreen,
  },
  cyan: {
    color: theme.palette.common.primaryCyan,
    fill: theme.palette.common.primaryCyan,
    stroke: theme.palette.common.primaryCyan,
  },
  secondaryBlue: {
    color: theme.palette.common.secondaryBlue,
    fill: theme.palette.common.secondaryBlue,
    stroke: theme.palette.common.secondaryBlue,
  },

  outerCircle: {
    opacity: 0.5,
  },

  year: {
    fill: theme.palette.common.primaryText,
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.62,
  },

  text: {
    fill: theme.palette.common.primaryText,
  },

  values: {
    fontSize: 8,
    fontFamily: theme.typography.lightFontFamily,
    fill: theme.palette.common.primaryText,
    lineHeight: '9.37px',
    letterSpacing: 0.53,
  },
  unitRulerBg: {
    fontSize: 6,
    fontFamily: theme.typography.lightFontFamily,
    letterSpacing: 0.4,
  },
  unitRulerSm: {
    fontSize: 4,
    fontFamily: theme.typography.lightFontFamily,
    letterSpacing: 0.27,
  },
}))

const OutlookGraph = ({
  data = {},
  years = [],
  title = null,
  suffix = '%',
  toFixed = 1,
  outterCircleRadius = 6,
  innerCircleRadius = 3,
  strokeWidth = 0.5,
  height = 130,
  width = 295,
}) => {
  const classes = useStyles()

  let min = Math.min(...data.data.map(each => Math.min(...each.values)))
  let max = Math.max(...data.data.map(each => Math.max(...each.values)))

  min = Math.floor(min) - 1
  max = Math.ceil(max) + 1

  const startXOffset = 45
  const startYOffset = 15
  const getXPos = idx => startXOffset + 20 + ((width - startXOffset - 20) * idx) / years.length
  // Ruler's marks
  const getGraph = idx => {
    let eachHeight = (height - startYOffset - 2) / data.data.length
    const getYPos = point => ((eachHeight - 6) / (max - min)) * (point - min) + startYOffset + idx * eachHeight + 3

    let chartMarks = []
    let ruler_lg = false
    for (let point = min; point <= max; point += (max - min) / 5) {
      ruler_lg = !ruler_lg
      chartMarks.push(
        <g key={`${idx}-${point}`} style={{ display: 'flex', flexDirection: 'flex-end' }}>
          <text
            x={startXOffset + 13}
            y={getYPos(point) + (ruler_lg ? 3 : 1)}
            fill="white"
            className={clsx({
              [classes.unitRulerBg]: ruler_lg,
              [classes.unitRulerSm]: !ruler_lg,
            })}
            textAnchor="end"
          >
            {point.toFixed(toFixed)}
            {suffix}
          </text>
          <path
            key={`number-${point}-${idx}`}
            className={classes.path}
            d={`M ${startXOffset + 20} ${getYPos(point)}, L ${startXOffset + 15} ${getYPos(point)}`}
            strokeWidth={strokeWidth}
          />
        </g>
      )
    }
    chartMarks.push(
      <path
        key={`VerticalPath-${idx}-last`}
        strokeWidth={strokeWidth}
        className={classes.path}
        d={`M ${width} ${startYOffset + idx * eachHeight} ${width} ${startYOffset + (idx + 1) * eachHeight}`}
      ></path>
    )

    years.map((each, key) => {
      chartMarks.push(
        <path
          key={`VerticalPath-${idx}-${key}`}
          strokeWidth={strokeWidth}
          className={classes.path}
          d={`M ${getXPos(key)} ${startYOffset + idx * eachHeight} ${getXPos(key)} ${
            startYOffset + (idx + 1) * eachHeight
          }`}
        ></path>
      )
    })

    if (idx === data.data.length - 1)
      chartMarks.push(
        <path
          key={`Horizontal-${idx}-first`}
          strokeWidth={strokeWidth}
          className={classes.path}
          d={`M ${startXOffset + 20} ${height - 2} ${width} ${height - 2}`}
        ></path>
      )

    chartMarks.push(
      <path
        key={`Horizontal-${idx}`}
        strokeWidth={strokeWidth}
        className={classes.path}
        d={`M ${startXOffset + 20} ${startYOffset + idx * eachHeight} ${width} ${startYOffset + idx * eachHeight}`}
      ></path>
    )

    data.data[idx].values.map((value, idx_val) => {
      chartMarks.push(
        <g key={`valuePaths-${idx}-${idx_val}`}>
          {idx_val !== 0 && (
            <path
              d={`M ${getXPos(idx_val) + 37} ${getYPos(value)}, L ${getXPos(idx_val - 1) + 37} ${getYPos(
                data.data[idx].values[idx_val - 1]
              )} `}
              strokeWidth={strokeWidth}
              className={clsx(classes.path, {
                [classes.blue]: data.color === 'blue',
                [classes.cyan]: data.color === 'cyan',
                [classes.secondaryBlue]: data.color === 'secondaryBlue',
                [classes.green]: data.color === 'green',
              })}
            ></path>
          )}
          <circle
            className={clsx(classes.outerCircle, {
              [classes.blue]: data.color === 'blue',
              [classes.cyan]: data.color === 'cyan',
              [classes.secondaryBlue]: data.color === 'secondaryBlue',
              [classes.green]: data.color === 'green',
            })}
            cx={getXPos(idx_val) + 37}
            cy={getYPos(value)}
            r={outterCircleRadius}
          ></circle>
          <circle
            className={clsx({
              [classes.blue]: data.color === 'blue',
              [classes.cyan]: data.color === 'cyan',
              [classes.secondaryBlue]: data.color === 'secondaryBlue',
              [classes.green]: data.color === 'green',
            })}
            cx={getXPos(idx_val) + 37}
            cy={getYPos(value)}
            r={innerCircleRadius}
          ></circle>

          <text className={classes.values} x={getXPos(idx_val) + 30} y={getYPos(value) + 17}>
            {value}
            {suffix}
          </text>
        </g>
      )
    })
    return chartMarks
  }

  return (
    <div className={classes.root} style={{ width: width, height: height }}>
      <div className={classes.titleWrapper}>
        <div
          className={clsx(classes.title, {
            [classes.blue]: data.color === 'blue',
            [classes.cyan]: data.color === 'cyan',
            [classes.secondaryBlue]: data.color === 'secondaryBlue',
            [classes.green]: data.color === 'green',
          })}
          style={{ marginLeft: data.title === 'Unemployment' ? -17 : 0 }}
        >
          {data.title}
        </div>
        {data.data.map((each, idx) => (
          <div className={classes.subTitle} key={idx}>
            {each.subTitle}
          </div>
        ))}
      </div>

      <svg
        height={height}
        viewBox={`42 0 ${width - 42} ${height}`}
        width={width - 42}
        xmlns="http://www.w3.org/2000/svg"
      >
        {years.map((each, idx) => (
          <text key={idx} className={classes.year} x={getXPos(idx) + 23} y={10}>
            {each}
          </text>
        ))}
        {data.data.map((each, idx) => {
          return <g key={idx}>{getGraph(idx)}</g>
        })}
      </svg>
    </div>
  )
}

export default OutlookGraph
