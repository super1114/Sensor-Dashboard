import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'

import Triangle from 'components/basic_components/Triangle'
import { TriangleMode, TriangleType } from 'constants/common'
import EqualBarLine from 'components/basic_components/EqualBarLine'
import TableLineGraph from 'components/tables/TableLineGraph'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontSize: 8,
    overflow: 'hidden',
    padding: 5,
    WebkitTextSizeAdjust: 'none',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 12.32,
    lineHeight: '14.5px',
    letterSpacing: 0.62,
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  body: {
    display: 'flex',
    marginTop: 5,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    width: '100%',
    textAlign: 'center',
  },

  valueSymbol: {
    color: theme.palette.common.primaryText,
    fontSize: 12,
    fontFamily: theme.typography.mediumFontFamily,
  },
  meta: {
    fontFamily: theme.typography.thinFontFamily,
    color: theme.palette.common.primaryCyan,
    fontSize: 10.3,
    lineHeight: '15px',
    letterSpacing: 1,
    width: '90%',
  },
  splitBar: {
    width: 100,
    height: 0.5,
    backgroundColor: theme.palette.common.primaryText,
    marginTop: 10,
    marginBottom: 10,
  },
  section: {
    display: 'flex',
    textAlign: 'center',
    fontFamily: theme.typography.mediumFontFamily,
    height: 30,
    marginLeft: -5,
    justifyContent: 'space-between',
    position: 'relative',
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    width: 25,
    fontFamily: theme.typography.lightFontFamily,
    justifyContent: 'space-around',
    height: 25,
    marginRight: 2.5,
  },
  graphTitleSection: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    width: 25,
    fontFamily: theme.typography.lightFontFamily,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 30,
    marginLeft: 15,
    marginRight: 10,
  },
  subTitle: {
    fontSize: 6,
    lineHeight: '5px',
    letterSpacing: 0.57,
  },
  eachWrapper: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
  eachGrowth: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: theme.typography.lightFontFamily,
    height: 37,
    width: 17.3,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  balance: {
    fontSize: 5.67,
    letterSpacing: 0.0,
    fontFamily: theme.typography.mediumFontFamily,
  },
  symbol: {
    fontSize: 3.78,
    letterSpacing: 0.0,
  },
  borderBar: {
    height: 30,
    width: 1,
    backgroundColor: theme.palette.common.primaryText,
  },
  horiSpliter: {
    position: 'absolute',
    bottom: 5,
    right: 0,
    width: 220,
    height: 0.5,
    marginTop: -5,
    backgroundColor: theme.palette.common.primaryText,
    '&:after': {
      position: 'absolute',
      right: 0,
      top: 0,
      height: 5,
      width: 0.3,
      content: `''`,
      backgroundColor: theme.palette.common.primaryText,
    },
    '&:before': {
      position: 'absolute',
      left: 0,
      top: 0,
      height: 5,
      width: 0.3,
      backgroundColor: theme.palette.common.primaryText,
      content: `''`,
    },
  },
  green: {
    color: theme.palette.common.secondaryGreen,
  },
  blue: {
    color: theme.palette.common.thirdBlue,
  },
  red: {
    color: theme.palette.common.primaryRed,
  },

  years: {
    fontSize: 5.67,
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.primaryText,
    marginTop: 15,
    marginLeft: -25,
    letterSpacing: 0,
  },
  eachYear: {
    width: 23,
  },
}))

const Widget60 = ({ style = {}, width = 1173, height = 476, topic = 'topic-60' }) => {
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
        marginBottom: 0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: 8,
        width: width,
        height: height,
        overflow: 'initial',
      }}
    >
      <div
        className={classes.root}
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          overflow: 'initial',
        }}
      >
        <div className={classes.title}>{title}</div>

        <div className={classes.body}>
          <div className={classes.meta}>{data.meta}</div>
          <div className={classes.splitBar}></div>

          <div className={classes.section}>
            <div className={classes.titleSection}>
              <div className={classes.subTitle}>Lead Price</div>
              <div className={classes.subTitle}>Market Context</div>
            </div>

            {data.names.map((each, idx) => {
              return (
                <div className={classes.eachWrapper} key={`widget60-${idx}`}>
                  <div className={classes.eachGrowth}>
                    <div className={classes.balance} style={{ visibility: data.data.lead[idx] ? 'visible' : 'hidden' }}>
                      {data.data.lead[idx] ? data.data.lead[idx].toFixed(2) + '%' : '0%'}
                    </div>
                    {data.data.context[idx] !== 'equal' ? (
                      <Triangle
                        type={data.data.context[idx] === TriangleType.up ? TriangleType.up : TriangleType.down}
                        mode={data.data.context[idx] === TriangleType.up ? TriangleMode.success : TriangleMode.danger}
                        bottomWidth={5}
                        width={4.25}
                      />
                    ) : (
                      <EqualBarLine height={2} width={10} wrapperHeight={5}></EqualBarLine>
                    )}
                    <div className={classes.balance}>{data.names[idx]}</div>
                  </div>
                  {idx !== data.names.length - 1 && <div className={classes.borderBar}></div>}
                </div>
              )
            })}
            <div className={classes.horiSpliter}></div>
          </div>
          <div style={{ marginLeft: -15, marginTop: 15 }}>
            <TableLineGraph
              data={{
                names: data.names,
                data: data.data.graph,
              }}
              width={240}
              height={120}
              strokeWidth={0.5}
            ></TableLineGraph>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget60
