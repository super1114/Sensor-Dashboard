import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import LineGraphWithTitle from 'components/graphs/LineGraphWithTitle'
import TableChart from 'components/tables/TableChart'
import { CardMode, DefaultComponentTitleSize } from 'constants/common'

// import { dummyData } from '../variables/widget27_data'

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
    color: theme.palette.common.primaryCyan,
    fontSize: DefaultComponentTitleSize / 2,
  },
  blueTitle: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryBlue,
    fontSize: DefaultComponentTitleSize / 2,
  },
  subtitle: {
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 1.5,
    fontSize: DefaultComponentTitleSize / 2 + 3,
  },
}))

const Widget27 = ({ style = {}, width = 500, height = 300, subtitle = null, topic = 'widget-27' }) => {
  const { title, data, years, titleColor } = useNodeRed(topic)
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
        padding: 15,
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

        <div style={{ marginTop: -11 }}> </div>
        {data.map((each, idx) => {
          if (each.type === 'lineGraph')
            return (
              <LineGraphWithTitle
                key={idx}
                width={width}
                values={each.data}
                suffix={each.label}
                title={each.title}
                fontBold={each.fontBold}
                labelYPosition={'top'}
                height={30}
                fontSize={8}
                strokeType={each.strokeType}
                strokeColor={each.color}
                outerRadius={4}
                innerRadius={2}
                strokeWidth={1}
                titleWidth={0.27}
                titleMargin={5}
              />
            )
          return (
            <div key={idx}>
              <TableChart
                data={each.data}
                showYear={idx === 0 ? true : false}
                years={years}
                height={24}
                width={width}
                fontSize={8}
                chartCellType={'oneLine'}
              />
              <div style={{ height: 6.5 }}></div>
            </div>
          )
        })}
      </div>
    </DashboardCard>
  )
}

export default Widget27
