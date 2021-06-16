import { makeStyles } from '@material-ui/core/styles'
import OutlineTriangle from 'components/basic_components/OutlineTriangle'
import clsx from 'clsx'
import { TriangleMode, TriangleType } from 'constants/common'
import EqualBarLine from 'components/basic_components/EqualBarLine'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    color: theme.palette.common.primaryText,
    fontFamily: theme.typography.mediumFontFamily,
    marginLeft: 6,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 1,
    letterSpacing: 'initial',
  },

  value: {
    fontSize: 8,
    lineHeight: '9.38px',
    letterSpacing: 0.67,
  },

  growthWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 20,
    fontSize: 6,
    letterSpacing: 0.5,
    lineHeight: '7.03px',
  },
  growthLabel: {
    marginTop: 1,
  },
  green: {
    color: theme.palette.common.secondaryGreen,
  },
  red: {
    color: theme.palette.common.primaryRed,
  },
  cyan: {
    color: theme.palette.common.primaryCyan,
  },
}))

const TableChartOneLineGrowthCell = ({
  value = null,
  growth = null,
  growthValue = null,

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
      <div className={classes.arrowLabel}>{value}</div>
      <div className={classes.growthWrapper}>
        {growthValue === 0 ? (
          <div className={classes.growthWrapper}>
            <EqualBarLine width={12} height={1} wrapperHeight={7} />
            <div className={clsx(classes.growthLabel, classes.cyan)}>-%</div>
          </div>
        ) : (
          <div className={classes.growthWrapper}>
            <OutlineTriangle
              type={growth === TriangleType.up ? TriangleType.up : TriangleType.down}
              mode={growth === TriangleType.up ? TriangleMode.success : TriangleMode.danger}
              bottomWidth={8}
              width={12}
              strokeWidth={0.3}
            />
            <div
              className={clsx(classes.growthLabel, {
                [classes.green]: growth === 'up',
                [classes.red]: growth === 'down',
              })}
            >
              {growthValue}%
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TableChartOneLineGrowthCell
