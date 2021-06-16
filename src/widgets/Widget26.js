import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import DashboardCard from 'components/basic_components/DashboardCard'
import HorizontalProgressBar from 'components/processes/HorizontalProgressBar'
import Triangle from 'components/basic_components/Triangle'

import { CardMode, TriangleMode, TriangleType, DefaultComponentTitleSize, TriangleSize } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: DefaultComponentTitleSize,
    color: theme.palette.common.primaryText,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    width: 'max-content',
    color: theme.palette.common.primaryText,
  },
  growthValue: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 55,
    marginLeft: 5,
  },
  value: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 40,
    color: theme.palette.common.primaryText,
    marginBottom: 10,
  },
  meta: {
    color: theme.palette.common.primaryText,
    fontFamily: theme.typography.ultralightFontFamily,
    fontSize: 15,
    marginBottom: 10,
  },
  danger: {
    fontFamily: theme.typography.ultralightFontFamily,
    color: theme.palette.common.primaryRed,
    marginLeft: 10,
  },
}))

const Widget26 = () => {
  const { title, info } = useNodeRed('widget-24')
  const classes = useStyles()

  if (!title) {
    return ''
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        padding: 10,
        width: 250,
        height: 236,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div className={classes.title}>{title}</div>
      <div className={classes.root}>
        <div className={classes.body}>
          <div style={{ height: 10 }}></div>

          <div className={classes.value}>
            £
            <span className={classes.growthValue}>
              {/* {value} */}
              122
            </span>
            m
          </div>
          <div style={{ height: 10 }}></div>

          <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
            <Triangle type={TriangleType.down} mode={TriangleMode.danger} {...TriangleSize} />
            <div className={classes.danger}>
              (1.4)%<span className={classes.meta}> on prior year</span>
            </div>
          </Grid>
          <div style={{ height: 20 }}></div>
          <HorizontalProgressBar {...info} sticky={true} progressLabelFontSize={14} />
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget26
