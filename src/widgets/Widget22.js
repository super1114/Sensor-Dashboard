import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import HorizontalTripleSlider from 'components/processes/HorizontalTripleSlider'
import Triangle from 'components/basic_components/Triangle'
import { CardMode, TriangleMode, TriangleType, DefaultComponentTitleSize, TriangleSize } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: DefaultComponentTitleSize,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    color: theme.palette.common.primaryText,
    fontFamiliy: theme.typography.lightFontFamily,
  },
  triangleWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  value: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 40,
    marginBottom: 20,
  },
  growthValue: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 60,
  },
  meta: {
    color: theme.palette.common.secondaryText,
    fontFamily: theme.typography.ultralightFontFamily,
    fontSize: 18,
    marginLeft: 5,
  },
  danger: {
    fontFamily: theme.typography.ultralightFontFamily,
    color: theme.palette.common.primaryRed,
  },
}))

const Widget22 = ({ topic = 'widget-22', style = {} }) => {
  const { title, value, growth, meta, info } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) {
    return ''
  }

  return (
    <DashboardCard mode={CardMode.auto} style={{ ...style, width: 300, paddingBottom: 70, overflow: 'hidden' }}>
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.body}>
          <div style={{ height: 15 }}></div>
          <div className={classes.value}>
            {value.includes('bps') ? (
              <>
                <span className={classes.growthValue}>{value.replace('bps', '')}</span>bps
              </>
            ) : value.includes('%') ? (
              <>
                <span className={classes.growthValue}>{value.replace('%', '')}</span>%
              </>
            ) : (
              <span className={classes.growthValue}>{value}</span>
            )}
          </div>
          <div style={{ height: 20 }}></div>
          <Grid container className={classes.triangleWrapper}>
            <Triangle
              type={growth ? TriangleType.up : TriangleType.down}
              mode={growth ? TriangleMode.success : TriangleMode.danger}
              {...TriangleSize}
            />
            {growth ? (
              <div className={classes.meta}>{meta}</div>
            ) : (
              <div className={classes.danger}>
                +0.2%<span className={classes.meta}>on prior year</span>
              </div>
            )}
          </Grid>
          <div style={{ height: 70 }}></div>
          <HorizontalTripleSlider {...info} sliderHeight={35} pointSize={20} sticky={true} />
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget22
