import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import GenderBalanceGraph from 'components/graphs/GenderBalanceGraph'
import clsx from 'clsx'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    paddingBottom: 10,
    WebkitTextSizeAdjust: 'none',
    position: 'relative',
    width: '100%',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.83,
    marginBottom: 1,
  },
  blue: {
    color: theme.palette.common.primaryBlue,
  },
  cyan: {
    color: theme.palette.common.primaryCyan,
  },
  secondaryBlue: {
    color: theme.palette.common.thirdBlue,
  },
  red: {
    color: theme.palette.common.primaryRed,
  },
  extraTitle: {
    fontSize: 6,
    letterSpacing: 0.4,
    position: 'absolute',
    display: 'flex',
    top: 2,
    right: 0,
  },

  blueTitle: {
    color: theme.palette.common.primaryBlue,
  },
  cyanTitle: {
    color: theme.palette.common.primaryCyan,
  },
}))

const Widget74 = ({ style = {}, width = 500, height = 300, topic = 'topic-74' }) => {
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
          {data.titles.map((each, idx) => {
            return (
              <div
                className={clsx({
                  [classes.blue]: each.color === 'blue',
                  [classes.cyan]: each.color === 'cyan',
                  [classes.red]: each.color === 'red',
                })}
                style={{ display: 'flex' }}
                key={idx}
              >
                <span style={{ color: 'white', display: idx === 0 ? 'none' : 'block' }}>&nbsp;</span>
                {each.title}
                <span style={{ color: 'white', display: idx === data.titles.length - 1 ? 'none' : 'block' }}>
                  &nbsp;|
                </span>
              </div>
            )
          })}
        </div>
        <div style={{ height: 20 }}></div>
        <GenderBalanceGraph height={height - 60} width={width - 25} data={data.data} />
      </div>
    </DashboardCard>
  )
}

export default Widget74
