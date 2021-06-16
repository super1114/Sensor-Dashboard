import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 8,
    padding: 5,
    letterSpacing: 1.5,
    WebkitTextSizeAdjust: 'none',
    height: '100%',
    overflow: 'initial',
  },
  title: {
    display: 'flex',
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 10,
    letterSpacing: 0.83,
    lineHeight: '12px',
    width: 120,
    overflow: 'initial',
  },
  bodyWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'initial',
    marginTop: -10,
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
    marginTop: 8,
  },
  subTitle: {
    width: '100%',
    fontSize: 8,
    height: 29,
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: -3,
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

const Widget82 = ({ topic = 'topic-82', style = {}, width = 255, height = 185 }) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) {
    return ''
  }

  let graphWidth = 420
  let graphHeight = 130
  let eachHeight = 26
  let eachWidth = 42
  const getXPos = value => value * eachWidth
  const getYPos = idx => idx * eachHeight + 34

  const rulers = []

  data.data.map((each, idx) => {
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
  data.years.map((each, idx) => {
    rulers.push(
      <g key={`vertical-${idx}`}>
        {idx === data.years.length - 1 && (
          <line
            className={classes.svgLine}
            x1={getXPos(idx + 1)}
            y1={12}
            x2={getXPos(idx + 1)}
            y2={getYPos(data.data.length - 1)}
          ></line>
        )}
        <line
          className={classes.svgLine}
          x1={getXPos(idx)}
          y1={12}
          x2={getXPos(idx)}
          y2={getYPos(data.data.length - 1)}
        ></line>
        <text className={classes.year} x={getXPos(idx) + 10} y={7}>
          {each}
        </text>
      </g>
    )
  })

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        margin: 0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        borderRadius: 8,
        width: width,
        height: height,
        flexDirection: 'column',
        overflow: 'initial',
      }}
    >
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.bodyWrapper}>
          <div className={classes.titleWrapper} style={{ zIndex: 100 }}>
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
                    y1={getYPos(idx)}
                    x2={getXPos((10 * each.end) / 120)}
                    y2={getYPos(idx)}
                    strokeWidth={1}
                  ></line>
                  {each.start !== 0 && (
                    <g>
                      <circle
                        cx={getXPos((10 * each.start) / 120)}
                        cy={getYPos(idx)}
                        className={classes.greenOutterCircle}
                        r={4.5}
                      ></circle>
                      <circle
                        cx={getXPos((10 * each.start) / 120)}
                        cy={getYPos(idx)}
                        className={classes.greenInnerCircle}
                        r={2.5}
                      ></circle>
                    </g>
                  )}
                  {each.end !== 120 && (
                    <g>
                      <circle
                        cx={getXPos((10 * each.end) / 120)}
                        cy={getYPos(idx)}
                        className={classes.redOutterCircle}
                        r={4.5}
                      ></circle>
                      <circle
                        cx={getXPos((10 * each.end) / 120)}
                        cy={getYPos(idx)}
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
      </div>
    </DashboardCard>
  )
}

export default Widget82
