import { makeStyles } from '@material-ui/core/styles'

import clsx from 'clsx'
import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontSize: 8,
    padding: 5,
    WebkitTextSizeAdjust: 'none',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 12.32,
    lineHeight: '14.5px',
    letterSpacing: 0.62,
    display: 'flex',
    alignItems: 'flex-end',
  },
  blueTextColor: {
    color: theme.palette.common.primaryBlue,
  },
  cyanTextColor: {
    color: theme.palette.common.primaryCyan,
  },

  body: {
    display: 'flex',
    marginTop: 5,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    width: '100%',
  },
  wrapperContext: {
    height: 110,
    width: 116,
    padding: 4,
    boxSizing: 'border-box',
    paddingTop: 8,
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    fontSize: 8,
    lineHeight: '9.38px',
    letterSpacing: 0.67,
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    borderRadius: 8,
    backgroundColor: theme.palette.common.secondaryCardBackground,
    marginBottom: 8,
  },
  contentBlock: {
    display: 'block',
  },
  subTitle: {
    marginTop: 2,
    fontSize: 8,
    fontFamily: theme.typography.lightFontFamily,
  },
  wrapperPercentage: {
    display: 'flex',
    marginTop: 5,
    height: 65,
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: theme.typography.lightFontFamily,
    justifyContent: 'space-between',
  },
  percentage: {
    fontSize: 36,
    letterSpacing: 3,
    lineHeight: '42.19px',
    fontFamily: theme.typography.mediumFontFamily,
  },
  symbol: {
    fontSize: 24,
    lineHeight: '28.19px',
    letterSpacing: 2,
    fontFamily: theme.typography.mediumFontFamily,
  },
  meta: {
    fontFamily: theme.typography.lightFontFamily,
  },
}))

const Widget58 = ({ style = {}, width = 1173, height = 476, topic = 'topic-58' }) => {
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
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        paddingLeft: 5,
        paddingRight: 5,
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
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <div className={classes.title}>{title}</div>
        <div className={classes.body}>
          <div className={clsx(classes.wrapperContext, classes.contentBlock)}>
            <span className={classes.blueTextColor}>{data.capitalContent.title}</span>
            {data.capitalContent.content}
          </div>

          <div className={classes.wrapperContext}>
            <div className={classes.blueTextColor}>Capital at Risk(CaR)</div>
            <span className={classes.subTitle}>Scenario</span>
            <div className={classes.wrapperPercentage}>
              <div>+/-</div>
              <div className={classes.symbol}>
                <span className={classes.percentage}>{data.capitalPercentage.percentage}</span>%
              </div>
              <div>rate shock</div>
            </div>
          </div>

          <div className={clsx(classes.wrapperContext, classes.contentBlock)}>
            <span className={classes.cyanTextColor}>{data.earningContent.title}</span>
            {data.earningContent.content}
          </div>

          <div className={classes.wrapperContext}>
            <div className={classes.cyanTextColor}>Earnings at Risk(EaR)</div>
            <span className={classes.subTitle}>Scenario</span>
            <div className={classes.wrapperPercentage}>
              <div>+/-</div>
              <div className={classes.symbol}>
                <span className={classes.percentage}>{data.capitalPercentage.percentage}</span>%
              </div>
              <div>rate shock</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget58
