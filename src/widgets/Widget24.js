import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import Percentage from 'components/basic_components/Percentage'
import HorizontalTripleSlider from 'components/processes/HorizontalTripleSlider'

import { CardMode, PercentageMode, DefaultComponentTitleSize } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 0,
    borderRight: `1px solid ${theme.palette.common.primaryBorder}`,
    '&:last-child': {
      borderRight: 'unset',
    },
    width: '50%',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: DefaultComponentTitleSize - 1,
    marginBottom: 20,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
  },
  value: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 36,
    marginBottom: 10,
  },
  meta: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
  },
}))

const Widget24 = () => {
  const { data } = useNodeRed('widget-26')
  const classes = useStyles()

  if (!data) {
    return ''
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        padding: 20,
        paddingBottom: 65,
        paddingRight: 0,
        paddingLeft: 0,
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {data.map(({ title, info, value, growth }, idx) => {
        return (
          <div className={classes.root} key={idx}>
            <div className={classes.title}>{title}</div>
            <div className={classes.body}>
              <Percentage mode={growth ? PercentageMode.success : PercentageMode.danger} value={value} />
              <HorizontalTripleSlider
                {...info}
                ubText={'20% Top Performer'}
                lbText={'95% Worst Performer'}
                sliderHeight={35}
                pointSize={20}
                sticky={true}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        )
      })}
    </DashboardCard>
  )
}

export default Widget24
