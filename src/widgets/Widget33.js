import { makeStyles } from '@material-ui/core/styles'

import { CardMode } from 'constants/common'
import DashboardCard from 'components/basic_components/DashboardCard'
import CostIncomeHistory from 'components/basic_components/CostIncomeHistory'
import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontFamily: theme.typography.ultralightFontFamily,
    fontSize: 8,
    paddingLeft: 5,
    letterSpacing: 1.5,
    height: 'auto',
  },
  titleBlue: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryBlue,
    fontSize: 12,
  },
  titleCyan: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryCyan,
    fontSize: 12,
  },
  body: {
    display: 'flex',
    height: 'inherit',
    color: theme.palette.common.primaryText,
    alignItems: 'flex-start',
  },
}))

const Widget33 = ({ style = {}, width = 'auto', height = 205, topic = 'widget-33' }) => {
  const { title, data, titleColor, processType, circleColor } = useNodeRed(topic)
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
        marginTop: 0,
        marginRight: 0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
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
        <div className={titleColor === 'blue' ? classes.titleBlue : classes.titleCyan}>{title}</div>
        <div className={classes.body}>
          <CostIncomeHistory
            styles={{ width: width, height: height }}
            data={data}
            circleColor={circleColor}
            processType={processType}
          />
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget33
