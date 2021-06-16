import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import MultiLineGraphWithTItle from 'components/graphs/MultiLineGraphWithTitle'
import TableChart from 'components/tables/TableChart'
import { CardMode } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    paddingBottom: 10,
    WebkitTextSizeAdjust: 'none',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 11.02,
    lineHeight: '13px',
    letterSpacing: 0.92,
    marginBottom: -12,
    marginTop: 5,
    marginLeft: 5,
  },
  wrapper: {
    marginLeft: -9,
  },
  nearCompetitor: {
    marginTop: -10,
    marginBottom: 3,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  nearTitle: {
    backgroundColor: theme.palette.common.secondaryCardBackground,
    width: 113,
    height: 18,
    borderRadius: 4.41,
    paddingLeft: 6,
    paddingRight: 6,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 8.82,
    lineHeight: '10.34px',
    letterSpacing: 0.74,
    marginBottom: -18,
  },
}))

const Widget69 = ({ style = {}, width = 500, height = 300, topic = 'topic-69' }) => {
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
        padding: 5,
        paddingLeft: 10,
        paddingBottom: 0,
        width: width,
        height: height,
        overflow: 'initial',
      }}
    >
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.wrapper}>
          {data.map((each, idx) => {
            if (each.type === 'market_board_gender_lineGraph') {
              return (
                <div key={idx}>
                  <MultiLineGraphWithTItle
                    width={width + 10}
                    values={each.data}
                    types={[each.male, each.female]}
                    strokeType={each.strokeType}
                    suffix={each.label}
                    title={each.title}
                    titleTextAlign={'right'}
                    noText={each.noText}
                    fontBold={false}
                    labelYPosition={'bottom'}
                    height={25}
                    fontSize={10}
                    outerRadius={5.5}
                    innerRadius={3.3}
                    strokeWidth={0.62}
                    titleWidth={0.315}
                    titleMargin={4.5}
                  />
                </div>
              )
            }
            return (
              <div key={idx} style={{ marginBottom: 15 }}>
                <TableChart
                  data={each.data}
                  showYear={idx === 0 ? true : false}
                  years={years}
                  height={24}
                  width={width - 15}
                  chartCellType={'oneLine'}
                  titleTextAlign={'right'}
                  fontSize={10}
                  titleWidth={0.24}
                  marginTitle={35}
                  yearPosition={10}
                />
              </div>
            )
          })}
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget69
