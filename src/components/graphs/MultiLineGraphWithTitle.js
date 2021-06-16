import { makeStyles } from '@material-ui/core/styles'

import MultiLineGraph from './MultiLineGraph'
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

const MultiLineGraphWithTitle = ({
  style = {},
  title = '',
  values = [],
  types = [],
  labels = [],
  suffix = null,
  prefix = null,
  noText = false,

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
  strokeType = null,

  titleWidth = 0.25,
  titleMargin = 5,
  titleAlign = 'center',
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
          })}
          style={{
            fontSize: fontSize,
            width: `${titleWidth * 100}%`,
            height: height + 10,
            marginTop: -15,
            marginRight: `${titleMargin}%`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: titleTextAlign === 'left' ? 'flex-start' : titleTextAlign === 'center' ? 'center' : 'flex-end',
            paddingBottom: titleAlign === 'flex-end' ? 12 : 0,
          }}
        >
          {types.map((each, idx) => (
            <div key={idx}>
              {title}
              <span
                className={clsx({
                  [classes.green]: each.color === 'green',
                  [classes.red]: each.color === 'red',
                  [classes.white]: each.color === 'white',
                  [classes.cyan]: each.color === 'cyan',
                  [classes.blue]: each.color === 'blue',
                })}
              >
                {each.title}
              </span>
            </div>
          ))}
        </div>
        <MultiLineGraph
          values={values}
          types={types}
          fontSize={fontSize}
          edgeWidth={(width * (1 - titleWidth)) / values.length}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          strokeWidth={strokeWidth}
          suffix={'%'}
          prefix={prefix}
          strokeType={strokeType}
          height={height}
          labelYPosition={labelYPosition}
          labelXPosition={labelXPosition}
          fontBold={fontBold}
          noText={noText}
          textTopOffset={-10}
        />
      </div>
    </div>
  )
}

export default MultiLineGraphWithTitle
