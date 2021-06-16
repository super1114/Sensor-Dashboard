import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import GradientProgress from 'components/processes/GradientProgress'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    fontFamily: theme.typography.mediumFontFamily,
  },
  path: {
    fill: 'transparent',
    stroke: theme.palette.common.primaryText,
  },
  yearMark: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 12,
    marginBottom: 5,
    lineHeight: '14px',
    letterSpacing: 1,
    textAlign: 'left',
  },
  priceMark: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 8,
    lineHeight: '9px',
    letterSpacing: 0.6666666865348816,
    textAlign: 'center',
    flex: 1,
  },
  valueWrapper: {
    height: 15,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  },
  pathBold: {
    strokeWidth: 2,
  },
  pathMedium: {
    strokeWidth: 1,
  },
  pathLight: {
    strokeWidth: 0.5,
  },
  pathUltraLight: {
    strokeWidth: 0.3,
  },

  gradientBars: {
    position: 'absolute',
    top: 18,
    left: 10,
  },
  eachProcess: {
    height: 35,
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
  },

  valueText: {
    fontSize: 8,
    fontFamily: theme.typography.mediumFontFamily,
    position: 'absolute',
  },
  blueValueText: {
    color: theme.palette.common.thirdBlue,
  },
}))

const UnderlyingToStatuatoryGraph = ({ data = {}, width = 154, height = 250, max = 300, year = 2010 }) => {
  const classes = useStyles()

  // Calculate the height and each edgeWidth

  // Get offset function with particular data
  let graphWidth = width - 20
  let graphHeight = height - 40

  let startOffset = 74
  let halfWidth = graphWidth / 2 - 5

  const valueMarks = []
  for (let i = 0; i < 5; i++) {
    let val = (max / 2) * i - max
    if (val < 0) val = '(' + Math.abs(val) + ')'
    valueMarks.push(
      <div className={classes.priceMark} key={i}>
        {val}
      </div>
    )
  }

  const grids = []
  for (let i = 0; i <= 20; i++) {
    let xPos = (i * graphWidth) / 20
    grids.push(
      <path
        key={`horizontalRuler${i}`}
        className={clsx(classes.path, {
          [classes.pathMedium]: i % 5 === 0,
          [classes.pathBold]: i === 10,
          [classes.pathUltraLight]: i !== 10 && i % 5 !== 0,
        })}
        d={`M ${xPos} 0, L ${xPos} ${graphHeight}`}
      />
    )
  }

  grids.push(
    <path key={'vertical 1'} className={clsx(classes.path, classes.pathLight)} d={`M 0 0.5, L ${graphWidth} 0.5`} />
  )
  grids.push(
    <path
      key={'vertical 2'}
      className={clsx(classes.path, classes.pathLight)}
      d={`M 0 ${graphHeight - 0.5}, L ${graphWidth} ${graphHeight - 0.5}`}
    />
  )

  let statustory = data.underlying - data.ipoShare - data.strategicItem - data.simplification - data.fairValue
  return (
    <div className={classes.root}>
      <div className={classes.yearMark}>{year}</div>
      <svg
        width={graphWidth}
        height={graphHeight}
        viewBox={`0 0 ${graphWidth} ${graphHeight}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {grids}
      </svg>
      <div className={classes.gradientBars}>
        <div className={classes.eachProcess} style={{ marginLeft: startOffset }}>
          <GradientProgress
            value={data.underlying}
            maxValue={max}
            mode={'success'}
            color={'blueDark'}
            progressWidth={halfWidth}
            radius={0}
            width={80}
            height={20}
            labelShownMode={'right'}
            valueLabel={`${data.underlying ? data.underlying.toFixed(1) : '-'}`}
          />
        </div>
        <div
          className={classes.eachProcess}
          style={{ marginLeft: startOffset - 3 - (halfWidth * data.ipoShare) / max }}
        >
          <GradientProgress
            value={data.ipoShare}
            maxValue={max}
            mode={'success'}
            color={'blueDarkRevert'}
            progressWidth={halfWidth}
            radius={0}
            width={80}
            height={20}
            labelShownMode={'left'}
            valueLabel={`(${data.ipoShare ? data.ipoShare.toFixed(1) : '-'})`}
          />
        </div>
        <div
          className={classes.eachProcess}
          style={{ marginLeft: startOffset - 3 - (halfWidth * data.strategicItem) / max }}
        >
          <GradientProgress
            value={data.strategicItem}
            maxValue={max}
            mode={'success'}
            color={'blueDarkRevert'}
            progressWidth={halfWidth}
            radius={0}
            width={80}
            height={20}
            labelShownMode={'left'}
            valueLabel={`(${data.strategicItem ? data.strategicItem.toFixed(1) : '-'})`}
          />
        </div>
        <div
          className={classes.eachProcess}
          style={{ marginLeft: startOffset - 3 - (halfWidth * data.simplification) / max }}
        >
          <GradientProgress
            value={data.simplification}
            maxValue={max}
            mode={'success'}
            color={'blueDarkRevert'}
            progressWidth={halfWidth}
            radius={0}
            width={80}
            height={20}
            labelShownMode={'left'}
            valueLabel={`(${data.simplification ? data.simplification.toFixed(1) : '-'})`}
          />
        </div>
        <div
          className={classes.eachProcess}
          style={{ marginLeft: startOffset - 3 - (halfWidth * data.fairValue) / max }}
        >
          <GradientProgress
            value={data.fairValue}
            maxValue={max}
            mode={'success'}
            color={'blueDarkRevert'}
            progressWidth={halfWidth}
            radius={0}
            width={80}
            height={20}
            labelShownMode={'left'}
            valueLabel={`(${data.fairValue ? data.fairValue.toFixed(1) : '-'})`}
          />
        </div>
        <div className={classes.eachProcess} style={{ marginLeft: startOffset }}>
          <GradientProgress
            value={statustory}
            maxValue={max}
            mode={'success'}
            color={'blueDark'}
            progressWidth={halfWidth}
            radius={0}
            width={80}
            height={20}
            labelShownMode={'right'}
            valueLabel={`${statustory ? statustory.toFixed(1) : '-'}`}
          />
        </div>
      </div>
      <div className={classes.valueWrapper}>{valueMarks}</div>
    </div>
  )
}

export default UnderlyingToStatuatoryGraph
