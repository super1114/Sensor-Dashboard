import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'

import checkSVG from 'assets/icons/check.svg'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontSize: 8,
    overflow: 'hidden',
    padding: 5,
    WebkitTextSizeAdjust: 'none',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 9,
    lineHeight: '10.55px',
    letterSpacing: 0.75,
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  body: {
    display: 'flex',
    marginTop: 5,
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    textAlign: 'center',
  },

  path: {
    stroke: theme.palette.common.primaryText,
  },
  subTitle: {
    fontFamily: theme.typography.lightFontFamily,
    fill: theme.palette.common.primaryText,
    fontSize: 8.9,
    letterSpacing: 0.74,
    textAnchor: 'end',
  },
  value: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 7,
    letterSpacing: 0.6,
    fill: theme.palette.common.primaryCyan,
  },
  years: {
    position: 'absolute',
    left: 115,
    top: 5,
    fontFamily: theme.typography.thinFontFamily,
    display: 'flex',
  },
  eachYear: {
    width: 37,
    display: 'flex',
    justifyContent: 'center',
  },

  svgIcon: {
    width: 10,
    height: 10,
  },
}))

const Widget61 = ({ style = {}, width = 1173, height = 476, topic = 'topic-61' }) => {
  const { title, data, years } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) {
    return ''
  }

  const startXOffset = 110
  const startYoffest = 0
  const strokeWidth = 0.5
  const svgWidth = startXOffset + 37 * years.length
  const svgHeight = startYoffest + 25 * data.length

  const getXPos = x => startXOffset + x * 37
  const getYPos = y => startYoffest + y * 25

  const rulers = []
  years.forEach((each, idx) => {
    rulers.push(
      <path
        key={`vertical-line-${idx}`}
        d={`M ${getXPos(idx)} 0, L ${getXPos(idx)}, ${height}`}
        strokeWidth={strokeWidth}
        className={classes.path}
      ></path>
    )
  })

  rulers.push(
    <path
      key={`vertical-line-final-${years.length}`}
      d={`M ${getXPos(years.length)} 0, L ${getXPos(years.length)}, ${height}`}
      strokeWidth={strokeWidth}
      className={classes.path}
    ></path>
  )

  data.forEach((each, idx) => {
    rulers.push(
      <text key={`subTitles-${idx}`} x={startXOffset - 10} y={getYPos(idx) + 14} className={classes.subTitle}>
        {each.title}
      </text>
    )

    if (idx > 0)
      rulers.push(
        <path
          key={`horizontal-line-${idx}`}
          strokeWidth={strokeWidth}
          className={classes.path}
          d={`M ${startXOffset} ${getYPos(idx)}, L ${width} ${getYPos(idx)}`}
        ></path>
      )
  })

  rulers.push(
    <path
      key={`horizontal-line-${data.length}-final`}
      strokeWidth={strokeWidth}
      className={classes.path}
      d={`M ${startXOffset} ${getYPos(data.length) - strokeWidth}, L ${width} ${getYPos(data.length) - strokeWidth}`}
    ></path>
  )

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        paddingLeft: 25,
        paddingRight: 5,
        paddingTop: 20,
        borderRadius: 8,
        width: width,
        height: height,
      }}
    >
      <div
        className={classes.root}
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <div className={classes.title}>{title}</div>
        <div className={classes.years}>
          {years.map((each, idx) => (
            <div className={classes.eachYear} key={idx}>
              {each}
            </div>
          ))}
        </div>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          height={svgHeight}
          width={svgWidth}
          xmlns="http://www.w3.org/2000/svg"
        >
          {rulers}
          {data.map((each, idx) => {
            return years.map((year, index) => {
              if (each.values[index].check)
                return (
                  <g key={`mainer-${idx}-${index}`}>
                    <image href={checkSVG} width={10} height={9.3} x={getXPos(index) + 4} y={getYPos(idx + 1) - 18} />
                    <text x={getXPos(index) + 18} y={getYPos(idx + 1) - 10} className={classes.value}>
                      {each.values[index].percentage}
                      {each.values[index].percentage ? '%' : ''}
                    </text>
                  </g>
                )
              return null
            })
          })}
        </svg>
      </div>
    </DashboardCard>
  )
}

export default Widget61
