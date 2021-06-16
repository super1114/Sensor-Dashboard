import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import LineGraphWithTitle from 'components/graphs/LineGraphWithTitle'
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

const Widget68 = ({ style = {}, width = 500, height = 300, topic = 'topic-68' }) => {
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
            if (each.type === 'lineGraph')
              return (
                <div key={idx} style={{ marginBottom: -10 }}>
                  <LineGraphWithTitle
                    width={width - 13}
                    values={each.data}
                    extraValues={each.extraData}
                    extrStrokeColor={each.extraGraphColor}
                    strokeType={each.strokeType}
                    strokeColor={each.graphColor}
                    suffix={'%'}
                    title={each.title}
                    titleTextAlign={'right'}
                    titleColor={each.graphColor}
                    topic={topic}
                    noText={each.noText}
                    fontBold={true}
                    labelYPosition={'bottom'}
                    height={15}
                    fontSize={8}
                    outerRadius={4.5}
                    innerRadius={2.5}
                    strokeWidth={0.5}
                    titleWidth={0.35}
                    titleMargin={5}
                  />
                </div>
              )
            return (
              <div key={idx} style={{ marginBottom: 8 }}>
                <TableChart
                  data={each.data}
                  showYear={idx === 0 ? true : false}
                  years={years}
                  height={24}
                  width={width - 15}
                  chartCellType={'oneLine'}
                  titleTextAlign={'right'}
                  fontSize={8}
                  titleWidth={0.25}
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

export default Widget68
