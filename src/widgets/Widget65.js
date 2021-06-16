import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'

import SharePriceCandleStick from 'components/charts/SharePriceCandleStick'
import BuyOrSellEvent from 'components/extra_widgets/BuyOrSellEvent'
import ShareInIssuesGraph from 'components/graphs/ShareInIssuesGraph'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontFamily: theme.typography.ultralightFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 8,
    padding: 5,
    letterSpacing: 1,
    height: 'auto',
    WebkitTextSizeAdjust: 'none',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.83,
    marginBottom: 10,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'inherit',
    fontFamily: theme.typography.ultralightFontFamily,
    alignItems: 'flex-start',
    marginTop: 5,
  },
}))

const Widget65 = ({ style = {}, width = 'auto', height = 'inherit', topic = 'topic-65' }) => {
  const { title, data } = useNodeRed(topic)

  const classes = useStyles()

  if (!title || data.length === 0) {
    return ''
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        marginLeft: 0,
        marginTop: 0,
        marginRight: 0,
        paddingLeft: 1,
        paddingRight: 5,
        paddingTop: 0,
        borderRadius: 8,
        overflow: 'initial',
      }}
    >
      <div
        className={classes.root}
        style={{
          width: width,
          height: height,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'initial',
          position: 'relative',
        }}
      >
        <div className={classes.title}>
          <div>{title}</div>
        </div>

        <div style={{ marginTop: -20 }}></div>
        <SharePriceCandleStick graphData={data} width={565} height={175} />
        <div style={{ marginTop: 5 }}></div>
        <BuyOrSellEvent graphData={data} width={540} height={80} />
        <div style={{ marginTop: 5 }}></div>
        <ShareInIssuesGraph graphData={data} width={570} height={60} />
      </div>
    </DashboardCard>
  )
}

export default Widget65
