import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Check } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    fontFamily: theme.typography.mediumFontFamily,
    position: 'relative',
    borderRadius: 10,
    minWidth: 100,
  },
  success: {
    border: `6px solid ${theme.palette.common.secondaryGreen}`,
    borderRadius: 10
  },

  successGradientTransparent: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    background: 'linear-gradient(to right, #98D265,#E8F2B5)',
    opacity: 0.15
  },

  value: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 40,
  },
  growthValue: {
    fontFamily: theme.typography.boldFontFamily,
    fontSize: 60,
  },
  meta: {
    fontSize: 20,
    marginTop: 10,
  },
  checkIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    transform: 'translate(50%, 50%)',
    color: '#fff',
    width: 40,
    height: 40,
    borderRadius: 40,
    background: theme.palette.common.secondaryGreen,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const ROIWidget = ({ value, status, meta, style }) => {
  const classes = useStyles()

  return (
    <div
      className={clsx(classes.root, {
        [classes.success]: status === 'success',
      })}
      style={{ ...style }}
    >
      <div
        className={status === 'success' ? classes.successGradientTransparent : null}
      ></div>
      <div className={classes.value}><span className={classes.growthValue}>{parseFloat(value).toFixed(1)}</span>%</div>
      <div className={classes.meta}>{meta}</div>
      {status === 'success' && (
        <div className={classes.checkIcon}>
          <Check style={{ fontSize: 35 }} />
        </div>
      )}
    </div>
  )
}

export default ROIWidget
