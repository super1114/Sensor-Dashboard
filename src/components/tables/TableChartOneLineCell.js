import { makeStyles } from '@material-ui/core/styles'
import Triangle from 'components/basic_components/Triangle'
import clsx from 'clsx'
import { TriangleMode, TriangleType } from 'constants/common'
import { threeDots } from 'helpers/helpers'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    // flexDirection: 'column',
    color: theme.palette.common.primaryText,
    fontFamily: theme.typography.lightFontFamily,
    marginLeft: 6,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginBottom: 1,
    letterSpacing: 'initial',
  },
  wrapperColor: {
    fontFamily: theme.typography.thinFontFamily,
    letterSpacing: 1,
  },

  equal: {
    backgroundColor: theme.palette.common.primaryCyan,
    height: 2,
    marginLeft: '40%',
    width: 25,
    marginBottim: 4,
  },
  up: {
    color: theme.palette.common.primaryGreen,
    alignItems: 'center',
    display: 'flex',
  },
  down: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.common.primaryRed,
  },

  success: {
    borderColor: theme.palette.common.secondaryGreen,
  },
  business: {
    borderColor: theme.palette.common.primaryBlue,
  },

  upArrow: {
    fill: 'transparent',
    stroke: theme.palette.common.primaryGreen,
    strokeWidth: 2,
  },

  downArrow: {
    fill: 'transparent',
    stroke: theme.palette.common.primaryRed,
    strokeWidth: 2,
  },
  arrowWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 1,
  },
  arrowLabel: {
    fontFamily: theme.typography.lightFontFamily,
    letterSpacing: 1,
    fontSize: 6,
  },

  content: {
    fontFamily: theme.typography.lightFontFamily,
    letterSpacing: 0.8,
  },
  percentage: {
    fontFamily: theme.typography.ultralightFontFamily,
    fontSize: 6,
    marginLeft: 2,
    marginBottom: 1,
    letterSpacing: 0.67,
  },
}))

const TableChartOneLineCell = ({
  value = null,
  growth = null,
  percentage = null,
  width = 90,
  height = 60,
  fontSize = 8,
  styles = {},
  oneFixed = false,
  color = false,
}) => {
  const classes = useStyles()

  return (
    <div
      className={classes.wrapper}
      style={{
        width: width,
        height: height,
        fontSize: fontSize,
      }}
    >
      {growth ? (
        <div className={classes.arrowWrapper}>
          <Triangle
            type={growth === TriangleType.up ? TriangleType.up : TriangleType.down}
            mode={growth === TriangleType.up ? TriangleMode.success : TriangleMode.danger}
            bottomWidth={6}
            width={5}
          />
          <div className={clsx(classes.arrowLabel, color && classes.wrapperColor)}>
            {growth === TriangleType.up ? `${value}bps` : `(${value})bps`}
          </div>
        </div>
      ) : (
        <div className={color ? classes.wrapperColor : classes.content}>
          {isNaN(value)
            ? value
            : value == null
            ? ''
            : oneFixed === true
            ? threeDots(value.toFixed(1).toString())
            : threeDots(value)}
        </div>
      )}
      {percentage && <div className={classes.percentage}>({percentage}%)</div>}
    </div>
  )
}

export default TableChartOneLineCell
