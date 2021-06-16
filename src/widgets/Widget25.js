import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import ROIWidget from 'components/extra_widgets/ROIWidget'
import HorizontalTripleSlider from 'components/processes/HorizontalTripleSlider'

import { CardMode, DefaultComponentTitleSize } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: DefaultComponentTitleSize,
    marginBottom: 20,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  rois: {
    display: 'flex',
    marginBottom: 20,
  },
}))

const Widget25 = () => {
  const { title, info, rois } = useNodeRed('widget-25')
  const classes = useStyles()

  if (!title) {
    return ''
  }

  return (
    <DashboardCard mode={CardMode.auto} style={{ padding: 10 }}>
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.body}>
          <div className={classes.rois}>
            {rois.map((roi, index) => {
              return <ROIWidget {...roi} key={`roi-${index}`} style={{ flex: 1 }} />
            })}
          </div>
          <div style={{ height: 20 }}></div>
          <HorizontalTripleSlider {...info} sliderHeight={35} pointSize={20} />
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget25
