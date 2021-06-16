import { makeStyles } from '@material-ui/core/styles'
import { threeDots, toMillion } from 'helpers/helpers'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    letterSpacing: 0.67,
    lineHeight: '9.39px',
  },
  lines: {
    position: 'absolute',
  },
  title: {
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.primaryText,
  },
  whiteTitle: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    width: '26%',
    marginRight: '4%',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    width: 'inherit',
  },
  year: {
    fontFamily: theme.typography.thinFontFamily,
    color: theme.palette.common.primaryText,
    display: 'flex',
    justifyContent: 'center',
  },
  underline: {
    position: 'absolute',
    bottom: 10,
  },
  linePath: {
    stroke: theme.palette.common.primaryText,
    fill: 'transparent',
  },
}))

const OneLineTableChart = ({
  style = {},
  data = {},
  width = 545,
  height = 27,
  showYear = false,
  fontSize = 8,
  years = [],
  strokeWidth = 0.3,

  titleTextAlign = 'right',
  titleWidth = 0.25,
  marginTitle = null,
  yearPosition = 0,
}) => {
  const classes = useStyles()

  const graphWidth = (1 - titleWidth) * width - marginTitle

  return (
    <div style={{ ...style, width: width, position: 'relative', overflow: 'initial' }}>
      {showYear ? (
        <div className={classes.root} style={{ fontSize: fontSize }}>
          <div className={classes.content} style={{ marginLeft: width - graphWidth, marginBottom: yearPosition }}>
            {years.map((each, idx) => {
              return (
                <div className={classes.year} key={idx} style={{ width: graphWidth / years.length }}>
                  {each}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* draw vertical lines */}
      <svg
        className={classes.lines}
        style={{ marginLeft: width - graphWidth }}
        width={width}
        height={height + (showYear ? yearPosition + fontSize - 3 : 0)}
        viewBox={`
          ${width - graphWidth}
          ${showYear ? yearPosition : 0}
          ${width}
          ${height + (showYear ? yearPosition + fontSize - 3 : 0)}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {years.map((each, idx) => {
          return (
            <g key={idx}>
              <path
                className={classes.linePath}
                d={`M ${(graphWidth / years.length) * idx + (width - graphWidth) + 5}, ${
                  showYear ? yearPosition : 0
                } L ${(graphWidth / years.length) * idx + (width - graphWidth) + 5} ${
                  height + (showYear ? yearPosition + fontSize - 3 : 0)
                }`}
                strokeWidth={strokeWidth}
              />

              <text
                style={{ fill: 'white' }}
                x={(graphWidth / years.length) * idx + width - graphWidth + 6}
                y={15 + (showYear ? yearPosition + fontSize - 3 : 0)}
              >
                {data.unit === 'm' ? threeDots(toMillion(data.marks[idx]).toFixed(0)) + 'm' : data.marks[idx] + '%'}
              </text>

              {idx === years.length - 1 && (
                <path
                  className={classes.linePath}
                  key={idx + 1}
                  d={`M ${width - strokeWidth}, ${showYear ? yearPosition : 0} L ${width - strokeWidth} ${
                    height + (showYear ? yearPosition + fontSize - 3 : 0)
                  }`}
                  strokeWidth={strokeWidth}
                />
              )}
            </g>
          )
        })}
      </svg>

      {showYear && <div style={{ height: yearPosition }}></div>}
      <div className={classes.root} style={{ fontSize: fontSize, height: height }}>
        <div
          className={data.color ? classes.whiteTitle : classes.title}
          style={{
            marginBottom: data.title.length > 30 && -12,
            width: `${titleWidth * 100}%`,
            // marginRight: '5%',
            marginRight: marginTitle ? marginTitle : '5%',
            textAlign: titleTextAlign,
          }}
        >
          {data.title}
        </div>
      </div>
      <svg
        className={classes.underline}
        style={{ marginLeft: titleWidth * width + marginTitle }}
        height={strokeWidth * 2}
        width={`${graphWidth}`}
        viewBox={`0 0 ${graphWidth} ${strokeWidth * 2}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path
          className={classes.linePath}
          d={`M ${0}, ${strokeWidth} L ${width}, ${strokeWidth}`}
          strokeWidth={strokeWidth * 2}
        />
      </svg>
    </div>
  )
}

export default OneLineTableChart
