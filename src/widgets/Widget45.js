import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import ProcessLine from 'components/processes/ProcessLine'
import clickBadge from '../assets/icons/click.svg'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'
import { loadingTime } from '../constants/common'

import mqttService from 'service/mqtt'
const client = mqttService.getClient(() => {})

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 8,
    padding: 5,
    letterSpacing: 1.5,
    height: 'auto',
    WebkitTextSizeAdjust: 'none',
  },
  title: {
    fontFamily: theme.typography.MediumFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 1.5,
    fontSize: 18,
    marginBottom: 5,
  },
  subtitle: {
    width: 70,
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 10,
    letterSpacing: 0.83,
  },
  percentage: {
    width: 21,
    fontFamily: theme.typography.lightFontFamily,
    textAlign: 'right',
    fontSize: 10,
    letterSpacing: 0.83,
  },
  totalRating: {
    marginTop: 10,
    whiteSpace: 'nowrap',
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 10,
  },
  eachRate: {
    fontFamily: theme.typography.lightFontFamily,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 11,
    marginTop: 16,
  },
  titleBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
  },
}))

const Widget45 = ({ style = {}, width = 320, height = 298, topic = 'topic-45', setFilter = filter => {} }) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) {
    setTimeout(() => {
      mqttService.publish(client, 'toolbar-relevance', 'reliance')
    }, loadingTime)
    return ''
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        borderRadius: 8,
        width: width,
        height: height,
      }}
    >
      <div
        className={classes.root}
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <div className={classes.title}>{title}</div>
        <a onClick={() => setFilter('topics')}>
          <img src={clickBadge} className={classes.titleBadge} alt="Click Badge Icon" />
        </a>
        {data.map((item, idx) => {
          return (
            <div className={classes.eachRate} key={idx}>
              <span className={classes.subtitle}>{item.label}</span>
              <ProcessLine height={14} width={180} value={item.percentage} radius={7} processColor={'blue'} />
              <div className={classes.percentage}>{item.percentage}%</div>
            </div>
          )
        })}
      </div>
    </DashboardCard>
  )
}

export default Widget45
