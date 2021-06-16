import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import { TriangleType, TriangleMode } from 'constants/common'

const useStyles = makeStyles(theme => ({
  root: {
    width: 0,
    height: 0,
  },
  danger: {
    borderColor: theme.palette.common.primaryRed,
  },
  success: {
    borderColor: theme.palette.common.secondaryGreen,
  },
  business: {
    borderColor: theme.palette.common.primaryBlue,
  },
  up: {
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottomWidth: 10,
    borderBottomStyle: 'solid',
  },
  down: {
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderTopWidth: 10,
    borderTopStyle: 'solid',
  },
}))

const Triangle = ({
  type = TriangleType.up,
  mode = TriangleMode.success,
  bottomWidth = 15,
  width = 10,
}) => {
  const classes = useStyles()

  const widthStyleUp = {
    borderLeft: `${width}px solid transparent`,
    borderRight: `${width}px solid transparent`,
    borderBottomWidth: bottomWidth,
    borderBottomStyle: 'solid',
  }

  const widthStyleDown = {
    borderLeft: `${width}px solid transparent`,
    borderRight: `${width}px solid transparent`,
    borderTopWidth: bottomWidth,
    borderTopStyle: 'solid',
  }

  return (
    <div
      className={clsx(classes.root, {
        [classes.success]: mode === TriangleMode.success,
        [classes.danger]: mode === TriangleMode.danger,
        [classes.business]: mode === TriangleMode.business,
        [classes.up]: type === TriangleType.up,
        [classes.down]: type === TriangleType.down,
      })}

      style={type === TriangleType.up ? widthStyleUp : widthStyleDown}
    ></div>
  )
}

export default Triangle
