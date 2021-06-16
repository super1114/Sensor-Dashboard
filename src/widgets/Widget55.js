import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import HorizontalProgressBar from 'components/processes/HorizontalProgressBar'
import Triangle from 'components/basic_components/Triangle'
import { CardMode, TriangleMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'
import { toBillion } from 'helpers/helpers'
import rotateIcon from '../assets/icons/thin_rotate.svg'
import mqttService from 'service/mqtt'

const client = mqttService.getClient(() => {})

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 8,
    padding: 5,
    letterSpacing: 1.5,
    width: '100%',
    height: 'auto',
    WebkitTextSizeAdjust: 'none',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 0.93,
    fontSize: 11.2,
    marginBottom: 15,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 10,
    letterSpacing: 0.83,
    color: theme.palette.common.primaryText,
  },
  mainValue: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 46.78,
    letterSpacing: 3.9,
  },
  value: {
    fontFamily: theme.typography.mediumFontFamily,
    textAlign: 'center',
    width: '100%',
    fontSize: 31.22,
    letterSpacing: 2.6,
  },
  meta: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'inherit',
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 10,
    letterSpacing: 0.83,
    color: theme.palette.common.primaryText,
  },
  metaLabel: {
    fontSize: 12,
    lineHeight: '14px',
    letterSpacing: 1,
    marginTop: 35,
    fontFamily: theme.typography.thinFontFamily,
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    marginBottom: 50,
  },
  progressBarTitle: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 0.93,
    fontSize: 11.2,
    marginBottom: 15.7,
  },

  iconWrapper: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'flex-end',
    height: 27.52,
    width: 27.52,
    backgroundImage: `url("${rotateIcon}")`,
    backgroundSize: '100% 100%',
    top: 0,
    right: 5,
  },

  progressTitle: {
    fontSize: 6.7,
    fontFamily: theme.typography.mediumFontFamily,
    letterSpacing: 0.56,
    marginTop: -9,
    marginBottom: 2,
  },
}))

const Widget55 = ({ style = {}, width = 255, height = 185, topic = 'topic-55' }) => {
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
        marginLeft: 10,
        marginRight: 0,
        marginTop: 0,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 0,
        borderRadius: 8,
        width: width,
        height: height,
      }}
    >
      <div
        className={classes.root}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className={classes.title}>{title}</div>
        {topic === 'topic-55-1' && (
          <a
            onClick={() => {
              mqttService.publish(client, 'topic-51-1-mqtt')
            }}
            className={classes.iconWrapper}
          ></a>
        )}

        <div className={classes.body}>
          <div className={classes.value}>
            £<span className={classes.mainValue}>{toBillion(data.value).toFixed(1)}</span>bn
          </div>

          <div className={classes.meta} style={{ marginTop: 12 }}>
            <Triangle bottomWidth={11} width={9} mode={TriangleMode.business} />
            <span style={{ marginTop: -2, marginLeft: 5 }}>{data.growthLabel}</span>
          </div>

          <div className={classes.metaLabel}>{data.metaLabel}</div>

          <div style={{ width: width - 50 }}>
            {topic === 'topic-55' && <div className={classes.progressTitle}>Market</div>}
            <HorizontalProgressBar
              {...data}
              bkColor={'cyan'}
              innerColor={'thirdBlue'}
              value={data.value + data.plus}
              progressLabelFontSize={6.3}
            />
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget55
