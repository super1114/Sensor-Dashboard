import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'

import OneLineTableChart from 'components/tables/OneLineTableChart'
import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    WebkitTextSizeAdjust: 'none',
    fontSize: 8,
    lineHeight: '9.38px',
    letterSpacing: 0.67,
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
  },
  subTitle: {
    fontFamily: theme.typography.thinFontFamily,
    marginBottom: -12,
  },

  oneBlock: {
    marginBottom: 10,
  },
}))

const Widget66 = ({ style = {}, width = 586, height = 151, topic = 'topic-66' }) => {
  const { title, data, years } = useNodeRed(topic)
  const classes = useStyles()

  if (!data || !data[0]) {
    return ''
  }
  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        borderRadius: 8,
        margin: 0,
        marginBottom: 10,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 0,
        width: width,
        height: height,
        overflow: 'initial',
      }}
    >
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.subTitle}>(millions of shares)</div>
        {data.map((each, idx) => {
          return (
            <div key={idx} className={classes.oneBlock}>
              {each.map((item, index) => (
                <OneLineTableChart
                  key={`one-line-tables-${idx}-${index}`}
                  data={item}
                  years={years}
                  width={545}
                  height={27}
                  title={'right'}
                  fontSize={8}
                  titleWidth={0.23}
                  strokeWidth={0.3}
                  showYear={idx === 0 && index === 0}
                  yearPosition={5}
                  marginTitle={15}
                />
              ))}
            </div>
          )
        })}
      </div>
    </DashboardCard>
  )
}

export default Widget66
