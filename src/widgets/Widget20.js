import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import PercentageLineGraph from 'components/graphs/PercentageLineGraph'
import HorizontalProgressBar from 'components/processes/HorizontalProgressBar'

import Triangle from 'components/basic_components/Triangle'
import { CardMode, TriangleMode, TriangleType, DefaultComponentTitleSize, TriangleSize } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: 5,
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
    marginTop: 40,
    fontSize: 20,
    color: theme.palette.common.primaryText,
  },
  value: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 40,
    marginBottom: 10,
    color: theme.palette.common.primaryText,
  },
  growthValue: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 60,
  },

  metaData: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 200,
    marginBottom: 40,
    width: '100%',
  },
  meta: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 22,
    marginBottom: 20,
    marginLeft: 5,
  },
  metaGrewDesc: {
    fontSize: 16,
    fontFamily: theme.typography.lightFontFamily,
    marginBottom: 20,
    marginLeft: 5,
  },
  metaGrewth: {
    fontFamily: theme.typography.ultralightFontFamily,
    fontSize: 22,
    letterSpacing: 3,
    textAlign: 'center',
  },

  fontColor: {
    color: theme.palette.common.primaryText,
  },
}))

const Widget20 = ({ topic = 'widget-20', style = {} }) => {
  const { data, title } = useNodeRed(topic)

  const classes = useStyles()

  if (!title) {
    return ''
  }

  return (
    <DashboardCard mode={CardMode.auto} style={{ ...style, paddingBottom: 0, overflow: 'hidden' }}>
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.body}>
          <div className={classes.value}>
            £<span className={classes.growthValue}>{data.value}</span>bn
          </div>

          <div className={classes.metaData}>
            <Grid style={{ display: 'flex' }}>
              <Triangle
                type={data.grew ? TriangleType.up : TriangleType.down}
                mode={TriangleMode.business}
                {...TriangleSize}
              />
              <div className={classes.metaGrewDesc}> {data.grew_desc}</div>
            </Grid>

            <div className={classes.metaGrewth}>{data.grewth_desc}</div>
          </div>

          <HorizontalProgressBar
            lb={0}
            ub={20}
            lbText={data.progress.lo}
            ubText={data.progress.hi}
            value={data.progress.value}
            sticky={true}
            progressHeight={30}
            progressTextfontSize={20}
            progressText={data.progress.value + '%'}
          />

          <div style={{ height: 40 }}></div>
          <div>
            <PercentageLineGraph
              height={150}
              title={'Market Share'}
              edgeWidth={400 / data.market.value.length}
              outerRadius={4}
              innerRadius={3}
              strokeWidth={2}
              fontSize={20}
              fontSizeLabel={15}
              values={data.market.value}
              labels={data.market.years}
            />
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget20
