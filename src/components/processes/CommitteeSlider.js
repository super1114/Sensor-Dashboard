import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import { TripleSliderMode } from 'constants/common'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    fontFamily: theme.typography.thinFontFamily,
    overflow: 'initial',
  },

  title: {
    fontFamily: theme.typography.mediumFontFamily,
    letterSpacing: 0.58,
    lineHeight: 1.05,
    textAlign: 'center',
    width: 55,
    marginTop: 3,
  },

  blueBorder: {
    border: `1px solid ${theme.palette.common.primaryBlue}`,
  },
  cyanBorder: {
    border: `1px solid ${theme.palette.common.primaryCyan}`,
  },
  secondaryBlueBorder: {
    border: `1px solid ${theme.palette.common.secondaryBlue}`,
  },
  greenBorder: {
    border: `1px solid ${theme.palette.common.primaryGreen}`,
  },
  secondaryGreenBorder: {
    border: `1px solid ${theme.palette.common.secondaryGreen}`,
  },
  redBorder: {
    border: `1px solid ${theme.palette.common.primaryRed}`,
  },

  sliderWrapper: {
    position: 'relative',
    backgroundColor: theme.palette.common.secondaryCardBackground,
    display: 'flex',
    alignItems: 'center',
    // borderLeft: `1px solid ${theme.palette.common.primaryRed}`,
    // borderRight: `1px solid ${theme.palette.common.secondaryGreen}`,
  },

  point: {
    borderRadius: '100%',
    position: 'absolute',
  },

  worst: {
    background: theme.palette.common.primaryRed,
  },
  best: {
    background: theme.palette.common.secondaryGreen,
  },
  business: {
    background: theme.palette.common.primaryBlue,
  },
  cyan: {
    background: theme.palette.common.primaryCyan,
  },

  labels: {
    width: '100%',
    marginBottom: 3,
    display: 'flex',
    justifyContent: 'space-between',
    letterSpacing: 0.5,
  },
}))

const CommitteeSlider = ({
  data = {},
  fontSize = 6,
  titleFontSize = 7,
  sliderHeight = 15,
  height = 44,
  width = 70,
  pointSize = 5,
  mode = TripleSliderMode.outlined,
  fillBgColor = 'default',
}) => {
  const classes = useStyles()

  // let pointArr = [data.lb, ...data.points.map(val => val.value), data.ub, ...data.sliders.map(val => val.value)]
  // pointArr.sort((a, b) => a - b)
  // let min = pointArr[0]
  // let max = pointArr[pointArr.length - 1]

  const compare = (val1, val2) => {
    if (Math.abs(val1 - val2) < (pointSize / width) * 100) return true
    return false
  }

  return (
    <div className={classes.root}>
      <div className={classes.labels}>
        <span className={classes.label} style={{ fontSize: fontSize }}>
          {data.lb}%
        </span>
        <span className={classes.label} style={{ fontSize: fontSize }}>
          {data.ub}%
        </span>
      </div>
      <div
        className={clsx(classes.sliderWrapper, {
          [classes.blueBorder]: data.color === 'blue',
          [classes.cyanBorder]: data.color === 'cyan',
          [classes.secondaryBlueBorder]: data.color === 'secondBlue',
          [classes.greenBorder]: data.color === 'green',
          [classes.secondaryGreenBorder]: data.color === 'secondGreen',
          [classes.redBorder]: data.color === 'red',
        })}
        style={{
          height: sliderHeight,
          width: width,
          fontSize: fontSize,
          borderRadius: sliderHeight / 2,
        }}
      >
        {!compare(data.points[0].value, data.points[2].value) ? (
          <div
            className={clsx(classes.point, classes.worst)}
            style={{ height: pointSize, width: pointSize, top: 5, left: (width * (data.points[0].value - 0)) / 100 }}
          ></div>
        ) : (
          <>
            <div
              className={clsx(classes.point, classes.worst)}
              style={{
                height: pointSize,
                width: pointSize,
                top: 2.5,
                left: (width * (data.points[0].value - 0)) / 100,
              }}
            ></div>
            <div
              className={clsx(classes.point, classes.business)}
              style={{
                height: pointSize,
                width: pointSize,
                top: 7.5,
                left: (width * (data.points[0].value - 0)) / 100,
              }}
            ></div>
          </>
        )}
        {!compare(data.points[1].value, data.points[2].value) ? (
          <div
            className={clsx(classes.point, classes.best)}
            style={{ height: pointSize, width: pointSize, top: 5, left: (width * (data.points[1].value - 0)) / 100 }}
          ></div>
        ) : (
          <>
            <div
              className={clsx(classes.point, classes.best)}
              style={{
                height: pointSize,
                width: pointSize,
                top: 2.5,
                left: (width * (data.points[1].value - 0)) / 100,
              }}
            ></div>
            <div
              className={clsx(classes.point, classes.business)}
              style={{
                height: pointSize,
                width: pointSize,
                top: 7.5,
                left: (width * (data.points[1].value - 0)) / 100,
              }}
            ></div>
          </>
        )}
        {!compare(data.points[0].value, data.points[2].value) &&
          !compare(data.points[1].value, data.points[2].value) && (
            <div
              className={clsx(classes.point, classes.business)}
              style={{ height: pointSize, width: pointSize, top: 5, left: (width * (data.points[2].value - 0)) / 100 }}
            ></div>
          )}
      </div>
      {data.title && <div className={classes.title}>{data.title}</div>}
    </div>
  )
}

export default CommitteeSlider
