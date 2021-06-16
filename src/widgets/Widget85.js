import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'
import clsx from 'clsx'
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    paddingBottom: 10,
    WebkitTextSizeAdjust: 'none',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.83,
  },
  wrapperContext: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    fontFamily: theme.typography.thinFontFamily,
    marginTop: 4,
    paddingLeft: 8,
    paddingRight: 3,
  },
  blackFont: {
    color: theme.palette.common.primaryBlack,
  },
  greenFont: {
    color: theme.palette.common.primaryGreen,
  },
  cyanFont: {
    color: theme.palette.common.primaryCyan,
  },
  blueFont: {
    color: theme.palette.common.thirdBlue,
  },
  subText: {
    fontSize: 9,
    lineHeight: '14.83px',
    letterSpacing: 0.68,
    fontWeight: 100,
  },
  mainText: {
    fontSize: 25,
    lineHeight: '29.83px',
    letterSpacing: 2.08,
    fontWeight: 200,
    marginTop: 4,
  },
}))

const Widget85 = ({ style = {}, width = 500, height = 300, topic = 'topic-85' }) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) return null
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
        <div className={classes.body}>
          <div
            className={clsx(classes.wrapperContext, {
              [classes.blueFont]: data.color === 'blue',
              [classes.cyanFont]: data.color === 'cyan',
              [classes.greenFont]: data.color === 'green',
            })}
          >
            <div className={classes.subText}>{data.subText}</div>
            <div className={classes.mainText}>{data.mainText}</div>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget85
