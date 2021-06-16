import React from 'react'

import clsx from 'clsx'
import GradientProgress from 'components/processes/GradientProgress'
import CircleTypePercentage from 'components/basic_components/CircleTypePercentage'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: theme.typography.ultralightFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  headerBold: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    height: 30,
    width: 40,
    textAlign: 'start',
    paddingLeft: 3,
    marginBottom: 5,
  },
  headerNormal: {
    height: 30,
    textAlign: 'start',
    marginBottom: 5,
    fontFamily: theme.typography.thinFontFamily,
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  alignRight: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  alignLeft: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingRight: 10,
  },

  tableTd: {
    height: 13,
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: theme.typography.thinFontFamily,
    paddingRight: 10,
    alignItems: 'center',
  },
  contentBold: {
    fontFamily: theme.typography.mediumFontFamily,
    display: 'flex',
    alingItems: 'center !important',
    height: 13,
    textAlign: 'start',
  },
  tableWrapper: {
    fontFamily: theme.typography.ultralightFontFamily,
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
}))

const CostIncomeHistory = ({ data = [], style = {}, processType = null, circleColor = 'blue' }) => {
  const classes = useStyles()

  let tableData = data
  let maxInvest = 0
  let maxRatio = 0
  let maxForOffset = 0

  tableData.forEach((item, idx) => {
    tableData[idx] = {
      ...tableData[idx],
      incomeRatio: ((100 * item.costs) / item.income).toFixed(1),
      growthCost: idx < tableData.length - 1 && item.costs - tableData[idx + 1].costs,
      growthIncome: idx < tableData.length - 1 && item.income - tableData[idx + 1].income,
      operatingLeverage:
        idx < tableData.length - 1 && item.income - tableData[idx + 1].income - (item.costs - tableData[idx + 1].costs),
    }

    maxInvest = maxInvest < tableData[idx].costs ? tableData[idx].costs : maxInvest
    maxInvest = maxInvest < tableData[idx].income ? tableData[idx].income : maxInvest
    maxRatio = maxRatio < Math.abs(tableData[idx].incomeRatio) ? Math.abs(tableData[idx].incomeRatio) : maxRatio

    maxForOffset =
      maxForOffset < Math.abs(tableData[idx].growthCost) ? Math.abs(tableData[idx].growthCost) : maxForOffset
    maxForOffset =
      maxForOffset < Math.abs(tableData[idx].growthIncome) ? Math.abs(tableData[idx].growthIncome) : maxForOffset
    maxForOffset =
      maxForOffset < Math.abs(tableData[idx].operatingLeverage)
        ? Math.abs(tableData[idx].operatingLeverage)
        : maxForOffset
  })

  return (
    <div className={classes.root} style={{ ...style }}>
      <table className={classes.tableWrapper}>
        <tbody>
          <tr>
            <td>
              {' '}
              <div className={clsx(classes.headerBold, classes.alignCenter)}>£m</div>
            </td>
            <td>
              {' '}
              <div className={clsx(classes.alignLeft, classes.headerNormal)}>Costs</div>
            </td>
            <td>
              {' '}
              <div className={clsx(classes.alignLeft, classes.headerNormal)}>Income</div>
            </td>
            <td>
              {' '}
              <div className={clsx(classes.alignLeft, classes.headerNormal)} style={{ width: 65 }}>
                Cost : Income Ratio
              </div>
            </td>
            <td>
              {' '}
              <div className={clsx(classes.alignLeft, classes.headerNormal)}>Growth in Costs</div>
            </td>
            <td>
              {' '}
              <div className={clsx(classes.alignLeft, classes.headerNormal)}>Growth in Income</div>
            </td>
            <td>
              {' '}
              <div className={clsx(classes.alignLeft, classes.headerNormal)}>Operating Leverage</div>
            </td>
          </tr>
          {tableData.map((item, idx) => {
            return (
              <tr key={idx}>
                <td>
                  <div className={clsx(classes.tableTd, classes.contentBold)}>{item.year}</div>
                </td>
                <td>
                  <div className={clsx(classes.alignRight, classes.tableTd)} style={{ width: 55 }}>
                    <GradientProgress
                      value={item.costs}
                      maxValue={maxInvest}
                      mode={'danger'}
                      direction={'reverse'}
                      progressWidth={30}
                      width={30}
                      height={5}
                      processType={processType}
                    />
                    ({item.costs})
                  </div>
                </td>
                <td>
                  <div className={classes.tableTd} style={{ width: 55 }}>
                    <GradientProgress
                      value={item.income}
                      maxValue={maxInvest}
                      progressWidth={30}
                      width={30}
                      processType={processType}
                      height={5}
                      mode={'success'}
                    />
                    {item.income}
                  </div>
                </td>
                <td>
                  <div className={classes.tableTd} style={{ width: 70 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', width: 28 }}>
                      <CircleTypePercentage
                        height={14}
                        value={item.incomeRatio}
                        maxValue={maxRatio}
                        circleColor={circleColor}
                      />
                    </div>
                    <div style={{ width: 10 }}></div>
                    {item.incomeRatio}%
                  </div>
                </td>

                {item.growthCost !== 0 && (
                  <td>
                    <div className={classes.tableTd} style={{ width: 45 }}>
                      <GradientProgress
                        value={Math.abs(item.growthCost)}
                        maxValue={maxForOffset}
                        width={25}
                        progressWidth={25}
                        processType={processType}
                        height={5}
                        mode={item.growthCost > 0 ? 'danger' : 'success'}
                      />
                      {item.growthCost > 0 ? item.growthCost : '(' + Math.abs(item.growthCost) + ')'}
                    </div>
                  </td>
                )}
                <td>
                  {item.growthIncome !== 0 && (
                    <div className={classes.tableTd} style={{ width: 50 }}>
                      <GradientProgress
                        value={Math.abs(item.growthIncome)}
                        maxValue={maxForOffset}
                        width={25}
                        progressWidth={20}
                        height={5}
                        processType={processType}
                        mode={item.growthIncome > 0 ? 'danger' : 'success'}
                      />
                      {item.growthIncome > 0 ? item.growthIncome : '(' + Math.abs(item.growthIncome) + ')'}
                    </div>
                  )}
                </td>
                <td>
                  {item.operatingLeverage !== 0 && (
                    <div className={classes.tableTd} style={{ width: 50 }}>
                      <GradientProgress
                        value={Math.abs(item.operatingLeverage)}
                        maxValue={maxForOffset}
                        width={25}
                        progressWidth={20}
                        height={5}
                        processType={processType}
                        mode={item.operatingLeverage > 0 ? 'danger' : 'success'}
                      />
                      {item.operatingLeverage > 0
                        ? item.operatingLeverage
                        : '(' + Math.abs(item.operatingLeverage) + ')'}
                    </div>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <svg className={classes.twoline} viewBox={`0 0 455, 220`} xmlns="http://www.w3.org/2000/svg">
        <path className={classes.path} d={`M 40 37, L 40 215`} strokeWidth={0.5} />
        <path className={classes.path} d={`M 265 37, L 265 215`} strokeWidth={0.5} />
      </svg>
    </div>
  )
}

export default CostIncomeHistory
