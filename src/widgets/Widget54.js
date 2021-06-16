import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'
import { toBillion } from 'helpers/helpers'
import clsx from 'clsx'
import Triangle from 'components/basic_components/Triangle'
import { TriangleMode, TriangleType } from 'constants/common'
import EqualBarLine from 'components/basic_components/EqualBarLine'
import LineGraphWithTitle from 'components/graphs/LineGraphWithTitle'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 8,
    padding: 5,
    letterSpacing: 1.5,
    width: '100%',
    height: 'auto',
    WebkitTextSizeAdjust: 'none',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 0.93,
    fontSize: 11.67,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 10,
    letterSpacing: 0.83,
    color: theme.palette.common.primaryText,
    textAlign: 'center',
  },
  value: {
    color: theme.palette.common.primaryText,
    fontSize: 23,
    fontFamily: theme.typography.mediumFontFamily,
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
    width: '87%',
  },

  splitBar: {
    width: 100,
    height: 0.5,
    backgroundColor: theme.palette.common.primaryText,
    marginTop: 20,
    marginBottom: 15,
  },

  section: {
    display: 'flex',
    textAlign: 'center',
    fontFamily: theme.typography.mediumFontFamily,
    height: 30,
    marginLeft: -5,
    justifyContent: 'space-between',
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right',
    width: 25,
    fontFamily: theme.typography.mediumFontFamily,
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
    marginLeft: 10,
    marginRight: 2,
  },
  subTitle: {
    fontSize: 5.67,
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
    width: 22,
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
    width: 0.5,
    backgroundColor: theme.palette.common.primaryText,
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
    marginTop: 12,
    marginLeft: -10,
    letterSpacing: 0,
  },
  eachYear: {
    width: 22.4,
  },
}))

const Widget54 = ({ style = {}, width = 255, height = 185, topic = 'topic-54' }) => {
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
        marginLeft: 10,
        marginRight: 0,
        marginTop: 0,
        paddingLeft: 7.5,
        paddingRight: 7.5,
        paddingTop: 0,
        borderRadius: 8,
        width: width,
        height: height,
        overflow: 'hidden',
      }}
    >
      <div
        className={classes.root}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className={classes.title}>{title}</div>
        <div className={classes.body}>
          <div className={classes.meta}>{data.metaContent[0]}</div>
          <div className={classes.value}>
            <span className={classes.valueSymbol}>£</span>
            {toBillion(data.value)}
            <span className={classes.valueSymbol}>bn</span>
          </div>
          <div className={classes.meta}>{data.metaContent[1]}</div>
          <div className={classes.splitBar}></div>

          <div className={classes.section}>
            <div className={classes.titleSection}>
              <div className={classes.subTitle}>Balance</div>
              <div className={classes.subTitle}>Market Context</div>
            </div>

            {data.data.years.map((each, idx) => {
              return (
                <div className={classes.eachWrapper} key={idx}>
                  <div className={classes.eachGrowth}>
                    <div className={classes.balance}>
                      <span className={classes.symbol}>£</span>
                      {toBillion(data.data.balance[idx]).toFixed(1)}
                      <span className={classes.symbol}>bn</span>
                    </div>
                    {data.data.growth[idx] !== 'equal' ? (
                      <Triangle
                        type={data.data.growth[idx] === TriangleType.up ? TriangleType.up : TriangleType.down}
                        mode={data.data.growth[idx] === TriangleType.up ? TriangleMode.success : TriangleMode.danger}
                        bottomWidth={5}
                        width={4.25}
                      />
                    ) : (
                      <EqualBarLine height={2} width={10} wrapperHeight={5}></EqualBarLine>
                    )}
                    <div className={classes.balance}>{data.data.years[idx]}</div>
                  </div>
                  {idx !== data.data.years.length - 1 && <div className={classes.borderBar}></div>}
                </div>
              )
            })}
            <div className={classes.graphSection}></div>
          </div>

          <div className={classes.section}>
            <div className={clsx(classes.graphTitleSection, classes.green)} style={{ height: 35 }}>
              <div className={classes.subTitle}>Top Performer</div>
            </div>
            <LineGraphWithTitle
              width={width - 37}
              values={data.graph.top}
              suffix={''}
              title={''}
              fontBold={true}
              labelYPosition={'top'}
              height={25}
              fontSize={8}
              strokeColor={'green'}
              outerRadius={3}
              innerRadius={1.5}
              strokeWidth={0.5}
              titleWidth={0}
              titleMargin={0}
              noText={true}
            />
          </div>

          <div className={classes.section}>
            <div className={clsx(classes.graphTitleSection, classes.blue)} style={{ height: 35 }}>
              <div className={classes.subTitle}>Company</div>
            </div>
            <LineGraphWithTitle
              width={width - 37}
              values={data.graph.company}
              suffix={''}
              title={''}
              fontBold={true}
              labelYPosition={'top'}
              height={25}
              fontSize={8}
              strokeColor={'blue'}
              outerRadius={3}
              innerRadius={1.5}
              strokeWidth={0.5}
              titleWidth={0}
              titleMargin={0}
              noText={true}
            />
          </div>

          <div className={classes.section}>
            <div className={clsx(classes.graphTitleSection, classes.red)} style={{ height: 40 }}>
              <div className={classes.subTitle}>Worst Porformer</div>
            </div>
            <LineGraphWithTitle
              width={width - 37}
              values={data.graph.worst}
              suffix={''}
              title={''}
              fontBold={true}
              labelYPosition={'top'}
              height={15}
              fontSize={8}
              strokeColor={'red'}
              outerRadius={3}
              innerRadius={1.5}
              strokeWidth={0.5}
              titleWidth={0}
              titleMargin={0}
              noText={true}
            />
          </div>

          <div className={classes.section}>
            <div className={clsx(classes.graphTitleSection, classes.red)}></div>
            <div className={classes.years}>
              {data.data.years.map((each, idx) => {
                return (
                  <div key={idx} className={classes.eachYear}>
                    {each}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget54
