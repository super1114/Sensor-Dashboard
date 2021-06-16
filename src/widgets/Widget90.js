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
    height: 135,
    width: 175,
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
    padding: 4,
    display: 'flex',
    justifyContent: 'space-between',
  },
  infoArea: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
    letterSpacing: 0.83,
    lineHeight: '11.72px',
    width: 87,
    position: 'relative',
    '&::after': {
      width: 0.3,
      height: 120,
      backgroundColor: theme.palette.common.primaryText,
      content: `''`,
      position: 'absolute',
      top: -3,
      right: -3,
    },
  },
  listArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: 90,
    marginTop: -5,
  },
  each: {
    width: 70,
    fontSize: 7,
    lineHeight: '8.2px',
    letterSpacing: 0.58,
    marginBottom: 7.5,
  },
}))

const Widget90 = ({ style = {}, width = 500, height = 300, topic = 'topic-90' }) => {
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

        <div className={classes.infoWrapper}>
          <div className={classes.transparent}></div>
          <div className={classes.icon}></div>
          <div className={classes.body}>
            <div className={classes.infoArea}>{data.info}</div>
            <div className={classes.listArea}>
              {data.list.map((each, idx) => {
                return (
                  <div className={classes.each} key={idx}>
                    {each}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget90
