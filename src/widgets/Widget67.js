import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import clsx from 'clsx'
import useNodeRed from 'hooks/useNodeRed'

import ShareHolderRankingGraph from 'components/graphs/ShareHolderRankingGraph'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'auto',
    WebkitTextSizeAdjust: 'none',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.83,
    marginBottom: 5,
  },
  value: {
    fontSize: 45,
    letterSpacing: 3.75,
    lineHeight: '53px',
    fontFamily: theme.typography.ultralightFontFamily,
  },
  meta: {
    fontFamily: theme.typography.thinFontFamily,
    fontSize: 14,
    letterSpacing: 1.17,
    lineHeight: '16.41px',
    width: 155,
    textAlign: 'center',
  },

  blue: {
    color: theme.palette.common.thirdBlue,
  },
  green: {
    color: theme.palette.common.secondaryGreen,
  },
  cyan: {
    color: theme.palette.common.primaryCyan,
  },
}))

const Widget67 = ({ style = {}, width = 586, height = 151, topic = 'topic-67' }) => {
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
        <div className={classes.body}>
          <div
            className={clsx(classes.value, {
              [classes.blue]: data.color === 'blue',
              [classes.cyan]: data.color === 'cyan',
              [classes.green]: data.color === 'green',
            })}
          >
            {data.percentage}%
          </div>
          <div
            className={classes.meta}
            style={{
              width: topic === 'topic-67-1' ? 87 : topic === 'topic-67-2' ? 155 : 100,
            }}
          >
            {data.name}
          </div>
        </div>
        <div style={{ height: 5 }}></div>
        <ShareHolderRankingGraph data={data} width={width - 20} height={95} />
      </div>
    </DashboardCard>
  )
}

export default Widget67
