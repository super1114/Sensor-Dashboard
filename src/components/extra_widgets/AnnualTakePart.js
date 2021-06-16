import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
  },
  blue: {
    backgroundColor: theme.palette.common.thirdBlue,
  },
  green: {
    backgroundColor: theme.palette.common.secondaryGreen,
  },
  cyan: {
    backgroundColor: theme.palette.common.primaryCyan,
  },
  block: {
    position: 'relative',
    background: 'transparent',
  },
  blockBg: {
    width: '100%',
    height: '100%',
  },
  year: {
    fontSize: 5,
    letterSpacing: 0.42,
    lineHeight: '5.86px',
    fontFamily: theme.typography.thinFontFamily,
    position: 'absolute',
    bottom: -9,
    left: 3,
  },
  lines: {
    position: 'absolute',
  },
  path: {
    stroke: theme.palette.common.primaryText,
    strokeWidth: 0.3,
  },
}))
const AnnualTakePart = ({ data = {}, height = 0, width = 0 }) => {
  const classes = useStyles()
  let blockWidth = width / data.years.length

  return (
    <div className={classes.wrapper}>
      {data.years.map((each, idx) => (
        <div
          key={idx}
          className={classes.block}
          style={{
            width: blockWidth,
            height: height - 10,
            position: 'relative',
          }}
        >
          <div
            className={clsx(classes.blockBg, {
              [classes.blue]: data.color === 'blue',
              [classes.green]: data.color === 'green',
              [classes.cyan]: data.color === 'cyan',
            })}
            style={{
              position: 'absolute',
              visibility: data.rankHistory[idx] ? 'visible' : 'hidden',
              borderTopLeftRadius: idx === 0 ? 6 : 0,
              borderBottomLeftRadius: idx === 0 ? 6 : 0,
              borderTopRightRadius: idx === data.years.length - 1 ? 6 : 0,
              borderBottomRightRadius: idx === data.years.length - 1 ? 6 : 0,
            }}
          ></div>
          <div className={classes.year}>{each}</div>
        </div>
      ))}

      <svg
        className={classes.lines}
        style={{ overflow: 'initial' }}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
      >
        {data.years.map((each, idx) => {
          let start = idx === 0 || idx === data.years.length ? height - 16 : 0
          return (
            <path
              key={idx}
              className={classes.path}
              d={`M ${idx * blockWidth} ${start} ${idx * blockWidth} ${height}`}
            ></path>
          )
        })}

        <path
          key={data.years.length}
          className={classes.path}
          d={`M ${data.years.length * blockWidth} ${height - 16} ${data.years.length * blockWidth} ${height}`}
        ></path>
      </svg>
    </div>
  )
}

export default AnnualTakePart
