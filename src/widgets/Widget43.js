import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import Triangle from 'components/basic_components/Triangle'
import { CardMode, TriangleMode, TriangleType } from 'constants/common'
import { threeDots } from 'helpers/helpers'
import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 16,
    padding: 5,
    letterSpacing: 1.5,
    height: 'auto',
    WebkitTextSizeAdjust: 'none',
  },
  title: {
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: '1.5px',
    fontSize: 18,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: '-webkit-fill-available',
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.primaryText,
    alignItems: 'center',
  },
  value: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 60,
    letterSpacing: '3px',
  },
  meta: {
    fontSize: 16,
    fontFamily: theme.typography.lightFontFamily,
    letterSpacing: '1.33px',
  },
  label: {
    color: theme.palette.common.primaryText,
    fontSize: 16,
    display: 'column',
    alignItems: 'center',
  },
  metaBlue: {
    color: theme.palette.common.primaryBlue,
  },
  labelValue: {
    color: theme.palette.common.primaryText,
    fontSize: 16,
    marginRight: 3,
    letterSpacing: '1.33px',
    marginLeft: 5,
  },
}))

const Widget43 = ({ style = {}, width = 155, height = 258, topic = 'widget-43-1' }) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()

  if (!data) {
    return ''
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        margin: 0,
        marginBottom: 10,
        padding: 5,
        borderRadius: 10,
        width: width,
        height: height,
      }}
    >
      <div
        className={classes.root}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <div className={classes.title}>{title}</div>
        <div style={{ height: 25 }}></div>
        <div className={classes.body}>
          <div className={classes.value}>{threeDots(data.value)}</div>
          <div style={{ height: 5 }}></div>
          <div className={classes.meta}>
            <span className={classes.metaBlue}>{data.bluemeta} </span>
            {data.meta}
          </div>
          <div style={{ height: 25 }}></div>
          <Triangle
            type={data.growth > 0 ? TriangleType.up : TriangleType.down}
            mode={data.growth > 0 ? TriangleMode.success : TriangleMode.danger}
            bottomWidth={17}
            width={12.25}
          />
          <div style={{ height: 8 }}></div>
          <div>{data.growth > 0 ? '+' + data.growth : data.growth}</div>
          <div style={{ height: 2 }}></div>
          <div>{data.label}</div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget43
