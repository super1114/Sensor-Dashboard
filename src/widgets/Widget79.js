import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import CommitteeSlider from 'components/processes/CommitteeSlider'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 8,
    padding: 5,
    letterSpacing: 1.5,
    WebkitTextSizeAdjust: 'none',
    height: '100%',
  },
  title: {
    display: 'flex',
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 10,
    letterSpacing: 0.83,
    lineHeight: '11.72px',
    flex: 1,
    // color: theme.palette.common.primaryBorder,
  },
  titleWrapper: {
    display: 'flex',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
  },
  worst: {
    color: theme.palette.common.primaryRed,
  },
  best: {
    color: theme.palette.common.secondaryGreen,
  },
  business: {
    color: theme.palette.common.primaryBlue,
  },
  bodyWrapper: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
}))

const Widget79 = ({ topic = 'topic-79', style = {}, width = 255, height = 185 }) => {
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
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 0,
        borderRadius: 8,
        width: width,
        height: height,
        flexDirection: 'column',
        overflow: 'initial',
      }}
    >
      <div className={classes.root}>
        <div className={classes.titleWrapper}>
          <div className={classes.title}>{title}</div>
        </div>
        <div className={classes.bodyWrapper}>
          {data.map((each, idx) => {
            return (
              <div key={idx}>
                <CommitteeSlider data={each} width={80} />
              </div>
            )
          })}
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget79
