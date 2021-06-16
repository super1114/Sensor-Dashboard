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
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.83,
    marginBottom: -12,
  },
}))

const Widget83 = ({ style = {}, width = 500, height = 300, topic = 'topic-83' }) => {
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

        {data.company.map((each, idx) => {
          if (each.type === 'lineGraph')
            return (
              <LineGraphWithTitle
                key={idx}
                width={width - 10}
                values={each.data}
                extraValues={each.extraData}
                extraCircle={true}
                extrStrokeColor={each.extraGraphColor}
                strokeType={each.strokeType}
                strokeColor={each.graphColor}
                suffix={each.label}
                title={each.title}
                titleTextAlign={'right'}
                noText={each.noText}
                fontBold={true}
                labelYPosition={'none'}
                height={35}
                fontSize={8}
                outerRadius={4.5}
                innerRadius={2.5}
                strokeWidth={0.5}
                titleWidth={0.32}
                titleMargin={6}
              />
            )
          return (
            <div key={idx} style={{ marginTop: idx === 2 ? -23 : 0 }}>
              <TableChart
                data={each.data}
                showYear={idx === 0 ? true : false}
                years={years}
                height={24}
                width={width - 15}
                chartCellType={'oneLine'}
                titleTextAlign={'right'}
                fontSize={8}
                titleWidth={0.23}
                marginTitle={43}
                yearPosition={10}
                strokeWidth={0.3}
              />
            </div>
          )
        })}
      </div>
    </DashboardCard>
  )
}

export default Widget83
