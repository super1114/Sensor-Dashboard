import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import { TripleSliderMode } from 'constants/common'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: 'calc(100% - 10px)',
    margin: 5,
    fontFamily: theme.typography.thinFontFamily,
    letterSpacing: 0.5,
  },

  title: {
    padding: 0,
    margin: 0,
    fontFamily: theme.typography.mediumFontFamily,
    letterSpacing: 1.5,
    marginBottom: 8.5,
  },
  sliderWrapper: {
    position: 'relative',
    // borderLeft: `1px solid ${theme.palette.common.primaryRed}`,
    // borderRight: `1px solid ${theme.palette.common.secondaryGreen}`,
  },

  minimumBar: {
    position: 'absolute',
    top: 0,
    height: 16,
    width: 2,
    backgroundColor: theme.palette.common.primaryRed,
  },

  maximumBar: {
    position: 'absolute',
    backgroundColor: theme.palette.common.secondaryGreen,
    width: 2,
    height: 16,
  },

  sliderBar: {
    position: 'absolute',
    backgroundColor: theme.palette.common.primaryText,
    width: 2,
    height: 16,
  },

  filled: {
    border: 'unset',
    borderRadius: 10,
    background: theme.palette.common.secondaryCardBackground,
  },
  middleBar: {
    borderBottom: `1px solid ${theme.palette.common.primaryText}`,
    width: '100%',
    height: '50%',
  },
  point: {
    width: 16,
    height: 16,
    borderRadius: '100%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  sliders: {
    position: 'absolute',
  },
  slidersLabel: {
    textAlign: 'center',
    position: 'absolute',
    top: -45,
    left: -25,
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

  outline: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'transparent',
    border: '2px solid',
    width: 12,
    height: 12,
    borderRadius: '100%',
  },
  outlineWorst: {
    border: `3px solid ${theme.palette.common.primaryRed}`,
  },
  outlineBest: {
    border: `3px solid ${theme.palette.common.secondaryGreen}`,
  },
  outlineBusiness: {
    border: `3px solid ${theme.palette.common.primaryBlue}`,
  },
  outlineCyan: {
    border: `3px solid ${theme.palette.common.primaryCyan}`,
  },

  textStyleStart: {
    textAlign: 'start',
    marginLeft: 20,
  },
  textStyleCenter: {
    textAlign: 'center',
  },
  textStyleEnd: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  boldLabel: {
    fontFamily: theme.typography.mediumFontFamily,
  },
}))

const HorizontalTripleSlider = ({
  sticky = false,
  fontSize = 15,
  width = '100%',
  sliderHeight = 20,
  sliderWidth = 1,
  title = null,
  titleOffset = 0,

  reversed = false,
  lb,
  ub,
  lbLabel = null,
  ubLabel = null,
  lbText,
  ubText,
  points = [],
  sliders = [],
  pointSize = 16,

  mode = TripleSliderMode.outlined,
  fillBgColor = 'default',
}) => {
  const classes = useStyles()

  let pointArr = [lb, ...points.map(val => val.value), ub, ...sliders.map(val => val.value)]
  pointArr.sort((a, b) => a - b)
  let min = pointArr[0]
  let max = pointArr[pointArr.length - 1]

  return (
    <div className={classes.root}>
      {title && (
        <p className={classes.title} style={{ fontSize: fontSize, marginLeft: titleOffset }}>
          {title}
        </p>
      )}
      <div
        className={clsx(classes.sliderWrapper, {
          [classes.filled]: mode === TripleSliderMode.filled,
        })}
        style={{
          height: sliderHeight,
          width,
          fontSize,
          background: mode === TripleSliderMode.filled && fillBgColor !== 'default' && fillBgColor,
        }}
      >
        {/* Draw minimum & maximum bars */}
        <div
          className={classes.minimumBar}
          style={{
            height: sliderHeight,
            left: reversed ? `${100 * ((ub - min) / (max - min))}%` : `${100 * ((lb - min) / (max - min))}%`,
            width: mode !== TripleSliderMode.outlined && 0,
          }}
        >
          {lbText ? (
            <div
              className={reversed ? classes.textStyleEnd : null}
              style={{
                marginTop: sliderHeight,
                alignItems: !sticky && 'center',
                marginLeft: !sticky && !reversed && -10,
              }}
            >
              <div style={{ height: 5 }}></div>
              {lbLabel && (
                <p className={classes.boldLabel} style={{ margin: 0, padding: 0, fontSize: fontSize + 2 }}>
                  {lbLabel}
                </p>
              )}
              {lbText.split(' ').map((each, idx) => {
                return (
                  <p style={{ margin: 0, padding: 0, top: sliderHeight }} key={`horizontalTripleSlider-${idx}`}>
                    {each}
                  </p>
                )
              })}
            </div>
          ) : (
            <></>
          )}
        </div>

        <div
          className={classes.maximumBar}
          style={{
            height: sliderHeight,
            left: reversed ? `${100 * ((max - ub) / (max - min))}%` : `${100 * ((ub - min) / (max - min))}%`,
            width: mode !== TripleSliderMode.outlined && 0,
          }}
        >
          {ubText ? (
            <div
              className={[reversed ? null : classes.textStyleEnd]}
              style={{
                marginTop: sliderHeight,
                alignItems: !sticky && 'center',
                marginLeft: !sticky && reversed && -10,
              }}
            >
              <div style={{ height: 5 }}></div>
              {ubLabel && (
                <p className={classes.boldLabel} style={{ margin: 0, padding: 0, fontSize: fontSize + 2 }}>
                  {ubLabel}
                </p>
              )}
              {ubText.split(' ').map((each, idx) => {
                return (
                  <p style={{ margin: 0, padding: 0, top: sliderHeight }} key={`horizontalTripleSlider-${idx}`}>
                    {each}
                  </p>
                )
              })}
            </div>
          ) : (
            <></>
          )}
        </div>

        {sliders.map((each, idx) => {
          return (
            <div
              className={classes.sliders}
              key={idx}
              style={{
                left: reversed
                  ? `${100 * ((max - each.value) / (max - min))}%`
                  : `${100 * ((each.value - min) / (max - min))}%`,
                top: 0,
              }}
            >
              <div className={classes.slidersLabel} style={{ left: -fontSize * 2 }}>
                {each.label}
                {each.valueLabel && (
                  <div className={classes.boldLabel} style={{ fontSize: fontSize + 2 }}>
                    {each.valueLabel}
                  </div>
                )}
              </div>
              <div
                className={classes.sliderBar}
                key={idx}
                style={{
                  height: sliderHeight,
                }}
              ></div>
            </div>
          )
        })}

        {mode === TripleSliderMode.outlined && (
          <div className={classes.middleBar} style={{ borderWidth: sliderWidth, marginTop: sliderWidth / -2 }}></div>
        )}
        {points.map((point, index) => {
          return point.mode === 'outline' ? (
            <div
              className={clsx(classes.outline, {
                [classes.outlineBusines]: point.status === 'business',
                [classes.outlineBest]: point.status === 'best',
                [classes.outlineWorst]: point.status === 'worst',
                [classes.outlineCyan]: point.status === 'cyan',
              })}
              style={{
                left: reversed
                  ? `${100 * ((max - point.value) / (max - min))}%`
                  : `${100 * ((point.value - min) / (max - min))}%`,
                width: pointSize - 4,
                height: pointSize - 4,
              }}
              key={`point-${index}`}
            ></div>
          ) : (
            <div
              className={clsx(classes.point, {
                [classes.business]: point.status === 'business',
                [classes.best]: point.status === 'best',
                [classes.worst]: point.status === 'worst',
                [classes.cyan]: point.status === 'cyan',
              })}
              style={{
                left: reversed
                  ? `${100 * ((max - point.value) / (max - min))}%`
                  : `${100 * ((point.value - min) / (max - min))}%`,
                width: pointSize,
                height: pointSize,
              }}
              key={`point-${index}`}
            ></div>
          )
        })}
      </div>
    </div>
  )
}

export default HorizontalTripleSlider
