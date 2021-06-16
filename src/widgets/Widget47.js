import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'
import DailySentiment from 'components/charts/DailySentiment'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontSize: 8,
    padding: 5,
  },
  title: {
    fontFamily: theme.typography.MediumFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 0.9,
    fontSize: 18,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'flex-end',
  },

  body: {
    width: '100%',
    marginTop: -30,
  },
}))

const Widget47 = ({ style = {}, width = 1173, height = 287, topic = 'topic-47' }) => {
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
        marginTop: 0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        borderRadius: 8,
        paddingBottom: 0,
        width: width,
        height: height,
      }}
    >
      <div
        className={classes.root}
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <div className={classes.title}>{title}</div>
        <div className={classes.body}>
          <DailySentiment data={data} />
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget47
