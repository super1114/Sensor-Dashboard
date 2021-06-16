import { makeStyles } from '@material-ui/core/styles'

import LineGraph from './LineGraph'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  primaryTitle: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 0.67,
    width: '25%',
    marginRight: '5%',
  },
  secondaryTitle: {
    fontFamily: theme.typography.lightFontFamily,
    letterSpacing: 0.9,
    color: theme.palette.common.primaryText,
    width: '25%',
    marginRight: '5%',
  },

  green: {
    color: theme.palette.common.secondaryGreen,
  },
  white: {
    color: theme.palette.common.primaryText,
  },
  red: {
    color: theme.palette.common.primaryRed,
  },
  blue: {
    color: theme.palette.common.primaryBlue,
  },
  cyan: {
    color: theme.palette.common.primaryCyan,
  },

  body: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
  },
  twolines: {
    width: 74,
  },
}))

const LineGraphWithTitle = ({
  style = {},
  title = '',
  values = [],
  extraValues = [],
  extraCircle = false,
  extraStrokeColor = null,
  labels = [],
  suffix = null,
  prefix = null,
  noText = false,
  topic = null,

  height = 100,
  width = 1200,
  outerRadius = 8,
  innerRadius = 5,
  strokeWidth = 3,
  fontSize = 20,
  labelYPosition = 'bottom',
  labelXPosition = 'right',
  fontBold = false,

  titleTextAlign = 'left',
  strokeColor = 'blue',
  strokeType = null,

  titleWidth = 0.25,
  titleMargin = 5,
  titleColor = 'white',
  titleAlign = 'center',

  unit = null,
}) => {
  const classes = useStyles()

  return (
    <div style={{ ...style, width: width }}>
      <div
        className={classes.root}
        style={{
          fontSize: fontSize,
          alignItems: titleAlign,
        }}
      >
        <div
          className={clsx({
            [classes.primaryTitle]: fontBold,
            [classes.secondaryTitle]: !fontBold,
            [classes.green]: titleColor === 'green',
            [classes.red]: titleColor === 'red',
            [classes.white]: titleColor === 'white',
            [classes.cyan]: titleColor === 'cyan',
            [classes.blue]: titleColor === 'blue',
          })}
          style={{
            fontSize: fontSize,
            width: `${titleWidth * 100}%`,
            marginRight: `${titleMargin}%`,
            display: 'flex',
            justifyContent:
              titleTextAlign === 'left' ? 'flex-start' : titleTextAlign === 'center' ? 'center' : 'flex-end',
            paddingBottom: titleAlign === 'flex-end' ? 12 : 0,
          }}
        >
          <div
            className={topic === 'topic-68' ? classes.twolines : undefined}
            style={{ textAlign: titleTextAlign, width: title === 'Company to Market Non-Audit Spend' && 90 }}
          >
            {title}
          </div>
        </div>
        <LineGraph
          values={values}
          extraValues={extraValues}
          extraCircle={extraCircle}
          extraStrokeColor={extraStrokeColor}
          fontSize={fontSize}
          edgeWidth={(width * (1 - titleWidth)) / values.length}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          strokeWidth={strokeWidth}
          suffix={suffix}
          prefix={prefix}
          strokeColor={strokeColor}
          strokeType={strokeType}
          height={height}
          labelYPosition={labelYPosition}
          labelXPosition={labelXPosition}
          fontBold={fontBold}
          noText={noText}
          unit={unit}
        />
      </div>
    </div>
  )
}

export default LineGraphWithTitle
