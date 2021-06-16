import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import HorizontalProgressBar from 'components/processes/HorizontalProgressBar'
import { Grid } from '@material-ui/core'
import Triangle from 'components/basic_components/Triangle'

import { CardMode, TriangleMode, TriangleType, DefaultComponentTitleSize } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 550,
    transform: `rotate(90deg)`,
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: '#fff',
    fontSize: DefaultComponentTitleSize,
    marginLeft: 5,
    width: 550,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    color: 'lightgray',
    marginTop: 10,
  },
  value: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
  valuePrice: {
    fontSize: 60,
  },
  meta: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 1.4,
  },
  progressTitle: {
    textAlign: 'left',
    fontSize: 14,
    marginBottom: 3,
  },
}))

const Widget201 = () => {
  const classes = useStyles()

  const { data, title } = useNodeRed('widget-20')

  if (!title) {
    return ''
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        padding: 10,
        width: 260,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.body}>
          <div className={classes.value}>
            £<span className={classes.valuePrice}>{data.value}</span>bn
          </div>
          <Grid style={{ display: 'flex', justifyContent: 'center' }}>
            <Triangle
              type={data.growth >= 0 ? TriangleType.up : TriangleType.down}
              mode={TriangleMode.business}
              bottomWidth={20}
              width={15}
            />
            <div style={{ width: 20 }}></div>
            <div className={classes.meta}> {data.growth_desc}</div>
          </Grid>
          <div className={classes.meta}>{data.grew_meta}</div>
          <div className={classes.progressTitle}>{data.progress.title}</div>
          <HorizontalProgressBar
            lb={data.progress.lb}
            ub={data.progress.ub}
            lbText={data.progress.lbText}
            ubText={data.progress.ubText}
            value={data.progress.value}
            sticky={true}
            progressLabelFontSize={14}
          />
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget201
