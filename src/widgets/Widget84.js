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
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 10,
    fontWeight: 300,
    lineHeight: '11.93px',
    letterSpacing: 0.21,
    marginTop: 4,
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
}))

const Widget84 = ({ style = {}, width = 500, height = 300, topic = 'topic-84' }) => {
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
          {data.map((each, idx) => {
            return (
              <div
                key={idx}
                className={clsx(classes.wrapperContext, {
                  [classes.blueFont]: each.color === 'blue',
                  [classes.cyanFont]: each.color === 'cyan',
                  [classes.greenFont]: each.color === 'green',
                })}
              >
                {each.text}
              </div>
            )
          })}
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget84
