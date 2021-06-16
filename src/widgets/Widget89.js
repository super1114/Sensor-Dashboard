import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import clsx from 'clsx'

import checkSvg from 'assets/icons/checkGreen.svg'
import alertRed from 'assets/icons/alertRed.svg'
import checkMark from 'assets/icons/checkMark.svg'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    WebkitTextSizeAdjust: 'none',
    position: 'relative',
    width: '100%',
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

  eachCheck: {
    height: 18,
    marginTop: 2.5,
    marginBottom: 2.5,
    fontSize: 10,
    fontFamily: theme.typography.lightFontFamily,
    letterSpacing: 0.83,
    lineHeight: '11.72px',
    color: theme.palette.common.primaryText,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 178,
  },
  infoWrapper: {
    marginTop: 7,
    height: 80,
    width: 171,
    border: `3px solid ${theme.palette.common.primaryRed}`,
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
    height: 23.6,
    position: 'absolute',
    bottom: -7,
    right: -12,
    background: `url(${alertRed})`,
    backgroundSize: '100%, 100%',
  },
  transparent: {
    background: 'rgba(246, 92, 107, 0.1)',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
}))

const Widget89 = ({ style = {}, width = 500, height = 300, topic = 'topic-89' }) => {
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
        padding: 10,
        paddingTop: 5,
        paddingBottom: 0,
        width: width,
        height: height,
        overflow: 'initial',
      }}
    >
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        {data.checklist.map((each, idx) => {
          return (
            <div className={classes.eachCheck} key={idx}>
              {each.content}
              {each.type === 'checked' && <img src={checkSvg} width={14} height={15} alt="check button"></img>}
            </div>
          )
        })}

        <div className={classes.infoWrapper}>
          <div className={classes.transparent}></div>
          <div className={classes.icon}></div>
          <span style={{ paddingLeft: 4 }}>{data.info.content}</span>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget89
