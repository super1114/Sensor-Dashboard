import { makeStyles } from '@material-ui/core/styles'
import { useContext } from 'react'
import HoverContext from 'contexts/HoverContext'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    position: 'relative',
    fontFamily: theme.typography.thinFontFamily,
  },
  path: {
    fill: 'transparent',
    stroke: theme.palette.common.primaryText,
  },
  text: {
    fill: theme.palette.common.primaryText,
  },
  yearMark: {
    position: 'absolute',
    letterSpacing: 1,
    left: -5,
    top: 0,
    fontSize: 7.2,
    color: theme.palette.common.primaryText,
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

  markConnectionCyan: {
    fill: 'transparent',
    stroke: `${theme.palette.common.primaryCyan}`,
  },

  markConnectionSecondBlue: {
    fill: 'transparent',
    stroke: `${theme.palette.common.secondaryBlue}`,
  },

  markConnectionGreen: {
    fill: 'transparent',
    stroke: `${theme.palette.common.primaryGreen}`,
  },

  priceCircleBlue: {
    fill: `${theme.palette.common.thirdBlue}`,
  },

  priceCircleCyan: {
    fill: `${theme.palette.common.primaryCyan}`,
  },

  priceCircleSecondBlue: {
    fill: `${theme.palette.common.secondaryBlue}`,
  },

  priceCircleGreen: {
    fill: `${theme.palette.common.primaryGreen}`,
  },

  unitRuler: {
    fontFamily: theme.typography.thinFontFamily,
    fontSize: 3.6,
    textAlign: 'right',
    width: 10,
  },

  // for Hover

  hoverWrapper: {
    fill: 'transparent',
    strokeWidth: 2,
  },
  HoverWrapperBlue: {
    stroke: theme.palette.common.primaryBlue,
  },

  HoverWrapperCyan: {
    stroke: theme.palette.common.primaryCyan,
  },

  HoverWrapperSecondBlue: {
    stroke: theme.palette.common.secondaryBlue,
  },

  HoverWrapperGreen: {
    stroke: theme.palette.common.primaryGreen,
  },

  groupSVGContainer: {
    // border: '1px solid rgba(255, 255, 255, 0.5)',
    overflow: 'overlay',
  },
}))

const HorizontalChart = ({
  marketData = [],
  title = null,
  color = 'blue',
  suffix = null,
  toFixed = 0,
  unit = 5,
  startOffset = 30,

  yearShow = true,
  circleRadius = 2.5,
  height = 50,
  width = 450,
}) => {
  const classes = useStyles()

  const { hoverIndex, hoverType, setHoverData } = useContext(HoverContext)
  // Get min and max mark of whold data
  let bt_min = Math.min(
    ...marketData.map(each => each.bt_mark),
    ...marketData.map(each => each.tp_mark),
    ...marketData.map(each => each.marketPrice),
    ...marketData.map(each => each.near_comp)
  )
  let tp_max = Math.max(
    ...marketData.map(each => each.bt_mark),
    ...marketData.map(each => each.tp_mark),
    ...marketData.map(each => each.marketPrice),
    ...marketData.map(each => each.near_comp)
  )
  let widthofEachCell = (width - startOffset) / marketData.length
  bt_min = Math.floor(bt_min / unit) * unit
  tp_max = Math.ceil(tp_max / unit) * unit

  const getYFunc = point => ((height - 4) / (tp_max - bt_min)) * (tp_max - point) + 3

  // Ruler's marks
  var chartMarks = []
  for (let point = bt_min; point <= tp_max; point += (tp_max - bt_min) / 8) {
    chartMarks.push(
      <g key={point} style={{ display: 'flex', flexDirection: 'flex-end' }}>
        <text
          x={startOffset - 4}
          y={getYFunc(point) + 1}
          fill="white"
          style={{ fontSize: 3.6 }}
          className={classes.unitRuler}
          textAnchor="end"
        >
          {point.toFixed(toFixed)}
          {suffix}
        </text>
        <path
          className={classes.path}
          d={`M ${startOffset - 1} ${getYFunc(point)}, L ${startOffset - 3.5} ${getYFunc(point)}`}
          strokeWidth={0.5}
        />
      </g>
    )
  }

  return (
    <div className={classes.root}>
      {yearShow ? (
        <>
          {marketData.map((each, idx) => {
            return (
              <span
                className={classes.yearMark}
                key={idx}
                style={{
                  top: -15,
                  left: idx * widthofEachCell + 14 + startOffset,
                }}
              >
                {each.year}
              </span>
            )
          })}
        </>
      ) : (
        <></>
      )}
      <svg
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
        className={classes.groupSVGContainer}
      >
        {chartMarks}
        {marketData.map((each, idx) => {
          let currentXpos = widthofEachCell * idx + startOffset
          let opacity = hoverIndex === idx && hoverType === title ? 1 : 0.5

          if (hoverIndex === 'Not on' && hoverType === 'Not on') opacity = 1

          return (
            <g
              key={idx}
              onMouseOver={() => {
                setHoverData(idx, title, each)
              }}
              onMouseOut={() => {
                setHoverData('Not on', 'Not on', {})
              }}
              style={{ opacity: opacity }}
            >
              <rect
                x={3 + currentXpos}
                y={3}
                rx="4"
                ry="4"
                width={widthofEachCell - 6}
                height={height - 6}
                className={clsx(classes.hoverWrapper, {
                  [classes.HoverWrapperBlue]: color === 'blue',
                  [classes.HoverWrapperCyan]: color === 'cyan',
                  [classes.HoverWrapperGreen]: color === 'green',
                  [classes.HoverWrapperSecondBlue]: color === 'secondBlue',
                })}
                style={{
                  strokeOpacity: hoverIndex === idx && hoverType === title ? 1 : 0,
                }}
              ></rect>

              <path className={classes.path} d={`M ${currentXpos} 1, L ${currentXpos} ${height}`} strokeWidth={1} />
              {idx === marketData.length - 1 ? (
                <>
                  <path className={classes.path} d={`M  ${width} 1, L ${width} ${height}`} strokeWidth={0.5} />
                </>
              ) : (
                <>
                  <path
                    className={clsx({
                      [classes.markConnectionBlue]: color === 'blue',
                      [classes.markConnectionCyan]: color === 'cyan',
                      [classes.markConnectionSecondBlue]: color === 'secondBlue',
                      [classes.markConnectionGreen]: color !== 'blue' && color !== 'cyan' && color !== 'secondBlue',
                    })}
                    d={`M ${currentXpos + widthofEachCell / 2 - circleRadius / 2} ${getYFunc(each.marketPrice)}, L ${
                      currentXpos + widthofEachCell * 1.5 - circleRadius / 2
                    } ${getYFunc(marketData[idx + 1].marketPrice)}`}
                    strokeWidth={0.5}
                  />
                </>
              )}

              {/* Slider for min */}
              <path
                className={classes.minimumBar}
                d={`M  ${currentXpos + 17} ${getYFunc(each.bt_mark)} , L ${currentXpos + 27} ${getYFunc(each.bt_mark)}`}
                strokeWidth={0.8}
              />
              {/* slider for max pric */}
              <path
                className={classes.maximumBar}
                d={`M  ${currentXpos + 17} ${getYFunc(each.tp_mark)} , L ${currentXpos + 27} ${getYFunc(each.tp_mark)}`}
                strokeWidth={0.8}
              />
              {/* average market price */}
              <path
                className={classes.sliderBar}
                d={`M  ${currentXpos + 17} ${getYFunc(each.near_comp)} , L ${currentXpos + 27} ${getYFunc(
                  each.near_comp
                )}`}
                strokeWidth={0.8}
              />
              {/* middle bar */}
              <path
                className={classes.sliderBar}
                d={`M  ${currentXpos + widthofEachCell / 2 - 0.8} ${getYFunc(each.bt_mark)}, L ${
                  currentXpos + widthofEachCell / 2 - 0.8
                } ${getYFunc(each.tp_mark)}`}
                strokeWidth={0.8}
              />
              {/* market price circle */}
              <circle
                cx={currentXpos + widthofEachCell / 2 - circleRadius / 2}
                cy={getYFunc(each.marketPrice)}
                r={circleRadius}
                className={clsx({
                  [classes.priceCircleBlue]: color === 'blue',
                  [classes.priceCircleCyan]: color === 'cyan',
                  [classes.priceCircleSecondBlue]: color === 'secondBlue',
                  [classes.priceCircleGreen]: color !== 'blue' && color !== 'cyan' && color !== 'secondBlue',
                })}
              />
            </g>
          )
        })}

        <path d={`M ${startOffset} 1, L ${width} 1`} className={classes.path} strokeWidth={0.5}></path>
        <path
          d={`M ${startOffset} ${height - 0.5}, L ${width} ${height - 0.5}`}
          className={classes.path}
          strokeWidth={0.5}
        ></path>
      </svg>
    </div>
  )
}

export default HorizontalChart
