import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import EventLogCheckTable from 'components/tables/EventLogCheckTable'
import EventLogDurationTable from 'components/tables/EventLogDurationTable'
import clsx from 'clsx'

import useNodeRed from 'hooks/useNodeRed'

import React, { useState, useRef } from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    WebkitTextSizeAdjust: 'none',
    position: 'relative',
    width: '100%',
    WebkitTouchCallout: 'none' /* iOS Safari */,
    WebkitUserSelect: 'none' /* Safari */,
    KhtmlUserSelect: 'none' /* Konqueror HTML */,
    MozUserSelect: 'none' /* Old versions of Firefox */,
    MsUserSelect: 'none' /* Internet Explorer/Edge */,
    userSelect: 'none' /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */,
    overflow: 'initial',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.83,
    marginBottom: 1,
  },
  blue: {
    color: theme.palette.common.primaryBlue,
  },
  cyan: {
    color: theme.palette.common.primaryCyan,
  },
  secondaryBlue: {
    color: theme.palette.common.thirdBlue,
  },
  red: {
    color: theme.palette.common.primaryRed,
  },
  extraTitle: {
    fontSize: 8,
    letterSpacing: 0.67,
    position: 'absolute',
    display: 'flex',
    top: -1,
    right: 12,
  },

  blueTitle: {
    color: theme.palette.common.primaryBlue,
  },
  cyanTitle: {
    color: theme.palette.common.primaryCyan,
  },
  years: {
    marginLeft: 133,
    display: 'flex',
    marginTop: 6,
    marginBottom: 6,
  },
  eachYear: {
    fontFamily: theme.typography.thinFontFamily,
    fontSize: 8,
    letterSpacing: 0.67,
    width: 42,
    textAlign: 'center',
  },

  carouselWrapper: {
    position: 'absolute',
    right: 10,
  },
  carousels: {
    position: 'relative',
  },
  carouselBtnActive: {
    height: 7,
    width: 7,
    position: 'absolute',
    borderRadius: '100%',
    backgroundColor: theme.palette.common.primaryText,
    cursor: 'pointer',
  },
  carouselBtn: {
    height: 7,
    width: 7,
    position: 'absolute',
    borderRadius: '100%',
    backgroundColor: theme.palette.common.secondaryCardBackground,
    cursor: 'pointer',
  },

  /* Hide scrollbar for Chrome, Safari and Opera */
  body: {
    MsOverflowStyle: 'none' /* IE and Edge */,
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    overflowY: 'scroll',
    marginRight: 15,
  },
}))

const Widget88 = ({ style = {}, width = 500, height = 300, topic = 'topic-88' }) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()

  const [curDot, setCurDot] = useState(0)
  const mainWrapper = useRef(React.createRef())

  if (!title) {
    return ''
  }

  let oneHeight = 340
  const carousels = []
  let totalHeight = 0
  data.data.map((each, idx) => {
    totalHeight += 26 * each.data.length + 28
    if (each.type === 'checked')
      carousels.push(
        <div style={{ marginBottom: 10 }} key={idx}>
          <EventLogCheckTable
            data={each}
            width={560}
            titleWidth={130}
            marginTitle={11}
            height={26 * each.data.length + 28}
            years={data.years}
          />
        </div>
      )
    else
      carousels.push(
        <div style={{ marginBottom: 10 }} key={idx}>
          <EventLogDurationTable
            data={each}
            width={560}
            titleWidth={130}
            marginTitle={11}
            height={26 * each.data.length + 28}
            years={data.years}
          />
        </div>
      )
  })

  const customDots = []
  for (let i = 0; i <= totalHeight; i += oneHeight) {
    customDots.push(
      <a
        key={i}
        className={Math.floor(i / oneHeight) === curDot ? classes.carouselBtnActive : classes.carouselBtn}
        style={{ right: -10, bottom: (-i / oneHeight) * 15 }}
        onClick={() => {
          const elem = mainWrapper.current
          console.log(elem.scrollTop)
          elem.scrollTop = i
          setCurDot(Math.floor(i / oneHeight))
        }}
      ></a>
    )
  }

  const scrollHandler = () => {
    const elem = mainWrapper.current
    setCurDot(Math.ceil(elem.scrollTop / oneHeight))
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        borderRadius: 8,
        margin: 0,
        padding: 8,
        paddingTop: 8,
        paddingBottom: 0,
        width: width,
        height: height,
        overflow: 'initial',
      }}
    >
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.extraTitle}>
          {data.titles.map((each, idx) => {
            return (
              <div
                className={clsx({
                  [classes.blue]: each.color === 'blue',
                  [classes.cyan]: each.color === 'cyan',
                  [classes.red]: each.color === 'red',
                })}
                style={{ display: 'flex' }}
                key={idx}
              >
                <span style={{ color: 'white', display: idx === 0 ? 'none' : 'block' }}>&nbsp;</span>
                {each.title}
                <span style={{ color: 'white', display: idx === data.titles.length - 1 ? 'none' : 'block' }}>
                  &nbsp;|
                </span>
              </div>
            )
          })}
        </div>

        <div className={classes.years}>
          {data.years.map((each, idx) => {
            return (
              <div className={classes.eachYear} key={idx}>
                {each}
              </div>
            )
          })}
        </div>

        <div
          className={classes.body}
          ref={mainWrapper}
          onScroll={() => {
            scrollHandler()
          }}
        >
          {carousels}
          <div className={classes.carouselWrapper} style={{ bottom: Math.ceil(totalHeight / oneHeight) * 13 - 3 }}>
            <div className={classes.carousels}>{customDots}</div>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget88
