import { makeStyles } from '@material-ui/core/styles'

import React, { useState, useEffect, useRef } from 'react'
import useNodeRed from 'hooks/useNodeRed'
import clsx from 'clsx'
import Switch from 'react-switch'
import ScrollContainer from 'react-indiana-drag-scroll'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 8,
    overflow: 'hidden',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    borderRadius: 8,
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryGreen,
    letterSpacing: 1.33,
    fontSize: 16,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%',
    overflow: 'initial',
    position: 'relative',
  },

  body: {
    display: 'flex',
    flexDirection: 'column',
    height: 351,
    borderRadius: 10,
    border: `2px solid ${theme.palette.common.primaryGreen}`,
    background: 'transparent',
    color: theme.palette.common.primaryBlack,
    fontSize: 16,
    lineHeight: '18.75px',
    letterSpacing: 1.29,
    overflow: 'hidden',
  },
  toolBar: {
    overflow: 'initial',
    background: theme.palette.common.secondaryCardBackground,
    borderRadius: 8,
    minHeight: 37,
    display: 'flex',
    alignItems: 'center',
    minWidth: '100%',
  },
  provocation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 115,
    marginLeft: 10,
    marginRight: 5,
    paddingRight: 5,
    borderRight: `1px solid #333`,
  },

  white: {
    color: theme.palette.common.primaryText,
    border: `1px solid ${theme.palette.common.primaryText}`,
    fill: theme.palette.common.primaryText,
  },
  blue: {
    color: theme.palette.common.primaryBlue,
    border: `1px solid ${theme.palette.common.primaryBlue}`,
    fill: theme.palette.common.primaryBlue,
  },
  cyan: {
    color: theme.palette.common.primaryCyan,
    border: `1px solid ${theme.palette.common.primaryCyan}`,
    fill: theme.palette.common.primaryCyan,
  },

  text: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 12,
    lineHeight: '13.72px',
    letterSpacing: 1,
    border: 'none',
    whiteSpace: 'nowrap',
  },
  circle: {
    borderRadius: '100%',
    minHeight: 21,
    minWidth: 21,
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 12,
    lineHeight: '13.72px',
    letterSpacing: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryWrapper: {
    display: 'flex',
    alignItems: 'center',
    MsOverflowStyle: 'none' /* IE and Edge */,
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    overflowX: 'scroll !important',
    width: 435,
  },

  category: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 6,
    marginLeft: 6,
  },

  radiusWrapperBlue: {
    border: `1px solid ${theme.palette.common.primaryBlue}`,
    borderRadius: 15,
    height: 26,
  },
  radiusWrapperCyan: {
    border: `1px solid ${theme.palette.common.primaryCyan}`,
    borderRadius: 15,
    height: 26,
  },

  content: {
    color: theme.palette.common.primaryText,
    height: 330,
    MsOverflowStyle: 'none' /* IE and Edge */,
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    overflowY: 'scroll !important',
  },

  eachListBlue: {
    '&::marker': {
      fontSize: 25,
      top: 3,
      color: theme.palette.common.primaryBlue,
    },
  },
  eachListCyan: {
    '&::marker': {
      fontSize: 25,
      top: 3,
      color: theme.palette.common.primaryCyan,
    },
  },
}))

const Widget52B = ({ style = {}, width = 580, height = 385, topic = 'topic-52-b' }) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()
  const [switchState, setSwitchState] = useState([true, true, true, true])

  const scrollRef = useRef(null)

  // const [data, setData] = useState('<ul><li>Nullam tincidunt </li></ul>')

  useEffect(() => {
    if (data && switchState.length === 0) {
      data.map((each, idx) => {
        switchState.push(true)
      })
    }
  }, [])

  if (!title) {
    return ''
  }

  let total_cnt = 0
  data.map(each => {
    total_cnt += each.count
  })

  const onWheel = e => {
    const container = scrollRef.current
    const containerScrollPosition = scrollRef.current.scrollLeft

    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY,
    })
  }

  return (
    <div
      className={clsx(classes.root)}
      style={{
        ...style,
        width: width,
        height: height,
      }}
    >
      <div className={classes.title}>{title}</div>
      <div className={classes.body}>
        <div className={classes.toolBar}>
          <div className={classes.provocation}>
            <div className={clsx(classes.text, classes.white)} style={{ marginRight: 5 }}>
              {title}
            </div>
            <div className={clsx(classes.circle, classes.white)}>{total_cnt}</div>
          </div>

          {/* <div
            className={classes.categoryWrapper}
            ref={scrollRef}
            onWheel={onWheel}
          > */}
          <ScrollContainer vertical={false} hideScrollbars={true} className={classes.categoryWrapper}>
            {data.map((each, idx) => {
              return (
                <div
                  className={clsx(classes.category, {
                    [classes.radiusWrapperBlue]: each.color === 'blue',
                    [classes.radiusWrapperCyan]: each.color === 'cyan',
                  })}
                  key={idx}
                >
                  <div
                    className={clsx(
                      {
                        [classes.blue]: each.color === 'blue',
                        [classes.cyan]: each.color === 'cyan',
                      },
                      classes.text
                    )}
                    style={{ marginRight: 5 }}
                  >
                    {each.category}
                  </div>

                  <div
                    className={clsx(
                      {
                        [classes.blue]: each.color === 'blue',
                        [classes.cyan]: each.color === 'cyan',
                      },
                      classes.circle
                    )}
                    style={{ marginRight: 5 }}
                  >
                    {each.count}
                  </div>
                  <Switch
                    onChange={() => {
                      let tmp = [...switchState]
                      tmp[idx] = !tmp[idx]
                      setSwitchState(tmp)
                    }}
                    checked={switchState[idx]}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    offColor={'#888'}
                    onColor={'#8BB7F0'}
                    handleDiameter={16}
                    height={20}
                    width={35}
                  />
                </div>
              )
            })}
          </ScrollContainer>
        </div>
        <ScrollContainer vertical={true} horizontal={false} hideScrollbars={true} className={classes.content}>
          <ul>
            {data.map((item, idx) => {
              if (switchState[idx]) {
                return item.data.map((each, index) => {
                  return (
                    <li
                      className={clsx({
                        [classes.eachListBlue]: item.color === 'blue',
                        [classes.eachListCyan]: item.color === 'cyan',
                      })}
                      key={`${idx}-${index}`}
                    >
                      {each}
                    </li>
                  )
                })
              }
            })}
          </ul>
        </ScrollContainer>
      </div>
    </div>
  )
}
export default Widget52B
