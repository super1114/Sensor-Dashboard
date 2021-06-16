import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  sliderWrapper: {
    position: 'relative',
    borderTop: `1px solid #fff`,
    borderBottom: `1px solid #fff`,
  },
  boundTextWrapper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    right: 0,
    top: 0,
    bottom: 0,
    width: 50,
    transform: 'translateX(115%)',
  },
  boundText: {
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.secondaryText,
    fontSize: 14,
  },
  upper: {
    transform: 'translateY(-50%)',
  },
  lower: {
    transform: 'translateY(50%)',
  },
  middleBar: {
    borderRight: `1px solid #fff`,
    height: '100%',
    width: '50%',
  },
  title: {},
  svg: {
    position: 'absolute',
    inset: 0,
  },
  point: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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
}))

const TripleSlider = ({ height = 150, title, lb, ub, lbText, ubText, points = [] }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.sliderWrapper} style={{ height, width: 20 }}>
        <div className={classes.middleBar}></div>
        {points.map((point, index) => {
          return (
            <div
              className={clsx(classes.point, {
                [classes.business]: point.status === 'business',
                [classes.best]: point.status === 'best',
                [classes.worst]: point.status === 'worst',
              })}
              style={{
                top: `${(1 - (point.value - lb) / (ub - lb)) * 100}%`,
              }}
              key={`point-${index}`}
            ></div>
          )
        })}
      </div>
      <div className={classes.boundTextWrapper}>
        <div className={clsx(classes.boundText, classes.upper)}>{ubText}</div>
        <div className={clsx(classes.boundText, classes.lower)}>{lbText}</div>
      </div>
    </div>
  )
}

export default TripleSlider
