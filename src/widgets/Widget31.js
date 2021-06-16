import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import HorizontalProgressBar from 'components/processes/HorizontalProgressBar'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontFamily: theme.typography.ultralightFontFamily,
    fontSize: 8,
    padding: 5,
    letterSpacing: 1.5,
    height: 'auto',
  },
  title: {
    fontFamily: theme.typography.thinFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 2,
    fontSize: 18,
    marginBottom: 5,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 'inherit',
    alignItems: 'center',
    fontFamily: theme.typography.ultralightFontFamily,
    color: theme.palette.common.primaryText,
  },
  value: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 70,
  },
}))

const Widget31 = ({ style = {}, width = 205, height = 205, topic = 'widget-31' }) => {
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
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        borderRadius: 8,
      }}
    >
      <div
        className={classes.root}
        style={{
          width: width,
          height: height,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className={classes.title}>{title}</div>
        <div className={classes.body}>
          <div className={classes.value}>{data.value.toFixed(2)}</div>
          <div style={{ width: 110 }}>
            <HorizontalProgressBar value={data.value} lb={data.lb} ub={data.ub} lbText={data.lb} ubText={data.ub} />
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget31
