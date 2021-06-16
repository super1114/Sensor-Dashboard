import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import clsx from 'clsx'

import alertRed from 'assets/icons/alertRed.svg'
import informGreen from 'assets/icons/informGreen.svg'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    WebkitTextSizeAdjust: 'none',
    position: 'relative',
    width: '100%',
    overflow: 'initial',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.83,
    marginBottom: 1,
  },
  blue: {
    color: theme.palette.common.primaryBlue,
  },
  cyan: {
    color: theme.palette.common.primaryCyan,
  },
  secondaryBlue: {
    color: theme.palette.common.thirdBlue,
  },
  red: {
    color: theme.palette.common.primaryRed,
  },

  infoWrapper: {
    marginTop: 7,
    height: 123,
    width: 147,
    border: `3px solid ${theme.palette.common.secondaryGreen}`,
    position: 'relative',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    fontSize: 10,
    letterSpacing: 0.83,
    lineHeight: '11.72px',
    color: theme.palette.common.priamryText,
    fontFamily: theme.typography.lightFontFamily,
  },
  icon: {
    width: 23.6,
    height: 25.6,
    position: 'absolute',
    bottom: -9,
    right: -11,
    background: `url(${informGreen})`,
    backgroundSize: '100%, 100%',
  },
  transparent: {
    background: 'rgba(152, 210, 101, 0.1)',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  body: {
    padding: 9,
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'center',
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.83,
    fontFamily: theme.typography.lightFontFamily,
  },
}))

const Widget91 = ({ style = {}, width = 500, height = 300, topic = 'topic-91' }) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) {
    return ''
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        borderRadius: 8,
        margin: 0,
        padding: 6,
        paddingTop: 5,
        paddingBottom: 0,
        width: width,
        height: height,
        overflow: 'initial',
      }}
    >
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>

        <div className={classes.infoWrapper}>
          <div className={classes.transparent}></div>
          <div className={classes.icon}></div>
          <div className={classes.body}>{data.info}</div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget91
