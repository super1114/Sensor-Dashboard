import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'
import clsx from 'clsx'
import LineGraphWithTitle from 'components/graphs/LineGraphWithTitle'
import YearlyPriceTable from 'components/tables/YearlyPriceTable'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontSize: 8,
    padding: 5,
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 12.32,
    lineHeight: '14.5px',
    letterSpacing: 0.62,
    marginBottom: 5,
    display: 'flex',
    alignItems: 'flex-end',
  },
  eachSubTitle: {
    fontSize: 7,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 7,
    paddingLeft: 4,
    paddingRight: 4,
  },
  blueTextColor: {
    color: theme.palette.common.primaryBlue,
  },
  cyanTextColor: {
    color: theme.palette.common.primaryCyan,
  },

  body: {
    display: 'flex',
    marginTop: 0,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
  },
  oneWrap: {
    height: 207,
    marginBottom: 10,
  },

  years: {
    marginTop: -20,
    marginLeft: '19%',
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 12,
    lineHeight: '14px',
    letterSpacing: 1,
    display: 'flex',
    justifyContent: 'space-between',
    width: '73.5%',
  },
}))

const Widget57 = ({ style = {}, width = 1173, height = 476, topic = 'topic-57', titleColor = 'blue' }) => {
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
        <div
          className={clsx(classes.title, {
            [classes.blueTextColor]: titleColor === 'blue',
            [classes.cyanTextColor]: titleColor === 'cyan',
          })}
        >
          {title}
        </div>

        <div className={classes.years}>
          {data.years.map((each, idx) => {
            return (
              <div className={classes.year} key={idx}>
                {data.years[data.years.length - idx - 1]}
              </div>
            )
          })}
        </div>

        <div className={classes.body}>
          <LineGraphWithTitle
            width={width - 30}
            values={data.graph[0].data}
            suffix={data.graph[0].suffix}
            prefix={data.graph[0].prefix}
            title={data.graph[0].title}
            fontBold={true}
            labelYPosition={'top'}
            labelXPosition={'center'}
            height={30}
            fontSize={12.32}
            strokeColor={'green'}
            outerRadius={6.5}
            innerRadius={3}
            strokeWidth={1.8}
            titleWidth={0.25}
            titleMargin={0}
            titleColor={'green'}
            titleAlign={'flex-end'}
          />
          <LineGraphWithTitle
            style={{ marginTop: -15 }}
            width={width - 30}
            values={data.graph[1].data}
            suffix={data.graph[1].suffix}
            prefix={data.graph[1].prefix}
            title={data.graph[1].title}
            fontBold={true}
            labelYPosition={'bottom'}
            labelXPosition={'center'}
            height={30}
            fontSize={12.32}
            strokeColor={'red'}
            outerRadius={6.5}
            innerRadius={3}
            strokeWidth={1.8}
            titleWidth={0.25}
            titleMargin={0}
            titleColor={'red'}
            titleAlign={'center'}
          />
          <div style={{ height: 20, width: '100%' }}></div>
          {data.yearlyData.map((each, idx) => (
            <div className={classes.oneWrap} key={idx}>
              <YearlyPriceTable data={each} height={207} width={205} />
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget57
