import { makeStyles } from '@material-ui/core/styles'

import checkSvg from 'assets/icons/checkMark.svg'
import alertRed from 'assets/icons/alertRed.svg'

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

  value: {
    fill: theme.palette.common.primaryCyan,
    fontSize: 8,
    letterSpacing: 0.67,
    fontFamily: theme.typography.mediumFontFamily,
  },
}))

const EventLogCheckTable = ({
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
          return years.map((itm, index) => {
            let item = each.data[index]
            if (item.check === null) return null
            return (
              <g key={`cell-${idx}-${index}`}>
                {item.check === 'checked' ? (
                  <image href={checkSvg} x={getXPos(index) + 3.5} y={getYPos(idx) + 5} width={15} height={15} />
                ) : (
                  <image href={alertRed} x={getXPos(index) + 3.5} y={getYPos(idx) + 6} width={14} height={14} />
                )}

                <text className={classes.value} x={getXPos(index) + 22} y={getYPos(idx) + 16} strokeWidth={1}>
                  {item.percentage}%
                </text>
              </g>
            )
          })
        })}
      </svg>
    </div>
  )
}

export default EventLogCheckTable
