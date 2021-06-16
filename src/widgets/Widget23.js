import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode, DefaultComponentTitleSize } from 'constants/common'

import ChartCompanyMarket from 'components/charts/ChartCompanyMarket'
import ChartCompanyFinance from 'components/charts/ChartCompanyFinance'
import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    letterSpacing: 2,
    color: theme.palette.common.primaryText,
    fontSize: DefaultComponentTitleSize,
    marginLeft: 5,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    color: theme.palette.common.primaryText,
  },
}))

const Widget23 = ({ topic = 'widget-23', style = {} }) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()
  if (!title) {
    return ''
  }

  return (
    <DashboardCard mode={CardMode.auto} style={{ ...style, paddingBottom: 20, width: 600, overflow: 'hidden' }}>
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div style={{ height: 10 }}></div>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
          <ChartCompanyMarket marketData={[...data.trading]} width={230} />
          <ChartCompanyFinance financeData={[...data.finance]} width={230} />
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget23
