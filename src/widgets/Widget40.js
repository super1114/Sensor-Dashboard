import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode, TriangleType, TriangleMode } from 'constants/common'
import Triangle from 'components/basic_components/Triangle'
import useNodeRed from 'hooks/useNodeRed'
import GradientProgress from 'components/processes/GradientProgress'
import { threeDots } from 'helpers/helpers'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontFamily: theme.typography.thinFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 9,
    marginLeft: 5,
    height: 'auto',
  },
  title: {
    fontFamily: theme.typography.mediumFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 1,
    fontSize: 10,
    marginBottom: 10,
  },
  body: {
    display: 'flex',
    height: 'inherit',
    color: theme.palette.common.primaryText,
    alignItems: 'flex-start',
  },
  table: {
    color: theme.palette.common.primaryText,
    fontSize: 9,
    lineHeight: 1.5,
    position: 'relative',
    overflow: 'hidden',
  },
  headerBold: {
    fontFamily: theme.typography.mediumFontFamily,
    letterSpacing: 1,
    color: theme.palette.common.primaryText,
    height: 30,
    textAlign: 'start',
    marginBottom: 10,
  },
  headerSemiBold: {
    fontFamily: theme.typography.semiBoldFontFamily,
    letterSpacing: 1,
    color: theme.palette.common.primaryText,
    height: 30,
    textAlign: 'start',
    marginBottom: 10,
  },
  headerNormal: {
    fontFamily: theme.typography.lightFontFamily,
    height: 30,
    display: 'flex',
    textAlign: 'start',
    marginBottom: 4,
    letterSpacing: 1.1,
  },
  alignLeft: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  value: {
    fontFamily: theme.typography.ultralightFontFamily,
    display: 'flex',
    alignItems: 'center',
  },

  tableTd: {
    height: 15,
    display: 'flex',
    fontFamily: theme.typography.lightFontFamily,
    justifyContent: 'space-between',
    paddingRight: 10,
    alignItems: 'center',
  },
  alignContentCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  triangleWrapper: {
    display: 'flex',
    width: 40,
    height: 28,
    flexDirection: 'column',
    alignItems: 'center',
  },
  contentMedium: {
    fontFamily: theme.typography.mediumFontFamily,
    letterSpacing: 1,
  },
  contentThin: {
    fontFamily: theme.typography.thinFontFamily,
  },
  tableWrapper: {
    borderCollapse: 'none',
  },
  twoline: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  path: {
    fill: 'transparent',
    stroke: `rgb(255,255,255, 0.5)`,
    strokeWidth: 0.5,
  },

  successText: {
    color: theme.palette.common.secondaryGreen,
  },
  dangerText: {
    color: theme.palette.common.primaryRed,
  },

  equalLine: {
    height: 1,
    width: 13,
    backgroundColor: theme.palette.common.primaryCyan,
  },
  gridTable: {
    position: 'absolute',
    top: 51,
    right: 15,
    border: '1px solid rgb(255,255,255, 0.3)',
  },
}))

const Widget40 = ({
  style = {},
  width = 740,
  height = 420,
  cellHeight = 11,
  topOffset = 20,
  topic = 'widget-40',
  cellRowCount = 51,
  strokeWidth = 0.1,
  cellColumnCount = 18,
}) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()

  if (!title || data.length === 0) {
    return ''
  }

  let maxRisk = Math.max(...data.map(each => each.costOfRisk), ...data.map(each => each.marketRiskPercentage))

  const gridWidth = cellRowCount * cellHeight
  const gridHeight = cellColumnCount * cellHeight

  let gridColumns = []
  for (let i = 1; i < cellRowCount; i++) {
    let plus = 0
    gridColumns.push(
      <g key={i}>
        <path
          className={classes.path}
          d={`M ${i * cellHeight + plus} 0,
                L ${i * cellHeight + plus} ${gridHeight}`}
          strokeWidth={strokeWidth}
        />
      </g>
    )
  }
  for (let i = 1; i < cellColumnCount; i++) {
    gridColumns.push(
      <g key={`height-${i}`}>
        <path
          className={classes.path}
          d={`M 0, ${i * cellHeight}
                L ${gridWidth}, ${i * cellHeight}`}
          strokeWidth={strokeWidth}
        />
      </g>
    )
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        marginLeft: 5,
        marginTop: 0,
        marginRight: 0,
        paddingLeft: 5,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 10,
      }}
    >
      <div
        className={classes.root}
        style={{
          width: width,
          height: height,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className={classes.title}>{title}</div>
        <div className={classes.body}>
          <div className={classes.table}>
            <table className={classes.tableWrapper}>
              <tbody>
                <tr>
                  <td>
                    <div className={clsx(classes.headerSemiBold, classes.alignCenter)} style={{ width: 25 }}>
                      £bn
                    </div>
                  </td>
                  <td>
                    <div
                      className={clsx(classes.headerNormal, classes.alignLeft)}
                      style={{ width: 40, marginRight: 20 }}
                    >
                      Impairment
                    </div>
                  </td>
                  <td>
                    <div
                      className={clsx(classes.headerNormal, classes.alignLeft)}
                      style={{ width: 40, marginRight: 10 }}
                    >
                      Total Balances
                    </div>
                  </td>
                  <td>
                    <div
                      className={clsx(classes.headerNormal, classes.contentMedium, classes.alignLeft)}
                      style={{ width: 60, marginRight: 10 }}
                    >
                      Cost of Risk
                    </div>
                  </td>
                  <td>
                    <div
                      className={clsx(classes.headerNormal, classes.alignLeft)}
                      style={{ width: 50, marginRight: 35, alignItems: 'center' }}
                    >
                      YoY Performance
                    </div>
                  </td>
                  <td>
                    <div
                      className={clsx(classes.headerNormal, classes.alignLeft, classes.contentThin)}
                      style={{ width: 40, marginRight: 20 }}
                    >
                      Market Cost of Risk
                    </div>
                  </td>
                  <td>
                    <div
                      className={clsx(classes.headerNormal, classes.alignLeft, classes.contentThin)}
                      style={{ width: 40, marginRight: 20 }}
                    >
                      Total Market Balances
                    </div>
                  </td>
                  <td>
                    <div
                      className={clsx(classes.headerNormal, classes.contentMedium, classes.alignLeft)}
                      style={{ width: 55, marginRight: 25 }}
                    >
                      Market
                      <br /> Cost of <br />
                      Risk
                    </div>
                  </td>
                  <td>
                    <div
                      className={clsx(classes.headerNormal, classes.alignLeft)}
                      style={{ width: 40, marginRight: 10 }}
                    >
                      Company vs. Market
                    </div>
                  </td>
                </tr>
                {data.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>
                        <div className={clsx(classes.tableTd, classes.contentMedium)}>{item.year}</div>
                      </td>
                      <td>
                        <div className={clsx(classes.tableTd)}>{threeDots(item.impairment.toFixed(1))}</div>
                      </td>
                      <td>
                        <div className={clsx(classes.tableTd)}>{threeDots(item.totalBalance.toFixed(0))}</div>
                      </td>
                      <td>
                        <div className={clsx(classes.tableTd)} style={{ width: 70 }}>
                          <GradientProgress
                            value={item.costOfRisk}
                            maxValue={maxRisk}
                            mode={'success'}
                            color={'blue'}
                            progressWidth={30}
                            width={30}
                            height={7}
                          />
                          <div className={clsx(classes.contentMedium, classes.value)}>
                            {item.costOfRisk.toFixed(2)}%
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          className={clsx(classes.tableTd, classes.alignContentCenter, classes.contentThin)}
                          style={{ marginRight: 25 }}
                        >
                          {item.yoy === 0 ? (
                            <div className={classes.triangleWrapper}>
                              <div className={classes.equalLine} />
                              {item.yoy} bps
                            </div>
                          ) : item.yoy > 0 ? (
                            <div className={classes.triangleWrapper}>
                              <Triangle type={TriangleType.up} mode={TriangleMode.danger} width={5} bottomWidth={6} />(
                              {item.yoy}) bps
                            </div>
                          ) : (
                            <div className={classes.triangleWrapper}>
                              <Triangle
                                type={TriangleType.down}
                                mode={TriangleMode.success}
                                width={5}
                                bottomWidth={6}
                              />
                              {Math.abs(item.yoy)} bps
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className={clsx(classes.tableTd, classes.contentThin)}>
                          {threeDots(item.marketCostOfRisk.toFixed(1))}
                        </div>
                      </td>
                      <td>
                        <div className={clsx(classes.tableTd, classes.contentThin)}>
                          {threeDots(item.totalMarketBalances.toFixed(3))}
                        </div>
                      </td>
                      <td>
                        <div className={clsx(classes.contentMedium, classes.tableTd)} style={{ width: 70 }}>
                          <GradientProgress
                            value={item.marketRiskPercentage}
                            maxValue={maxRisk}
                            mode={'success'}
                            color={'cyan'}
                            progressWidth={40}
                            width={40}
                            height={7}
                          />
                          <div className={clsx(classes.contentMedium, classes.value)}>
                            {item.marketRiskPercentage.toFixed(2)}%
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={clsx(classes.tableTd, classes.alignContentCenter, classes.contentThin)}>
                          {item.companyVsMarket === 0 ? (
                            <div className={classes.triangleWrapper}>
                              <div className={classes.equalLine} />
                              {item.companyVsMarket} bps
                            </div>
                          ) : item.companyVsMarket > 0 ? (
                            <div className={classes.triangleWrapper}>
                              <Triangle type={TriangleType.up} mode={TriangleMode.danger} width={5} bottomWidth={6} />(
                              {item.companyVsMarket}) bps
                            </div>
                          ) : (
                            <div className={classes.triangleWrapper}>
                              <Triangle
                                type={TriangleType.down}
                                mode={TriangleMode.success}
                                width={5}
                                bottomWidth={6}
                              />
                              {Math.abs(item.companyVsMarket)} bps
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <svg
          className={classes.gridTable}
          style={{ top: 50 + topOffset, left: 42 }}
          height={gridHeight}
          viewBox={`0 0 ${gridWidth} ${gridHeight}`}
          width={gridWidth}
          xmlns="http://www.w3.org/2000/svg"
        >
          {gridColumns}
        </svg>
      </div>
    </DashboardCard>
  )
}

export default Widget40
