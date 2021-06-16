import { TriangleMode, TriangleType } from 'constants/common'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  dangerTriangle: {
    stroke: theme.palette.common.primaryRed,
    fill: 'transparent',
    strokeWidth: 1,
  },
  successTriangle: {
    stroke: theme.palette.common.secondaryGreen,
    fill: 'transparent',
    strokeWidth: 1,
  },
  businessTriangle: {
    stroke: theme.palette.common.primaryBlue,
    fill: 'transparent',
    strokeWidth: 1,
  },
  cyanTriangle: {
    stroke: theme.palette.common.primaryCyan,
    fill: 'transparent',
    strokeWidth: 1,
  },
}))

const OutlineTriangle = ({
  width = 11,
  height = 7,
  type = TriangleType.up,
  mode = TriangleMode.success,
  strokeWidth = 0.5,
}) => {
  const classes = useStyles()

  if (type === TriangleType.up)
    return (
      <svg width={width} height={height} style={{ fill: 'transparent' }}>
        <path
          d={`M ${strokeWidth} ${height - strokeWidth} L ${width - strokeWidth} ${height - strokeWidth} L ${
            width / 2
          } ${strokeWidth} Z`}
          className={clsx({
            [classes.successTriangle]: mode === TriangleMode.success,
            [classes.dangerTriangle]: mode === TriangleMode.danger,
            [classes.businessTriangle]: mode === TriangleMode.business,
            [classes.cyanTriangle]:
              mode !== TriangleMode.success && mode !== TriangleMode.danger && mode !== TriangleMode.business,
          })}
          strokeWidth={strokeWidth}
        />
      </svg>
    )

  return (
    <svg width={width} height={height} style={{ fill: 'transparent' }}>
      <path
        d={`M ${strokeWidth} ${strokeWidth} L ${width - strokeWidth} ${strokeWidth} L ${width / 2} ${
          height - strokeWidth
        } Z`}
        className={clsx({
          [classes.successTriangle]: mode === TriangleMode.success,
          [classes.dangerTriangle]: mode === TriangleMode.danger,
          [classes.businessTriangle]: mode === TriangleMode.business,
          [classes.cyanTriangle]:
            mode !== TriangleMode.success && mode !== TriangleMode.danger && mode !== TriangleMode.business,
        })}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

export default OutlineTriangle
