import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import HorizontalBarChart from 'components/charts/HorizontalBarChart'

import { CardMode, PercentageMode } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'initial',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    padding: 0,
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.83,
  },
  each: {
    height: 160,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 8,
  },

  splitLine: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  svgLine: {
    stroke: theme.palette.common.fourthText,
    fill: 'transparent',
  },
}))

const Widget76 = ({ height = 100, width = 100, topic = 'topic-76', style = {} }) => {
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
        position: 'relative',
        overflow: 'initial',
      }}
    >
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.wrapper}>
          <div className={classes.each}>
            <div className={classes.title} style={{ textAlign: 'center', marginBottom: 5 }}>
              {data.gender.title}
            </div>
            <HorizontalBarChart
              mode={PercentageMode.danger}
              value={data.gender.value}
              width={115}
              height={110}
              eachHeight={5}
              middleLine={true}
              data={data.gender.data}
            />
          </div>
          <div style={{ width: 10 }}></div>
          <div className={classes.each}>
            <div className={classes.title} style={{ textAlign: 'center', marginBottom: 5 }}>
              {data.sectorExpertise.title}
            </div>
            <HorizontalBarChart
              mode={PercentageMode.success}
              value={data.sectorExpertise.value}
              width={115}
              height={110}
              eachHeight={5}
              data={data.sectorExpertise.data}
            />
          </div>
        </div>

        <svg
          className={classes.splitLine}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            className={classes.svgLine}
            x1={width / 2 + 3}
            y1={15}
            x2={width / 2 + 3}
            y2={height - 10}
            strokeWidth={1}
          ></line>
        </svg>
      </div>
    </DashboardCard>
  )
}

export default Widget76
