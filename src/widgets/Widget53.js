import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import LineGraphWithTitle from 'components/graphs/LineGraphWithTitle'
import TableChartGrowth from 'components/tables/TableChartGrowth'
import { CardMode, DefaultComponentTitleSize } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    paddingBottom: 10,
  },
  cyanTitle: {
    fontFamily: theme.typography.mediumFontFamily,
    lineHeight: '14.06px',
    letterSpacing: 1,
    color: theme.palette.common.primaryCyan,
    fontSize: 12,
  },
  blueTitle: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryBlue,
    lineHeight: '14.06px',
    letterSpacing: 1,
    fontSize: 12,
  },
  subtitle: {
    fontFamily: theme.typography.thinFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 0.67,
    fontSize: 8,
    lineHeight: '9.38px',
    marginTop: 4,
  },
}))

const Widget53 = ({ style = {}, width = 500, height = 300, topic = 'topic-53' }) => {
  const { title, data, years, titleColor, subtitle } = useNodeRed(topic)
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
        padding: 10,
        paddingTop: 5,
        paddingBottom: 0,
      }}
    >
      <div
        className={classes.root}
        style={{
          width: width,
          height: height,
        }}
      >
        <div className={titleColor === 'cyan' ? classes.cyanTitle : classes.blueTitle}>{title}</div>
        {subtitle && <div className={classes.subtitle}>{subtitle}</div>}

        {data.map((each, idx) => {
          if (each.type === 'lineGraph')
            return (
              <LineGraphWithTitle
                key={idx}
                width={width}
                values={each.data}
                suffix={each.label}
                title={each.title}
                fontBold={true}
                labelYPosition={'bottom'}
                height={30}
                fontSize={8}
                strokeType={each.strokeType}
                strokeColor={each.color}
                outerRadius={4}
                innerRadius={2}
                strokeWidth={1}
                titleWidth={0.19}
                titleMargin={3}
              />
            )
          return (
            <div key={idx}>
              <div style={{ height: 10 }}></div>
              <TableChartGrowth
                data={each.data}
                showYear={idx === 0 ? true : false}
                years={years}
                height={24}
                width={width}
                fontSize={8}
              />
              <div style={{ height: 10 }}></div>
            </div>
          )
        })}
      </div>
    </DashboardCard>
  )
}

export default Widget53
