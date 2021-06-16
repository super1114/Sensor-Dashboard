import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import clickBadge from '../assets/icons/click.svg'
import clsx from 'clsx'
import useNodeRed from 'hooks/useNodeRed'
import { dateStyling } from 'helpers/helpers'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 16,
    padding: 5,
    letterSpacing: 1.5,
    height: 'auto',
    position: 'relative',
    width: '100%',
    WebkitTextSizeAdjust: 'none',
  },
  title: {
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 1.5,
    fontSize: 18,
  },
  titleBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.primaryText,
    alignItems: 'center',
  },
  path: {
    fill: 'transparent',
    stroke: theme.palette.common.primaryText,
  },
  text: {
    fill: theme.palette.common.primaryText,
  },
  rulerMark: {
    letterSpacing: 0.61,
    fontSize: 7.4,
    fill: theme.palette.common.primaryText,
  },
  dangerColor: {
    fill: theme.palette.common.primaryRed,
  },
  greenColor: {
    fill: theme.palette.common.secondaryGreen,
  },
  blueColor: {
    fill: theme.palette.common.primaryBlue,
  },

  minimumBar: {
    fill: 'transparent',
    stroke: `${theme.palette.common.primaryRed}`,
  },

  maximumBar: {
    fill: 'transparent',
    stroke: `${theme.palette.common.secondaryGreen}`,
  },

  sliderBar: {
    fill: 'transparent',
    stroke: theme.palette.common.primaryText,
  },

  markConnectionBlue: {
    fill: 'transparent',
    stroke: `${theme.palette.common.thirdBlue}`,
  },

  priceCircleBlue: {
    fill: `${theme.palette.common.thirdBlue}`,
  },

  dateMarks: {
    position: 'relative',
  },
  dateMark: {
    fontSize: 7.38,
    lineHeight: '8.65px',
    letterSpacing: 0.61,
    top: 20,
    textAlign: 'right',
    width: 45,
    position: 'absolute',
    fontFamily: theme.typography.lightFontFamily,
    transform: 'Rotate(-90deg) translate(5px, -5px)',
  },
}))

const Widget44 = ({
  style = {},
  width = 320,
  height = 197,
  circleRadius = 3.5,
  topic = 'topic-44',
  setFilter = filter => {},
}) => {
  const { title, data, columns } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) {
    return ''
  }

  let bt_min = Math.min(...data.map(each => each.lb))
  let tp_max = Math.max(...data.map(each => each.ub))

  bt_min = Math.floor(bt_min / 0.2) * 0.2
  tp_max = Math.ceil(tp_max / 0.2) * 0.2

  const startOffset = 40
  const graphHeight = height - 85
  const graphWidth = width - 25
  const widthofEachCell = (graphWidth - startOffset) / data.length

  const getYPosFunc = point => 2 + ((graphHeight - 4) / (tp_max - bt_min)) * (tp_max - point)

  const ruler = []

  for (let i = 0; i <= 5; i++) {
    let point = tp_max - ((tp_max - bt_min) / 5) * i
    ruler.push(
      <g key={i}>
        <text x={30} y={getYPosFunc(point) + 4} className={classes.rulerMark} textAnchor="end">
          {(tp_max - ((tp_max - bt_min) / 5) * i).toFixed(1)}
        </text>
        <text
          className={clsx(classes.rulerMark, {
            [classes.greenColor]: i < 2,
            [classes.blueColor]: i === 2,
            [classes.dangerColor]: i > 2,
          })}
          x={35}
          y={getYPosFunc(point) + 13}
          textAnchor="end"
        >
          {columns[i]}
        </text>
        <path
          className={classes.path}
          d={`M ${startOffset - 1} ${getYPosFunc(point)}, L ${startOffset - 3.5} ${getYPosFunc(point)}`}
          strokeWidth={0.5}
        />
      </g>
    )
  }

  const dates = []

  data.forEach((item, idx) => {
    dates.push(
      <span
        key={idx}
        className={classes.dateMark}
        style={{
          left: startOffset + idx * widthofEachCell - 3,
        }}
      >
        {dateStyling(item.date)}
      </span>
    )
  })

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        marginLeft: 0,
        marginTop: 20,
        marginRight: 0,
        padding: 5,
        paddingTop: 3,
        borderRadius: 10,
        width: width,
        height: height,
      }}
    >
      <div
        className={classes.root}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className={classes.title}>{title}</div>
        <div style={{ height: 10 }}></div>
        <a onClick={() => setFilter('sentiment')}>
          <img src={clickBadge} className={classes.titleBadge} alt="click badge item" />
        </a>
        <div className={classes.body}>
          <svg
            height={graphHeight + 5}
            viewBox={`0 0 ${graphWidth} ${graphHeight + 5}`}
            width={graphWidth}
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'overlay' }}
          >
            {ruler}
            {data.map((each, idx) => {
              let currentXpos = widthofEachCell * idx + startOffset
              return (
                <g key={idx}>
                  <path
                    className={classes.path}
                    d={`M ${currentXpos} 1, L ${currentXpos} ${graphHeight}`}
                    strokeWidth={1}
                  />
                  {idx === data.length - 1 ? (
                    <>
                      <path
                        className={classes.path}
                        d={`M  ${graphWidth - 0.5} 0.5, L ${graphWidth - 0.5} ${graphHeight}`}
                        strokeWidth={0.5}
                      />
                    </>
                  ) : (
                    <>
                      <path
                        className={classes.markConnectionBlue}
                        d={`M ${currentXpos + widthofEachCell / 2 - circleRadius / 2} ${getYPosFunc(each.price)}, L ${
                          currentXpos + widthofEachCell * 1.5 - circleRadius / 2
                        } ${getYPosFunc(data[idx + 1].price)}`}
                        strokeWidth={0.5}
                      />
                    </>
                  )}
                  {/* Slider for min */}
                  <path
                    className={classes.minimumBar}
                    d={`M  ${currentXpos + 6} ${getYPosFunc(each.lb)} , L ${currentXpos + 20} ${getYPosFunc(each.lb)}`}
                    strokeWidth={0.8}
                  />
                  {/* slider for max pric */}
                  <path
                    className={classes.maximumBar}
                    d={`M  ${currentXpos + 6} ${getYPosFunc(each.ub)} , L ${currentXpos + 20} ${getYPosFunc(each.ub)}`}
                    strokeWidth={0.8}
                  />
                  {/* middle bar */}
                  <path
                    className={classes.sliderBar}
                    d={`M  ${currentXpos + widthofEachCell / 2 - 0.8} ${getYPosFunc(each.lb)}, L ${
                      currentXpos + widthofEachCell / 2 - 0.8
                    } ${getYPosFunc(each.ub)}`}
                    strokeWidth={0.8}
                  />
                  {/* market price circle */}
                  <circle
                    cx={currentXpos + widthofEachCell / 2 - circleRadius / 2}
                    cy={getYPosFunc(each.price)}
                    r={circleRadius}
                    className={classes.priceCircleBlue}
                  />
                </g>
              )
            })}

            {/* draw the bottom and top line */}
            <path className={classes.path} d={`M  ${startOffset} ${1}, L ${graphWidth} ${1}`} strokeWidth={0.5} />
            <path
              className={classes.path}
              d={`M ${startOffset} ${graphHeight}, L ${graphWidth} ${graphHeight}`}
              strokeWidth={0.5}
            />
          </svg>
        </div>
        <div className={classes.dateMarks}>{dates}</div>
      </div>
    </DashboardCard>
  )
}

export default Widget44
