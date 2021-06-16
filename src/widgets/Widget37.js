import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import Widget37Each from 'components/extra_widgets/Widget37Each'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 620,
    height: '100%',
    overflow: 'hidden',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.primaryText,
    letterSpacing: 1,
    fontSize: 15.5,
    marginLeft: 5,
  },
  body: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: -15,
  },
}))

const Widget37 = ({ width = 620, height = 181, topic = 'widget-37' }) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) {
    return ''
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        padding: 10,
        paddingLeft: 15,
        paddingRight: 5,
        marginTop: 0,
        borderRight: 10,
        marginLeft: 5,
        marginRight: 0,
        borderRadius: 10,
        marginBottom: 12,
      }}
    >
      <div className={classes.root} style={{ width: width, height: height }}>
        <div className={classes.title}>{title}</div>
        <div className={classes.body}>
          {data.map((item, index) => {
            return <Widget37Each key={index} {...item} />
          })}
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget37
