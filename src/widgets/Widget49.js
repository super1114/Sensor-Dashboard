import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import HorizontalProgressBar from 'components/processes/HorizontalProgressBar'
import Triangle from 'components/basic_components/Triangle'
import { CardMode, TriangleMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'
import { toMillion, toBillion } from 'helpers/helpers'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 8,
    padding: 5,
    letterSpacing: 1.5,
    width: '100%',
    height: 'auto',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 0.93,
    fontSize: 11.2,
    marginBottom: 11,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 10,
    letterSpacing: 0.83,
    color: theme.palette.common.primaryText,
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
  progressBarTitle: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 0.93,
    fontSize: 11.2,
    marginBottom: 15.7,
  },
  mainValue: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 37.31,
    letterSpacing: 3.11,
  },
  value: {
    fontFamily: theme.typography.mediumFontFamily,
    textAlign: 'center',
    width: '100%',
    fontSize: 24.87,
    letterSpacing: 2.07,
  },
}))

const Widget49 = ({ style = {}, width = 255, height = 185, topic = 'topic-49' }) => {
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
        paddingLeft: 7.5,
        paddingRight: 7.5,
        paddingTop: 6.5,
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

        {(title === 'Total Equity' || title === 'Common Equity Tier 1 (£)') && (
          <div className={classes.body}>
            <div className={classes.value}>
              £<span className={classes.mainValue}>{toBillion(data.value).toFixed(1)}</span>bn
            </div>

            <div className={classes.meta} style={{ marginTop: 7.22, marginBottom: 25 }}>
              <Triangle bottomWidth={8} width={7} mode={TriangleMode.business} />
              <span style={{ marginTop: -2, marginLeft: 5 }}>
                +£{toMillion(data.plus)}m, {((100 * data.plus) / data.value).toFixed(1)}% on prior year
              </span>
            </div>

            <div className={classes.progressBarTitle}>{data.progressBarTitle}</div>
            <div style={{ width: 220 }}>
              <HorizontalProgressBar
                {...data}
                bkColor={'cyan'}
                innerColor={'thirdBlue'}
                value={data.value + data.plus}
                progressLabelFontSize={6.3}
              />
            </div>
          </div>
        )}

        {(title === 'Retained Earnings' || title === 'Common Equity Tier 1 (%)') && (
          <div className={classes.body}>
            {title === 'Retained Earnings' && (
              <div className={classes.value}>
                £<span className={classes.mainValue}>{toMillion(data.value)}</span>m
              </div>
            )}
            {title === 'Common Equity Tier 1 (%)' && (
              <div className={classes.value}>
                <span className={classes.mainValue}>{data.value}</span>
              </div>
            )}

            {data.meta && (
              <div className={classes.meta} style={{ marginBottom: 10, marginTop: 3 }}>
                {data.meta}
              </div>
            )}

            <div className={classes.meta} style={{ marginTop: data.meta ? 5 : 20 }}>
              <Triangle bottomWidth={8} width={7} type={data.growth} mode={TriangleMode.business} />
              <span style={{ marginTop: -2, marginLeft: 5 }}>{data.growthLabel}</span>
            </div>
          </div>
        )}
      </div>
    </DashboardCard>
  )
}

export default Widget49
