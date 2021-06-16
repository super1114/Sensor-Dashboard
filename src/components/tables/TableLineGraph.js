import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
  },
  path: {
    stroke: theme.palette.common.primaryBlue,
    fill: 'transparent',
  },
  outerCircle: {
    stroke: theme.palette.common.primaryBlue,
    strokeWidth: 2,
    fill: theme.palette.common.primaryBlue,
    opacity: 0.5,
  },
  innerCircle: {
    fill: theme.palette.common.primaryBlue,
  },
  primaryText: {
    fontFamily: theme.typography.lightFontFamily,
    fill: theme.palette.common.primaryText,
    fontSize: 6,
    lineHeight: '7px',
    letterSpacing: 0.57,
  },

  strokeWhite: {
    stroke: theme.palette.common.primaryText,
  },
  strokeBlue: {
    stroke: theme.palette.common.primaryBlue,
  },
  strokeCyan: {
    stroke: theme.palette.common.primaryCyan,
  },
  strokeGreen: {
    stroke: theme.palette.common.secondaryGreen,
  },
  strokeRed: {
    stroke: theme.palette.common.primaryRed,
  },
  fillBlue: {
    fill: theme.palette.common.primaryBlue,
  },
  fillCyan: {
    fill: theme.palette.common.primaryCyan,
  },
  fillGreen: {
    fill: theme.palette.common.secondaryGreen,
  },
  fillRed: {
    fill: theme.palette.common.primaryRed,
  },
}))

const TableLineGraph = ({
  width = 240,
  height = 100,
  outerRadius = 2.5,
  innerRadius = 1.5,

  fontSize = 6,
  data = {},

  suffix = null,
  prefix = null,
  labelYPosition = 'bottom',
  labelXPosition = 'center',
  fontBold = false,

  strokeWidth = 3,
  strokeColor = 'blue',
  strokeType = null,

  noText = null,
}) => {
  const classes = useStyles()
  if (!data || !data.data) return null

  const maxVal = Math.max(...data.data.map(each => Math.max(...each.data)))
  const minVal = Math.min(...data.data.map(each => Math.min(...each.data)))

  const startXOffset = 25
  const endYOffset = 18
  const eachWidth = (width - startXOffset) / data.names.length

  const getXPos = x => ((width - startXOffset) * x) / data.names.length + startXOffset + eachWidth / 2 - fontSize / 3
  const getYPos = y => ((height - endYOffset) * (maxVal - y)) / (maxVal - minVal)

  const rulers = []
  for (let i = 0; i < 8; i++) {
    let value = maxVal - ((maxVal - minVal) / 7) * i
    rulers.push(
      <path
        key={`vertical-Ruler-${i}`}
        className={classes.strokeWhite}
        d={`M ${startXOffset - 5} ${getYPos(value)}, L ${startXOffset} ${getYPos(value)}`}
        strokeWidth={strokeWidth}
      ></path>
    )

    rulers.push(
      <text key={`vertical-text-${i}`} className={classes.primaryText} x={0} y={getYPos(value) + 2} fontSize={fontSize}>
        {(maxVal - ((maxVal - minVal) * i) / 7).toFixed(2)}%
      </text>
    )
  }

  for (let i = 0; i <= data.names.length; i++) {
    rulers.push(
      <path
        key={`horizontal-ruler-${i}`}
        className={classes.strokeWhite}
        d={`M ${getXPos(i) - eachWidth / 2 + fontSize / 3} ${height - endYOffset}, L ${
          getXPos(i) - eachWidth / 2 + fontSize / 3
        } ${height - endYOffset + 5}`}
        strokeWidth={strokeWidth}
      ></path>
    )

    if (i !== data.names.length)
      rulers.push(
        <text
          key={`horizontal-text-${i}`}
          fontSize={fontSize}
          className={classes.primaryText}
          x={getXPos(i)}
          y={height - 10}
        >
          {data.names[i]}
        </text>
      )
  }

  rulers.push(
    <path
      key="vertical-rulebar"
      className={classes.strokeWhite}
      d={`M ${startXOffset} 0, L ${startXOffset} ${height - endYOffset}`}
      strokeWidth={strokeWidth}
    ></path>
  )
  rulers.push(
    <path
      key="horizontal-rulebar"
      className={classes.strokeWhite}
      d={`M ${startXOffset} ${height - endYOffset}, L ${width} ${height - endYOffset}`}
      strokeWidth={strokeWidth}
    ></path>
  )

  return (
    <div className={classes.root}>
      <svg
        style={{ overflow: 'initial' }}
        height={height}
        viewBox={`-5 0 ${width} ${height}`}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
      >
        {rulers}
        {data.names.map((item, i) => {
          return data.data.map((each, idx) => {
            if (!each.data[i]) return null
            return (
              <g key={`${i}-${idx}`}>
                {i !== data.names.length && each.data[i - 1] && (
                  <path
                    className={clsx(classes.strokeWhite, {
                      [classes.strokeBlue]: each.color === 'blue',
                      [classes.strokeCyan]: each.color === 'cyan',
                      [classes.strokeGreen]: each.color === 'green',
                      [classes.strokeRed]: each.color === 'red',
                    })}
                    d={`M ${getXPos(i - 1)} ${getYPos(each.data[i - 1])}, L ${getXPos(i)} ${getYPos(each.data[i])}`}
                    strokeWidth={strokeWidth}
                  ></path>
                )}
                <circle
                  className={clsx(classes.outerCircle, {
                    [classes.strokeBlue]: each.color === 'blue',
                    [classes.strokeCyan]: each.color === 'cyan',
                    [classes.strokeGreen]: each.color === 'green',
                    [classes.strokeRed]: each.color === 'red',
                    [classes.fillBlue]: each.color === 'blue',
                    [classes.fillCyan]: each.color === 'cyan',
                    [classes.fillGreen]: each.color === 'green',
                    [classes.fillRed]: each.color === 'red',
                  })}
                  cx={getXPos(i)}
                  cy={getYPos(each.data[i])}
                  r={outerRadius}
                ></circle>
                <circle
                  className={clsx(classes.innerCircle, {
                    [classes.strokeBlue]: each.color === 'blue',
                    [classes.strokeCyan]: each.color === 'cyan',
                    [classes.strokeGreen]: each.color === 'green',
                    [classes.strokeRed]: each.color === 'red',
                    [classes.fillBlue]: each.color === 'blue',
                    [classes.fillCyan]: each.color === 'cyan',
                    [classes.fillGreen]: each.color === 'green',
                    [classes.fillRed]: each.color === 'red',
                  })}
                  cx={getXPos(i)}
                  cy={getYPos(each.data[i])}
                  r={innerRadius}
                ></circle>
              </g>
            )
          })
        })}
      </svg>
    </div>
  )
}

export default TableLineGraph
