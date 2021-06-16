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
    letterSpacing: 1,
  },
  secondaryText: {
    fontFamily: theme.typography.ultralightFontFamily,
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

const LineGraph = ({
  edgeWidth = 150,
  height = 100,
  outerRadius = 10,
  innerRadius = 5,

  fontSize = 20,
  values = [],
  labels = [],
  extraValues = [],
  extraCircle = false,
  extraStrokeColor = 'blue',
  suffix = null,
  prefix = null,
  labelYPosition = 'bottom',
  labelXPosition = 'bottom',
  fontBold = false,

  strokeWidth = 3,
  strokeColor = 'blue',
  strokeType = null,

  noText = null,

  unit = null,
}) => {
  const classes = useStyles()

  let maxVal = Math.max(...values, ...extraValues)
  let minVal = Math.min(...values, ...extraValues)
  if (unit) {
    maxVal = Math.ceil(maxVal / unit) * unit
    minVal = Math.floor(minVal / unit) * unit
  }
  const relVals = values.map(value => (value ? ((maxVal - value) * (height - fontSize)) / (maxVal - minVal) : null))

  let graphPath = []
  const paths = relVals.reduce((prev, cur, idx) => {
    if (cur === null) return ''
    if (prev.length === 0) {
      return `M ${outerRadius + strokeWidth},${cur + (labelYPosition === 'top' ? 15 : 0)}`
    }

    return `${prev} L ${outerRadius + strokeWidth + edgeWidth * idx},${cur + (labelYPosition === 'top' ? 15 : 0)}`
  }, '')

  let refExtraValues = extraValues.map(value => ((maxVal - value) * (height - fontSize)) / (maxVal - minVal))
  const extraPaths = refExtraValues.reduce((prev, cur, idx) => {
    if (cur === null) return ''
    if (prev.length === 0) {
      return `M ${outerRadius + strokeWidth},${cur + (labelYPosition === 'top' ? 15 : 0)}`
    }

    return `${prev} L ${outerRadius + strokeWidth + edgeWidth * idx},${cur + (labelYPosition === 'top' ? 15 : 0)}`
  }, '')

  return (
    <div className={classes.root}>
      <svg
        style={{ overflow: 'initial' }}
        height={height + outerRadius * 2 + fontSize * 2}
        viewBox={`-5 0 ${edgeWidth * values.length + outerRadius * 2} ${height}`}
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        {relVals.map((val, idx) => {
          const x = outerRadius + strokeWidth + edgeWidth * idx
          const xPrev = outerRadius + strokeWidth + edgeWidth * (idx - 1)
          if (val === null) return null
          return (
            <g key={`circle-${idx}`}>
              {idx > 0 && relVals[idx - 1] !== null && (
                <line
                  className={clsx(classes.path, {
                    [classes.strokeBlue]: strokeColor === 'blue',
                    [classes.strokeCyan]: strokeColor === 'cyan',
                    [classes.strokeGreen]: strokeColor === 'green',
                    [classes.strokeRed]: strokeColor === 'red',
                  })}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeType && '2,1'}
                  x1={xPrev}
                  y1={relVals[idx - 1] + (labelYPosition === 'top' ? 15 : 0)}
                  x2={x}
                  y2={val + (labelYPosition === 'top' ? 15 : 0)}
                ></line>
              )}

              {refExtraValues.length && idx > 0 && relVals[idx - 1] !== null && (
                <line
                  className={clsx(classes.path, {
                    [classes.strokeBlue]: extraStrokeColor === 'blue',
                    [classes.strokeCyan]: extraStrokeColor === 'cyan',
                    [classes.strokeGreen]: extraStrokeColor === 'green',
                    [classes.strokeRed]: extraStrokeColor === 'red',
                  })}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeType && '2,1'}
                  x1={xPrev}
                  y1={refExtraValues[idx - 1] + (labelYPosition === 'top' ? 15 : 0)}
                  x2={x}
                  y2={refExtraValues[idx] + (labelYPosition === 'top' ? 15 : 0)}
                ></line>
              )}

              {extraCircle === true && (
                <g>
                  <circle
                    className={clsx(classes.outerCircle, {
                      [classes.strokeBlue]: extraStrokeColor === 'blue',
                      [classes.strokeCyan]: extraStrokeColor === 'cyan',
                      [classes.strokeGreen]: extraStrokeColor === 'green',
                      [classes.strokeRed]: extraStrokeColor === 'red',
                      [classes.fillBlue]: extraStrokeColor === 'blue',
                      [classes.fillCyan]: extraStrokeColor === 'cyan',
                      [classes.fillGreen]: extraStrokeColor === 'green',
                      [classes.fillRed]: extraStrokeColor === 'red',
                    })}
                    cx={x}
                    cy={refExtraValues[idx] + (labelYPosition === 'top' ? 15 : 0)}
                    r={outerRadius}
                  ></circle>
                  <circle
                    className={clsx(classes.innerCircle, {
                      [classes.strokeBlue]: extraStrokeColor === 'blue',
                      [classes.strokeCyan]: extraStrokeColor === 'cyan',
                      [classes.strokeGreen]: extraStrokeColor === 'green',
                      [classes.strokeRed]: extraStrokeColor === 'red',
                      [classes.fillBlue]: extraStrokeColor === 'blue',
                      [classes.fillCyan]: extraStrokeColor === 'cyan',
                      [classes.fillGreen]: extraStrokeColor === 'green',
                      [classes.fillRed]: extraStrokeColor === 'red',
                    })}
                    cx={x}
                    cy={refExtraValues[idx] + (labelYPosition === 'top' ? 15 : 0)}
                    r={innerRadius}
                  ></circle>
                </g>
              )}

              <circle
                className={clsx(classes.outerCircle, {
                  [classes.strokeBlue]: strokeColor === 'blue',
                  [classes.strokeCyan]: strokeColor === 'cyan',
                  [classes.strokeGreen]: strokeColor === 'green',
                  [classes.strokeRed]: strokeColor === 'red',
                  [classes.fillBlue]: strokeColor === 'blue',
                  [classes.fillCyan]: strokeColor === 'cyan',
                  [classes.fillGreen]: strokeColor === 'green',
                  [classes.fillRed]: strokeColor === 'red',
                })}
                cx={x}
                cy={val + (labelYPosition === 'top' ? 15 : 0)}
                r={outerRadius}
              ></circle>
              <circle
                className={clsx(classes.innerCircle, {
                  [classes.strokeBlue]: strokeColor === 'blue',
                  [classes.strokeCyan]: strokeColor === 'cyan',
                  [classes.strokeGreen]: strokeColor === 'green',
                  [classes.strokeRed]: strokeColor === 'red',
                  [classes.fillBlue]: strokeColor === 'blue',
                  [classes.fillCyan]: strokeColor === 'cyan',
                  [classes.fillGreen]: strokeColor === 'green',
                  [classes.fillRed]: strokeColor === 'red',
                })}
                cx={x}
                cy={val + (labelYPosition === 'top' ? 15 : 0)}
                r={innerRadius}
              ></circle>
              {!noText && (
                <text
                  className={fontBold ? classes.primaryText : classes.secondaryText}
                  x={x + (labelXPosition === 'center' ? -20 : 0)}
                  y={
                    val +
                    outerRadius * 2 +
                    fontSize -
                    (labelYPosition === 'none'
                      ? fontSize
                      : labelYPosition === 'top'
                      ? fontSize > 10
                        ? fontSize * 2
                        : 10
                      : 0)
                  }
                  fontSize={fontSize}
                >
                  {prefix}
                  {values[idx] ? values[idx].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
                  {suffix}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default LineGraph
