import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import SkillsAndExperience from 'components/tables/SkillsAndExperience'
import { CardMode } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    paddingBottom: 10,
    WebkitTextSizeAdjust: 'none',
    position: 'relative',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 11.02,
    lineHeight: '13px',
    letterSpacing: 0.92,
    marginBottom: 10,
  },
  blue: {
    color: theme.palette.common.primaryBlue,
  },
  cyan: {
    color: theme.palette.common.primaryCyan,
  },
  extraTitle: {
    fontSize: 7.44,
    letterSpacing: 0.62,
    position: 'absolute',
    display: 'flex',
    top: 0,
    right: 33,
  },
}))

const Widget70 = ({ style = {}, width = 500, height = 300, topic = 'topic-70' }) => {
  const { title, data, years } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) {
    return ''
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        borderRadius: 8,
        margin: 0,
        padding: 10,
        paddingTop: 8,
        paddingBottom: 0,
        width: width,
        height: height,
        overflow: 'initial',
      }}
    >
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.extraTitle}>
          <div className={classes.blue}>Bank&nbsp;</div>|<div className={classes.cyan}>&nbsp;Market</div>
        </div>
        <SkillsAndExperience
          data={data}
          showYear={true}
          years={years}
          height={33}
          width={width}
          chartCellType={'oneLine'}
          titleTextAlign={'right'}
          fontSize={8}
          titleWidth={0.3}
          marginTitle={25}
          yearPosition={0}
        />
      </div>
    </DashboardCard>
  )
}

export default Widget70
