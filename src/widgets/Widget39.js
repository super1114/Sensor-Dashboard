import { makeStyles } from '@material-ui/core/styles'

import Triangle from 'components/basic_components/Triangle'
import { threeDots } from 'helpers/helpers'
import clsx from 'clsx'
import { CardMode, TriangleMode, TriangleType } from 'constants/common'
import DashboardCard from 'components/basic_components/DashboardCard'
import GradientProgress from 'components/processes/GradientProgress'
import useNodeRed from 'hooks/useNodeRed'
import OutlineTriangle from 'components/basic_components/OutlineTriangle'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontFamily: theme.typography.thinFontFamily,
    fontSize: 8,
    marginLeft: 5,
    height: 'auto',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 1,
    fontSize: 10,
    marginBottom: 5,
  },
  body: {
    display: 'flex',
    height: 'inherit',
    fontFamily: theme.typography.thinFontFamily,
    color: theme.palette.common.primaryText,
    alignItems: 'flex-start',
  },
  table: {
    fontFamily: theme.typography.thinFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 8,
    lineHeight: 1.5,
    position: 'relative',
    overflow: 'hidden',
  },
  titleBlue: {
    fontFamily: theme.typography.thinFontFamily,
    color: theme.palette.common.primaryBlue,
  },
  titleCyan: {
    fontFamily: theme.typography.thinFontFamily,
    color: theme.palette.common.primaryCyan,
  },
  headerSemiBold: {
    fontFamily: theme.typography.semiBoldFontFamily,
    letterSpacing: 1,
    color: theme.palette.common.primaryText,
    height: 30,
    textAlign: 'start',
    marginBottom: 5,
  },
  headerNormal: {
    fontFamily: theme.typography.lightFontFamily,
    height: 30,
    display: 'flex',
    textAlign: 'start',
    marginBottom: 5,
    letterSpacing: 1.1,
  },
  alignLeft: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingRight: 10,
  },

  triangleWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: 37,
    height: 28,
  },
  value: {
    fontFamily: theme.typography.lightFontFamily,
    display: 'flex',
    alignItems: 'center',
  },

  contentMedium: {
    fontFamily: theme.typography.mediumFontFamily,
    letterSpacing: 1,
    display: 'flex',
    alingItems: 'flex-start',
    height: 13,
    textAlign: 'start',
  },
  tableTd: {
    height: 23,
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: 10,
    alignItems: 'center',
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
    stroke: `${theme.palette.common.primaryText}`,
    strokeWidth: 0.5,
  },

  successText: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.secondaryGreen,
  },
  dangerText: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryRed,
  },
}))

const Widget39 = ({ style = {}, width = 'auto', height = 205, topic = 'widget-39' }) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) {
    return ''
  }

  let maxCompanyLoan = Math.max(...data.map(one => one.companyLoan.value))
  let maxMarketLoan = Math.max(...data.map(one => one.marketLoan.value))

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        marginLeft: 0,
        marginTop: 0,
        marginRight: 0,
        paddingLeft: 3,
        paddingRight: 0,
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
                    <div className={clsx(classes.headerSemiBold, classes.alignLeft)}>£bn</div>
                  </td>
                  <td>
                    <div className={clsx(classes.headerNormal, classes.alignLeft)}>
                      <div>
                        <span className={classes.titleBlue}>Company </span>
                        Loans & Advanced Customers
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={clsx(classes.headerNormal, classes.alignLeft)}>
                      <div>
                        <span className={classes.titleCyan}>Market </span>
                        Loans & Advanced Customers
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={clsx(classes.headerNormal, classes.alignLeft)}>
                      <div>
                        <span className={classes.titleBlue}>Company </span>
                        Market Share
                      </div>
                    </div>
                  </td>
                </tr>
                {data.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>
                        <div className={clsx(classes.contentMedium, classes.tableTd)}>{item.year}</div>
                      </td>
                      <td>
                        <div className={clsx(classes.alignRight, classes.tableTd)} style={{ width: 105 }}>
                          <GradientProgress
                            value={item.companyLoan.value}
                            maxValue={maxCompanyLoan}
                            mode={'success'}
                            color={'blue'}
                            progressWidth={30}
                            width={30}
                            height={7}
                          />
                          <div className={classes.value}>{threeDots(item.companyLoan.value.toFixed(1))}</div>
                          <div className={classes.triangleWrapper}>
                            {item.companyLoan.fill ? (
                              <Triangle
                                bottomWidth={11}
                                width={7}
                                mode={
                                  item.companyLoan.growth === TriangleType.up
                                    ? TriangleMode.success
                                    : TriangleMode.danger
                                }
                                type={item.companyLoan.growth}
                              />
                            ) : (
                              <>
                                {
                                  <OutlineTriangle
                                    width={14}
                                    height={11}
                                    strokeWidth={0.5}
                                    type={item.marketLoan.growth}
                                    mode={
                                      item.marketLoan.growth === TriangleType.up
                                        ? TriangleMode.success
                                        : TriangleMode.danger
                                    }
                                  />
                                }
                              </>
                            )}
                            <div style={{ width: 2.5 }}></div>
                            <div
                              className={
                                item.companyLoan.growth === TriangleType.up ? classes.successText : classes.dangerText
                              }
                              style={{ fontSize: 6 }}
                            >
                              {item.companyLoan.growth === TriangleType.up
                                ? `+${item.companyLoan.growthPercentage.toFixed(1)}%`
                                : `(${item.companyLoan.growthPercentage.toFixed(1)})%`}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className={clsx(classes.alignRight, classes.tableTd)} style={{ width: 105 }}>
                          <GradientProgress
                            value={item.marketLoan.value}
                            maxValue={maxMarketLoan}
                            mode={'success'}
                            color={'cyan'}
                            progressWidth={30}
                            width={30}
                            height={7}
                          />
                          <div className={classes.value}>{threeDots(item.marketLoan.value.toFixed(1))}</div>
                          <div style={{ width: 1 }}></div>
                          <div className={classes.triangleWrapper}>
                            {item.marketLoan.fill ? (
                              <Triangle
                                bottomWidth={11}
                                width={7}
                                mode={
                                  item.marketLoan.growth === TriangleType.up
                                    ? TriangleMode.success
                                    : TriangleMode.danger
                                }
                                type={item.marketLoan.growth}
                              />
                            ) : (
                              <>
                                {
                                  <OutlineTriangle
                                    width={14}
                                    height={11}
                                    strokeWidth={0.5}
                                    type={item.marketLoan.growth}
                                    mode={
                                      item.marketLoan.growth === TriangleType.up
                                        ? TriangleMode.success
                                        : TriangleMode.danger
                                    }
                                  />
                                }
                              </>
                            )}
                            <div style={{ width: 2.5 }}></div>
                            <div
                              className={
                                item.marketLoan.growth === TriangleType.up ? classes.successText : classes.dangerText
                              }
                              style={{ fontSize: 6 }}
                            >
                              {item.marketLoan.growth === TriangleType.up
                                ? `+${item.marketLoan.growthPercentage.toFixed(1)}%`
                                : `(${item.marketLoan.growthPercentage.toFixed(1)})%`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ width: 80 }}>{item.companyMarket.percentage.toFixed(2)}%</div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <svg className={classes.twoline} viewBox={`0 0 455, 420`} xmlns="http://www.w3.org/2000/svg">
              <path className={classes.path} d={`M 43 30, L 43 410`} strokeWidth={0.5} />
              <path className={classes.path} d={`M 200 30, L 200 410`} strokeWidth={0.5} />
              <path className={classes.path} d={`M 360 30, L 360 410`} strokeWidth={0.5} />
            </svg>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget39
