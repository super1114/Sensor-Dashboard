import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'

import { useState, useEffect } from 'react'

import clsx from 'clsx'
import ScrollContainer from 'react-indiana-drag-scroll'
import { ClassOutlined } from '@material-ui/icons'

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
    marginTop: 5,
    position: 'relative',
    paddingRight: 2,
    MsOverflowStyle: 'none' /* IE and Edge */,
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    overflowY: 'scroll !important',
  },
  transparentWrapper: {
    position: 'absolute',
    top: 33,
    left: 22,
  },
  transparentDiv: {
    position: 'relative',
  },
  triangle: {
    position: 'absolute',
    top: -5,
    left: 10,
  },
  transparent: {
    position: 'absolute',
    borderRadius: 6,
    backgroundColor: theme.palette.common.primaryText,
    opacity: 0.5,
    width: 537,
    height: 80,
  },
  titleWrapper: {
    width: 130,
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: 7,
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
    cursor: 'pointer',
  },
  subTitleDarkBlue: {
    width: 92,
    height: 26,
    fontSize: 8,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    textAlign: 'right',
    fontFamily: theme.typography.lightFontFamily,
    letterSpacing: 0.67,
    lineHeight: '9.38px',
    color: theme.palette.common.baseCardBackground,
  },

  years: {
    marginLeft: 140,
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: 10,
    marginTop: -10,
  },
  eachYear: {
    fontSize: 8,
    fontFamily: theme.typography.thinFontFamily,
    letterSpacing: 0.67,
    lineHeight: '9.38px',
    fill: theme.palette.common.primaryText,
    textAlign: 'center',
  },
  svg: {
    overflow: 'initial',
    marginTop: -6,
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

  guideSvg: {
    marginLeft: 135,
    marginTop: 13,
    overflow: 'initial',
  },
  guideText: {
    fontSize: 6,
    letterSpacing: 0.5,
    lineHeight: '7.3',
    fontFamily: theme.typography.thinFontFamily,
    fill: theme.palette.common.primaryText,
  },
}))

const Widget81 = ({ topic = 'topic-81', style = {}, width = 255, height = 185 }) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()
  const [curFold, setCurFold] = useState(0)

  useEffect(() => {
    if (data) {
    }
  }, [curFold])

  if (!title) {
    return ''
  }

  let graphWidth = 420
  let graphHeight = 294
  let eachHeight = 26
  let eachWidth = 42
  const getXPos = value => value * eachWidth
  const getYPos = idx => idx * eachHeight + 32

  let rulers = []
  let total_cnt = curFold !== null ? data.data.length + data.data[curFold].subData.length : data.data.length

  for (let idx = 0; idx < total_cnt; idx++) {
    rulers.push(
      <line
        key={`horizontal-${idx}`}
        className={classes.svgLine}
        x1={0}
        y1={getYPos(idx) - 0.5}
        x2={graphWidth}
        y2={getYPos(idx) - 0.5}
      ></line>
    )
  }

  data.years.map((each, idx) => {
    rulers.push(
      <g key={`vertical-${idx}`}>
        {idx === data.years.length - 1 && (
          <line
            className={classes.svgLine}
            x1={getXPos(idx + 1)}
            y1={12}
            x2={getXPos(idx + 1)}
            y2={getYPos(total_cnt - 1)}
          ></line>
        )}
        <line
          className={classes.svgLine}
          x1={getXPos(idx)}
          y1={12}
          x2={getXPos(idx)}
          y2={getYPos(total_cnt - 1)}
        ></line>
        {/* <text className={classes.year} x={getXPos(idx) + 10} y={7}>
          {each}
        </text> */}
      </g>
    )
  })

  const graphFunc = (each, idx) => {
    return (
      <g key={`graphFunc-${idx}`}>
        <line
          className={classes.companyLine}
          x1={getXPos((10 * each.start) / 120)}
          y1={getYPos(idx) - 20}
          x2={getXPos((10 * each.end) / 120)}
          y2={getYPos(idx) - 20}
          strokeWidth={1}
        ></line>
        <line
          className={classes.marketLine}
          x1={getXPos((10 * each.start) / 120)}
          y1={getYPos(idx) - 8}
          x2={getXPos((10 * each.end) / 120)}
          y2={getYPos(idx) - 8}
          strokeWidth={1}
        ></line>
        {each.start !== 0 && (
          <g>
            <circle
              cx={getXPos((10 * each.start) / 120)}
              cy={getYPos(idx) - 8}
              className={classes.greenOutterCircle}
              r={4.5}
            ></circle>
            <circle
              cx={getXPos((10 * each.start) / 120)}
              cy={getYPos(idx) - 8}
              className={classes.whiteInnerCircle}
              r={2.5}
            ></circle>
            <circle
              cx={getXPos((10 * each.start) / 120)}
              cy={getYPos(idx) - 20}
              className={classes.greenOutterCircle}
              r={4.5}
            ></circle>
            <circle
              cx={getXPos((10 * each.start) / 120)}
              cy={getYPos(idx) - 20}
              className={classes.greenInnerCircle}
              r={2.5}
            ></circle>
          </g>
        )}
        {each.end !== 120 && (
          <g>
            <circle
              cx={getXPos((10 * each.end) / 120)}
              cy={getYPos(idx) - 8}
              className={classes.redOutterCircle}
              r={4.5}
            ></circle>
            <circle
              cx={getXPos((10 * each.end) / 120)}
              cy={getYPos(idx) - 8}
              className={classes.whiteInnerCircle}
              r={2.5}
            ></circle>
            <circle
              cx={getXPos((10 * each.end) / 120)}
              cy={getYPos(idx) - 20}
              className={classes.redOutterCircle}
              r={4.5}
            ></circle>
            <circle
              cx={getXPos((10 * each.end) / 120)}
              cy={getYPos(idx) - 20}
              className={classes.redInnerCircle}
              r={2.5}
            ></circle>
          </g>
        )}
      </g>
    )
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        margin: 0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 0,
        borderRadius: 8,
        width: width,
        height: height,
        flexDirection: 'column',
        overflow: 'initial',
      }}
    >
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.years}>
          {data.years.map((each, idx) => {
            return (
              <div className={classes.eachYear} key={`years-${idx}`}>
                {each}
              </div>
            )
          })}
        </div>
        <ScrollContainer className={classes.bodyWrapper} vertical={true} horizontal={false} hideScrollbars={true}>
          <div className={classes.titleWrapper} style={{ zIndex: 100 }}>
            {data.data.map((each, idx) => {
              return (
                <div>
                  <div
                    className={classes.subTitle}
                    key={idx}
                    onClick={() => {
                      setCurFold(idx === curFold ? null : idx)
                    }}
                  >
                    {each.title}
                  </div>
                  {idx === curFold && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      {each.subData.map((item, index) => {
                        return (
                          <div className={classes.subTitleDarkBlue} key={`subtitles-${idx}-${index}`}>
                            {item.title}
                          </div>
                        )
                      })}
                    </div>
                  )}
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
              let idx_temp = idx
              if (curFold !== null && curFold < idx) {
                idx_temp = idx + data.data[curFold].subData.length
              }
              return (
                <g key={idx_temp}>
                  {graphFunc(each, idx_temp)}
                  {idx === curFold && (
                    <g key={`curFold-${idx_temp}`}>
                      {each.subData.map((item, index) => {
                        return <g key={`curFold-${idx}-${index}`}>{graphFunc(item, idx + index + 1)}</g>
                      })}
                    </g>
                  )}
                </g>
              )
            })}
          </svg>
          <div
            className={classes.transparentWrapper}
            style={{
              display: curFold === null ? 'none' : 'block',
              top: curFold * 26 + 28,
            }}
          >
            <div className={classes.transparentDiv}>
              <div className={classes.transparent}></div>
              <svg
                width="14"
                height="4"
                viewBox="0 0 14 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={classes.triangle}
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M7 4L0 0L14 0L7 4Z" fill="white" />
              </svg>
            </div>
          </div>
        </ScrollContainer>

        <svg width="101" height="8" viewBox="0 0 101 8" xmlns="http://www.w3.org/2000/svg" className={classes.guideSvg}>
          <line className={classes.companyLine} strokeWidth={1} x1={0} y1={3} x2={21} y2={3}></line>
          <text className={classes.guideText} x={23.5} y={5}>
            Company
          </text>
          <line className={classes.marketLine} strokeWidth={1} x1={57} y1={3} x2={78} y2={3}></line>
          <text className={classes.guideText} x={80} y={5}>
            Market
          </text>
        </svg>
      </div>
    </DashboardCard>
  )
}

export default Widget81
