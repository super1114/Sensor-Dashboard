import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import Triangle from 'components/basic_components/Triangle'
import { CardMode, TriangleMode, TriangleType } from 'constants/common'
import { threeDots } from 'helpers/helpers'
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
    fontFamily: theme.typography.ultralightFontFamily,
    color: theme.palette.common.primaryText,
    alignItems: 'flex-start',
  },
  value: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 70,
  },
  label: {
    color: theme.palette.common.primaryText,
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
  },
  labelValue: {
    color: theme.palette.common.secondaryGreen,
    fontSize: 12,
    marginRight: 3,
    marginLeft: 5,
  },
}))

const Widget32 = ({ style = {}, width = 'auto', height = 205, topic = 'widget-32' }) => {
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
        marginTop: 0,
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
          <div className={classes.value}>{threeDots(data.value)}</div>
          <div className={classes.label}>
            <Triangle
              type={data.growth}
              mode={data.growth === TriangleType.up ? TriangleMode.success : TriangleMode.danger}
              bottomWidth={9}
              width={8}
            />
            <span className={classes.labelValue}>{threeDots(data.priorYear)} </span> {data.label}
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget32
