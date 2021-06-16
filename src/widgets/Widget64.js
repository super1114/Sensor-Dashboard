import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import OutlookGraph from 'components/graphs/OutlookGraph.js'

import useNodeRed from 'hooks/useNodeRed'

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
    fontSize: 11.02,
    lineHeight: '13px',
    letterSpacing: 0.92,
    marginBottom: 20,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  eachGraph: {
    marginBottom: 34,
  },
}))

const Widget64 = ({ style = {}, width = 500, height = 300, topic = 'topic-64' }) => {
  const { title, data, years } = useNodeRed(topic)
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
        marginTop: 10,
        padding: 10,
        paddingTop: 8,
        paddingBottom: 0,
        width: width,
        height: height,
        overflow: 'initial',
      }}
    >
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.wrapper}>
          {data.map((each, idx) => (
            <div className={classes.eachGraph} key={idx} style={{ marginRight: idx % 2 === 0 ? 30 : 0 }}>
              <OutlookGraph width={280} height={130} years={years} data={each} suffix={'%'} />
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget64
