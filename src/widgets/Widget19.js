import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import HorizontalTripleSlider from 'components/processes/HorizontalTripleSlider'
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
  },
  value: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 40,
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
    height: 250,
    width: '100%',
  },
  meta: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 19,
    marginLeft: 5,
  },
  metaGrewDesc: {
    fontSize: 16,
    fontFamily: theme.typography.lightFontFamily,
    marginLeft: 5,
  },
}))

const Widget19 = ({ topic = 'widget-19', style = {} }) => {
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
            {data.growth > 0 ? '+' : '-'}
            <span className={classes.growthValue}>{data.growth}</span>%
          </div>
          <div className={classes.metaData}>
            <div className={classes.meta}>{data.growth_desc}</div>
            <Grid style={{ display: 'flex' }}>
              <Triangle
                type={data.grew ? TriangleType.up : TriangleType.down}
                mode={TriangleMode.success}
                {...TriangleSize}
              />
              <div className={classes.metaGrewDesc}> {data.grew_desc}</div>
            </Grid>

            <HorizontalTripleSlider
              sticky={true}
              lb={data.performance.lo.value}
              lbText={`(${data.performance.lo.value}%) ${data.performance.lo.label}`}
              ub={data.performance.hi.value}
              ubText={`(${data.performance.hi.value}%) ${data.performance.hi.label}`}
              points={[
                {
                  value: 12,
                  status: 'business',
                },
              ]}
              sliderHeight={40}
              pointSize={22}
              style={{ width: '100%' }}
            />
            <div style={{ height: 90 }}></div>
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

export default Widget19
