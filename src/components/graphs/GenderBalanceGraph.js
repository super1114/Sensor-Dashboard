import { makeStyles } from '@material-ui/core/styles'
import { RedoOutlined } from '@material-ui/icons'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  path: {
    strokeWidth: 0.5,
    stroke: theme.palette.common.primaryText,
  },
  text: {
    fontSize: 6,
    letterSpacing: 0.4,
    fill: theme.palette.common.primaryText,
    fontFamily: theme.typography.mediumFontFamily,
  },
  valueText: {
    fontSize: 4,
    letterSpacing: 0.27,
    fill: theme.palette.common.primaryText,
    fontFamily: theme.typography.mediumFontFamily,
  },
  cyan: {
    fill: theme.palette.common.primaryCyan,
  },

  blueBg: {
    stopColor: `${theme.palette.common.primaryBlue}; stop-opacity:1`,
  },
  darkBlueBg: {
    stopColor: `${theme.palette.common.thirdBlue}; stop-opacity:0`,
  },
  cyanBg: {
    stopColor: `${theme.palette.common.primaryCyan}; stop-opacity:1`,
  },
  darkCyanBg: {
    stopColor: `${theme.palette.common.primaryCyan}; stop-opacity:0`,
  },

  outlineCyan: {
    strokeLinecap: 'round',
    srokeWidth: 1,
    strokeImage: `linearGradient(to bottom,  ${theme.palette.common.primaryCyan}, rgba(0, 0, 0, 0)) 1 100%`,
  },

  genderContainer: {
    fill: `rgba(0, 246, 185, 0.2);`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  fontLight: {
    fontFamily: theme.typography.lightFontFamily,
  },
  avgLine: {
    stroke: theme.palette.common.secondaryBlue,
    strokeWidth: 0.7,
    strokeDasharray: 2,
  },
  avgText: {
    fontSize: 6,
    letterSpacing: 0.4,
    lightFontFamily: theme.typography.lightFontFamily,
    fill: theme.palette.common.primaryText,
  },
  legislativeLine: {
    stroke: theme.palette.common.primaryRed,
  },
}))

const GenderBalanceGraph = ({ data = {}, height = 400, width = 300 }) => {
  const classes = useStyles()

  const startXOffset = 25
  const endYOffset = 10

  const eachWidth = (width - startXOffset) / data.length
  const graphWidth = eachWidth - 2

  const getYPos = value => ((height - endYOffset - 2) / 100) * (100 - value)
  const getXPos = idx => startXOffset + eachWidth * idx

  const rulers = []
  let max = Math.max(...data.map(each => each.value.percentage))
  let avg = 0
  data.forEach(each => {
    avg += each.value.percentage
  })
  avg /= data.length

  rulers.push(
    <g key={`horizontal-vertical-line`}>
      <line className={classes.path} x1={startXOffset} y1={0} x2={startXOffset} y2={height - endYOffset - 2}></line>
      <line
        className={classes.path}
        x1={startXOffset}
        y1={height - endYOffset}
        x2={width}
        y2={height - endYOffset}
      ></line>
    </g>
  )

  for (let i = 0; i <= 5; i++)
    rulers.push(
      <g key={`vertical-ruler-${i}`}>
        <line
          className={classes.path}
          x1={startXOffset}
          y1={getYPos(i * 20)}
          x2={startXOffset - 5}
          y2={getYPos(i * 20)}
        ></line>
        <text className={classes.text} style={{ textAlign: 'right' }} x={0} y={getYPos(i * 20) + 2}>
          {i * 20}%
        </text>
      </g>
    )

  data.map((each, idx) => {
    rulers.push(
      <g key={`bottom-ruler-${idx}`}>
        <text
          className={clsx(classes.text, {
            [classes.cyan]: each.color === 'cyan',
          })}
          style={{ textAlign: 'right' }}
          x={getXPos(idx) + 5}
          y={height}
        >
          {each.title}
        </text>
      </g>
    )
  })

  return (
    <div className={classes.root} style={{ width: width, height: height, overflow: 'initial' }}>
      <svg
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'initial' }}
      >
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className={classes.blueBg} />
            <stop offset="100%" className={classes.darkBlueBg} />
          </linearGradient>

          <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className={classes.cyanBg} />
            <stop offset="100%" className={classes.darkCyanBg} />
          </linearGradient>
        </defs>
        {rulers}
        {data.map((each, idx) => {
          if (each.value && each.value.percentage)
            return (
              <g key={idx}>
                {each.outline === 'cyan' ? (
                  <g>
                    <rect
                      fill={'url(#blueGradient)'}
                      x={getXPos(idx) + 3}
                      y={getYPos(each.value.percentage)}
                      stroke={'url(#cyanGradient)'}
                      rx={5}
                      ry={5}
                      width={graphWidth - 2}
                      height={getYPos(0) - getYPos(each.value.percentage)}
                    />
                  </g>
                ) : (
                  <rect
                    fill={each.color === 'blue' ? 'url(#blueGradient)' : 'url(#cyanGradient)'}
                    x={getXPos(idx) + 2}
                    y={getYPos(each.value.percentage)}
                    rx={5}
                    ry={5}
                    width={graphWidth}
                    height={getYPos(0) - getYPos(each.value.percentage)}
                  />
                )}
                <text
                  className={clsx(classes.valueText, {
                    [classes.cyan]: each.color === 'cyan',
                  })}
                  x={getXPos(idx) + 4}
                  y={getYPos(each.value.percentage) - 5}
                >
                  {each.value.percentage}%
                </text>
                {each.value.legislative !== null && (
                  <line
                    x1={getXPos(idx) + 3}
                    y1={getYPos(each.value.legislative)}
                    x2={getXPos(idx) + eachWidth - 1}
                    y2={getYPos(each.value.legislative)}
                    strokeWidth={1}
                    className={classes.legislativeLine}
                  ></line>
                )}
              </g>
            )
        })}

        <rect
          className={classes.genderContainer}
          x={startXOffset}
          y={getYPos(Math.ceil(max / 20) * 20)}
          width={width - startXOffset}
          height={(height - endYOffset) / 5}
        ></rect>
        <text className={classes.text} x={185} y={getYPos(Math.ceil(max / 20) * 20) + 18}>
          Gender balance zone
        </text>
        <text className={clsx(classes.text, classes.fontLight)} x={175} y={getYPos(Math.ceil(max / 20) * 20) + 26}>
          (at least {Math.floor(max / 20) * 20}% of each gender)
        </text>

        <line
          x1={startXOffset + 5}
          y1={getYPos(avg)}
          x2={width - 1}
          y2={getYPos(avg)}
          className={classes.avgLine}
        ></line>
        <text className={classes.avgText} x={width - 40} y={getYPos(avg) - 5}>
          EU {Math.ceil(avg)} - {Math.floor(avg)}%
        </text>
      </svg>
    </div>
  )
}

export default GenderBalanceGraph
