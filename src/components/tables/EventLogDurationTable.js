import { makeStyles } from '@material-ui/core/styles'

import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  bodyWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'initial',
    position: 'relative',
    paddingRight: 2,
  },
  titleWrapper: {
    width: 130,
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: 7,
  },
  mainTitle: {
    fontSize: 8,
    letterSpacing: 0.67,
    fontFamily: theme.typography.mediumFontFamily,
    lineHeight: '9.38px',
  },
  subTitle: {
    width: '100%',
    fontSize: 8,
    height: 26,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'right',
    justifyContent: 'flex-end',
    fontFamily: theme.typography.lightFontFamily,
    letterSpacing: 0.67,
    lineHeight: '9.38px',
    color: theme.palette.common.primaryText,
  },
  year: {
    fontSize: 8,
    fontFamily: theme.typography.thinFontFamily,
    letterSpacing: 0.67,
    lineHeight: '9.38px',
    fill: theme.palette.common.primaryText,
  },
  svg: {
    overflow: 'initial',
  },
  svgLine: {
    strokeWidth: 0.3,
    stroke: theme.palette.common.primaryText,
    overflow: 'initial',
  },

  redOutterCircle: {
    fill: 'rgba(246, 92, 107, 0.5)',
  },
  greenOutterCircle: {
    fill: 'rgba(152, 210, 101, 0.5)',
    opacity: 0.5,
  },
  redInnerCircle: {
    fill: theme.palette.common.primaryRed,
  },
  greenInnerCircle: {
    fill: theme.palette.common.secondaryGreen,
  },
  whiteInnerCircle: {
    fill: theme.palette.common.primaryText,
  },
  companyLine: {
    stroke: theme.palette.common.thirdBlue,
  },
  marketLine: {
    stroke: theme.palette.common.thirdBlue,
    strokeDasharray: [4, 1],
  },
}))

const EventLogDurationTable = ({
  style = {},
  data = {},
  years = {},
  width = 255,
  height = 185,
  titleWidth = 130,
  marginTitle = 11,
}) => {
  const classes = useStyles()

  let graphWidth = 420
  let graphHeight = height
  let eachHeight = 26
  let eachWidth = 42
  const getXPos = value => value * eachWidth
  const getYPos = idx => idx * eachHeight + 11

  const rulers = []

  data.data.map((each, idx) => {
    if (idx === data.data.length - 1)
      rulers.push(
        <line
          key={`horizontal-${idx + 1}`}
          className={classes.svgLine}
          x1={0}
          y1={getYPos(idx + 1)}
          x2={graphWidth}
          y2={getYPos(idx + 1)}
        ></line>
      )
    rulers.push(
      <line
        key={`horizontal-${idx}`}
        className={classes.svgLine}
        x1={0}
        y1={getYPos(idx)}
        x2={graphWidth}
        y2={getYPos(idx)}
      ></line>
    )
  })
  years.map((each, idx) => {
    rulers.push(
      <g key={`vertical-${idx}`}>
        {idx === years.length - 1 && (
          <line className={classes.svgLine} x1={getXPos(idx + 1)} y1={3} x2={getXPos(idx + 1)} y2={height}></line>
        )}
        <line className={classes.svgLine} x1={getXPos(idx)} y1={3} x2={getXPos(idx)} y2={height}></line>
      </g>
    )
  })

  return (
    <div className={classes.bodyWrapper}>
      <div className={classes.titleWrapper} style={{ zIndex: 100, marginRight: marginTitle }}>
        <div className={classes.mainTitle}>{data.title}</div>
        <div style={{ height: 3 }}></div>
        {data.data.map((each, idx) => {
          return (
            <div className={classes.subTitle} key={idx}>
              {each.title}
            </div>
          )
        })}
      </div>

      <svg
        className={classes.svg}
        width={graphWidth}
        height={graphHeight}
        viewBox={`0 0 ${graphWidth} ${graphHeight}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {rulers}
        {data.data.map((each, idx) => {
          if (each.start === null && each.end === null) return null
          return (
            <g key={idx}>
              <line
                className={classes.companyLine}
                x1={getXPos((10 * each.start) / 120)}
                y1={getYPos(idx) + eachHeight / 2}
                x2={getXPos((10 * each.end) / 120)}
                y2={getYPos(idx) + eachHeight / 2}
                strokeWidth={1}
              ></line>
              {each.start !== 0 && (
                <g>
                  <circle
                    cx={getXPos((10 * each.start) / 120)}
                    cy={getYPos(idx) + eachHeight / 2}
                    className={classes.greenOutterCircle}
                    r={4.5}
                  ></circle>
                  <circle
                    cx={getXPos((10 * each.start) / 120)}
                    cy={getYPos(idx) + eachHeight / 2}
                    className={classes.greenInnerCircle}
                    r={2.5}
                  ></circle>
                </g>
              )}
              {each.end !== 120 && (
                <g>
                  <circle
                    cx={getXPos((10 * each.end) / 120)}
                    cy={getYPos(idx) + eachHeight / 2}
                    className={classes.redOutterCircle}
                    r={4.5}
                  ></circle>
                  <circle
                    cx={getXPos((10 * each.end) / 120)}
                    cy={getYPos(idx) + eachHeight / 2}
                    className={classes.redInnerCircle}
                    r={2.5}
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

export default EventLogDurationTable
