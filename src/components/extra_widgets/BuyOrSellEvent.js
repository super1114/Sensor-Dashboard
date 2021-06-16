import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    position: 'relative',
    fontFamily: theme.typography.lightFontFamily,
  },
  title: {
    color: theme.palette.common.thirdBlue,
    marginBottom: 3,
  },
  subTitles: {
    position: 'absolute',
    left: 0,
    top: 12,
  },
  subTitle: {
    fontSize: 6,
    lineHeight: '7px',
    letterSpacing: 0.4,
    color: theme.palette.common.primaryText,
    width: 35,
    display: 'flex',
    alignItems: 'center',
  },

  dataWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 20,
    height: 'max-content',
  },
  each: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    '&::after': {
      position: 'absolute',
      height: '100%',
      width: 0.5,
      top: 0,
      right: 0,
      background: theme.palette.common.primaryText,
      content: `''`,
    },
  },
  circleWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    background: 'transparent',
    width: 11.08,
    height: 11.08,
    borderRadius: '100%',
    border: '0.62px solid',
    textAlign: 'center',
    fontSize: 4.5,
    letterSpacing: 0.4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blue: {
    borderColor: theme.palette.common.thirdBlue,
  },
  cyan: {
    borderColor: theme.palette.common.primaryCyan,
  },
  thirdBlue: {
    borderColor: theme.palette.common.secondaryBlue,
  },
  green: {
    borderColor: theme.palette.common.primaryGreen,
  },
}))

const BuyOrSellEvent = ({ graphData = {}, width = 100, height = 100 }) => {
  const classes = useStyles()

  let startYOffset = 15
  let eachHeight = (height - startYOffset) / graphData[0].buyOrSellEvents.length

  let eachWidth = (width - 15) / graphData.length

  return (
    <div className={classes.root} style={{ width: width, minHeight: height }}>
      <div className={classes.title}>{graphData[0].eventsTitle}</div>
      <div className={classes.subTitles}>
        {graphData[0].buyOrSellEvents.map((item, idx) => {
          return (
            <div className={classes.subTitle} key={idx} style={{ height: eachHeight }}>
              {item.title}
            </div>
          )
        })}
      </div>
      <div className={classes.dataWrapper}>
        {graphData.map((each, idx) => (
          <div className={classes.each} key={idx} style={{ width: eachWidth }}>
            {each.buyOrSellEvents.map((item, index) => (
              <div className={classes.circleWrapper} style={{ minHeight: eachHeight }} key={index}>
                <div
                  className={clsx(classes.circle, {
                    [classes.blue]: item.color === 'blue',
                    [classes.cyan]: item.color === 'cyan',
                    [classes.thirdBlue]: item.color === 'thirdBlue',
                    [classes.green]: item.color === 'green',
                  })}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BuyOrSellEvent
