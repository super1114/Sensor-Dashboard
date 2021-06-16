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
    fontFamily: theme.typography.medium,
    fill: theme.palette.common.primaryText,
    letterSpacing: 1,
  },
  secondaryText: {
    fontFamily: theme.typography.lightFontFamily,
    fill: theme.palette.common.primaryText,
    letterSpacing: 1,
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

const MultiLineGraph = ({
  edgeWidth = 150,
  height = 100,
  outerRadius = 10,
  innerRadius = 5,

  fontSize = 20,
  values = [],
  types = [],
  suffix = null,
  prefix = null,
  labelXPosition = 'bottom',
  fontBold = false,

  strokeWidth = 3,
  strokeType = null,

  noText = null,
  textTopOffset = 5,
}) => {
  const classes = useStyles()

  const maxVal = Math.max(...values.map(each => Math.max(...each)))
  const minVal = Math.min(...values.map(each => Math.min(...each)))

  const getXPos = idx => outerRadius + strokeWidth + edgeWidth * idx
  const getYPos = value => (value ? ((maxVal - value) * (height - fontSize)) / (maxVal - minVal) : null)

  return (
    <div className={classes.root}>
      <svg
        style={{ overflow: 'initial' }}
        height={height + outerRadius * 2 + fontSize * 2}
        viewBox={`-5 0 ${edgeWidth * values.length + outerRadius * 2} ${height}`}
        width={edgeWidth * values.length + outerRadius * 2}
        xmlns="http://www.w3.org/2000/svg"
      >
        {values.map((item, idx) => {
          return item.map((each, index) => {
            return (
              <g key={`linegraph-${idx}-${index}`}>
                {idx > 0 && values[idx - 1][index] !== null && (
                  <line
                    className={clsx(classes.path, {
                      [classes.strokeBlue]: types[index].color === 'blue',
                      [classes.strokeCyan]: types[index].color === 'cyan',
                      [classes.strokeGreen]: types[index].color === 'green',
                      [classes.strokeRed]: types[index].color === 'red',
                    })}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeType && '2,1'}
                    x1={getXPos(idx - 1)}
                    y1={getYPos(values[idx - 1][index])}
                    x2={getXPos(idx)}
                    y2={getYPos(each)}
                  ></line>
                )}

                <circle
                  className={clsx(classes.outerCircle, {
                    [classes.strokeBlue]: types[index].color === 'blue',
                    [classes.strokeCyan]: types[index].color === 'cyan',
                    [classes.strokeGreen]: types[index].color === 'green',
                    [classes.strokeRed]: types[index].color === 'red',
                    [classes.fillBlue]: types[index].color === 'blue',
                    [classes.fillCyan]: types[index].color === 'cyan',
                    [classes.fillGreen]: types[index].color === 'green',
                    [classes.fillRed]: types[index].color === 'red',
                  })}
                  cx={getXPos(idx)}
                  cy={getYPos(each)}
                  r={outerRadius}
                ></circle>
                <circle
                  className={clsx(classes.innerCircle, {
                    [classes.strokeBlue]: types[index].color === 'blue',
                    [classes.strokeCyan]: types[index].color === 'cyan',
                    [classes.strokeGreen]: types[index].color === 'green',
                    [classes.strokeRed]: types[index].color === 'red',
                    [classes.fillBlue]: types[index].color === 'blue',
                    [classes.fillCyan]: types[index].color === 'cyan',
                    [classes.fillGreen]: types[index].color === 'green',
                    [classes.fillRed]: types[index].color === 'red',
                  })}
                  cx={getXPos(idx)}
                  cy={getYPos(each)}
                  r={innerRadius}
                ></circle>
                {!noText && (
                  <text
                    className={fontBold ? classes.primaryText : classes.secondaryText}
                    x={getXPos(idx) + (labelXPosition === 'center' ? -20 : 0)}
                    y={
                      types[index].yPosition === 'top'
                        ? getYPos(each) + textTopOffset
                        : getYPos(each) - textTopOffset + fontSize / 2
                    }
                    fontSize={fontSize}
                  >
                    {prefix}
                    {each ? each.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
                    {suffix}
                  </text>
                )}
              </g>
            )
          })
        })}
      </svg>
    </div>
  )
}

export default MultiLineGraph
