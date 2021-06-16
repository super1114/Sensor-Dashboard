import { makeStyles } from '@material-ui/core/styles'
import AnnualTakePart from 'components/extra_widgets/AnnualTakePart'
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

  yearText: {
    fontSize: 5,
    lineHeight: '5.86px',
    letterSpacing: 0.42,
    fill: theme.palette.common.primaryText,
  },
}))

const ShareHolderRankingGraph = ({
  width = 240,
  height = 100,
  outerRadius = 2.5,
  innerRadius = 1.5,

  fontSize = 6,
  data = {},

  strokeWidth = 0.5,
  strokeColor = 'blue',
  strokeType = null,
}) => {
  const classes = useStyles()

  const maxVal = 5
  const minVal = 1

  const startXOffset = 0
  const endYOffset = 10
  const eachWidth = width / data.years.length

  const getXPos = x => ((width - startXOffset) * x) / data.years.length + startXOffset + eachWidth / 2
  const getYPos = y => ((height - endYOffset - 40) * (y - minVal)) / 5 + 5

  const rulers = []
  for (let i = 0; i < maxVal; i++) {
    let value = i + 1
    rulers.push(
      <path
        key={`vertical-Ruler-${i}`}
        className={classes.strokeWhite}
        d={`M ${startXOffset - maxVal} ${getYPos(value)}, L ${startXOffset} ${getYPos(value)}`}
        strokeWidth={strokeWidth}
      ></path>
    )

    rulers.push(
      <text
        key={`vertical-text-${i}`}
        className={classes.primaryText}
        x={-8}
        y={getYPos(value) + 3}
        fontSize={fontSize}
      >
        {value}
      </text>
    )
  }

  for (let i = 0; i <= data.years.length; i++) {
    if (i !== 0)
      rulers.push(
        <path
          key={`horizontal-ruler-${i}`}
          className={classes.strokeWhite}
          d={`M ${getXPos(i) - eachWidth / 2} ${height - 50}, 
          L ${getXPos(i) - eachWidth / 2} ${height - 45}`}
          strokeWidth={strokeWidth}
        ></path>
      )

    if (i !== data.years.length)
      rulers.push(
        <text
          key={`horizontal-text-${i}`}
          fontSize={fontSize}
          className={classes.yearText}
          x={getXPos(i) - eachWidth / 2 + fontSize / 3}
          y={height - 42}
        >
          {data.years[i]}
        </text>
      )
  }

  rulers.push(
    <path
      key="vertical-rulebar"
      className={classes.strokeWhite}
      d={`M ${startXOffset} 0, L ${startXOffset} ${height - 50}`}
      strokeWidth={strokeWidth}
    ></path>
  )
  rulers.push(
    <path
      key="horizontal-rulebar"
      className={classes.strokeWhite}
      d={`M ${startXOffset} ${height - 50}, L ${width} ${height - 50}`}
      strokeWidth={strokeWidth}
    ></path>
  )

  return (
    <div className={classes.root}>
      <AnnualTakePart data={data} width={width} height={34} />
      <div style={{ height: 20 }}></div>
      <svg
        style={{ overflow: 'initial' }}
        height={height - 40}
        viewBox={`0 0 ${width} ${height - 40}`}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
      >
        {rulers}
        {data.rankHistory.map((each, idx) => {
          if (each === null) return null
          return (
            <g key={`${idx}`}>
              {idx > 0 && data.rankHistory[idx - 1] && (
                <path
                  className={clsx(classes.strokeWhite, {
                    [classes.strokeBlue]: data.color === 'blue',
                    [classes.strokeCyan]: data.color === 'cyan',
                    [classes.strokeGreen]: data.color === 'green',
                    [classes.strokeRed]: data.color === 'red',
                  })}
                  d={`M ${getXPos(idx - 1)} ${getYPos(data.rankHistory[idx - 1])}, L ${getXPos(idx)} ${getYPos(each)}`}
                  strokeWidth={strokeWidth}
                ></path>
              )}
              <circle
                className={clsx(classes.outerCircle, {
                  [classes.strokeBlue]: data.color === 'blue',
                  [classes.strokeCyan]: data.color === 'cyan',
                  [classes.strokeGreen]: data.color === 'green',
                  [classes.strokeRed]: data.color === 'red',
                  [classes.fillBlue]: data.color === 'blue',
                  [classes.fillCyan]: data.color === 'cyan',
                  [classes.fillGreen]: data.color === 'green',
                  [classes.fillRed]: data.color === 'red',
                })}
                cx={getXPos(idx)}
                cy={getYPos(each)}
                r={outerRadius}
              ></circle>
              <circle
                className={clsx(classes.innerCircle, {
                  [classes.strokeBlue]: data.color === 'blue',
                  [classes.strokeCyan]: data.color === 'cyan',
                  [classes.strokeGreen]: data.color === 'green',
                  [classes.strokeRed]: data.color === 'red',
                  [classes.fillBlue]: data.color === 'blue',
                  [classes.fillCyan]: data.color === 'cyan',
                  [classes.fillGreen]: data.color === 'green',
                  [classes.fillRed]: data.color === 'red',
                })}
                cx={getXPos(idx)}
                cy={getYPos(each)}
                r={innerRadius}
              ></circle>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default ShareHolderRankingGraph
