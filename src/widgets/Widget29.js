import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode, TriangleType, TriangleSize } from 'constants/common'
import Triangle from 'components/basic_components/Triangle'
import OutlineTriangle from 'components/basic_components/OutlineTriangle'
import useNodeRed from 'hooks/useNodeRed'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import InfoIcon from '@material-ui/icons/Info'
import { useState, useContext } from 'react'

import ToolTipContext from '../contexts/ToolTipContext'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: 'auto',
    fontFamily: theme.typography.ultraFontFamily,
    color: theme.palette.common.primaryText,
    lineHeight: 1.4,
    fontSize: 11.26,
    lineHeight: '13.26px',
    letterSpacing: 0.94,
    position: 'relative',
  },
  blueTitle: {
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.primaryBlue,
    fontSize: 11.26,
    lineHeight: '13.26px',
    letterSpacing: 0.94,
  },
  cyanTitle: {
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.primaryCyan,
    fontSize: 11.26,
    lineHeight: '13.26px',
    letterSpacing: 0.94,
  },
  greenTitle: {
    color: theme.palette.common.primaryGreen,
    fontSize: 11.26,
    lineHeight: '13.26px',
    letterSpacing: 0.94,
  },
  thirdBlueTitle: {
    color: theme.palette.common.secondaryBlue,
    fontSize: 11.26,
    lineHeight: '13.26px',
    letterSpacing: 0.94,
  },
  wrapper: {
    fontSize: 11,
    borderCollapse: 'collapse',
    marginTop: -15,
    width: '100%',
  },
  subRightTitle: {
    fontFamily: theme.typography.lightFontFamily,
    display: 'flex',
    fontSize: 11.26,
    lineHeight: '13.26px',
    letterSpacing: 0.94,
    height: 32,
    maxWidth: '11ch',
    alignItems: 'flex-end',
    paddingRight: 20,
    marginBottom: 2,
    justifyContent: 'flex-end',
  },
  subLeftTitle: {
    fontFamily: theme.typography.lightFontFamily,
    display: 'flex',
    fontSize: 11.26,
    lineHeight: '13.26px',
    letterSpacing: 0.94,
    height: 32,
    maxWidth: '11ch',
    alignItems: 'flex-end',
    marginBottom: 2,
    paddingLeft: 30,
    marginLeft: -10,
    justifyContent: 'flex-start',
  },
  eachRightCell: {
    display: 'flex',
    height: 32,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingtop: 2,
    paddingRight: 20,
  },
  eachLeftCell: {
    display: 'flex',
    height: 32,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 30,
  },

  titleCell: {
    display: 'flex',
    height: 29,
    fontSize: 11,
    fontFamily: theme.typography.thinFontFamily,
    alignItems: 'flex-start',
    width: 160,
  },
  oneRow: {
    height: 29,
  },

  gridTable: {
    position: 'absolute',
    top: 51,
    right: 11.26,
    lineHeight: '13.26px',
    letterSpacing: 0.94,
    border: '1px solid rgb(255,255,255, 0.3)',
  },
  path: {
    fill: 'transparent',
    stroke: `${theme.palette.common.primaryText}`,
  },
  equal: {
    backgroundColor: theme.palette.common.primaryCyan,
    height: 2,
    width: 20,
    marginTop: 5,
  },

  upArrow: {
    fill: 'transparent',
    stroke: theme.palette.common.secondaryGreen,
    strokeWidth: 1,
  },
  downArrow: {
    fill: 'transparent',
    stroke: theme.palette.common.primaryRed,
    strokeWidth: 1,
  },
  up: {
    color: theme.palette.common.primaryGreen,
    alignItems: 'center',
    display: 'flex',
  },
  down: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.common.primaryRed,
  },

  cellWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  companyContent: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: '100%',
  },
  infoIcon: {
    fontSize: 13,
    marginTop: 1,
    position: 'absolute',
    color: '#F65C6B',
    zIndex: 2,
  },
  wrapperCircle: {
    position: 'relative',
    backgroundColor: 'transparent',
  },
  iconWhite: {
    backgroundColor: 'white',
    position: 'absolute',
    width: 3,
    height: 8,
    left: 5,
    top: 3,
  },
  successValue: {
    color: theme.palette.common.secondaryGreen,
    marginLeft: 4,
  },
  dangerValue: {
    color: theme.palette.common.primaryRed,
    marginLeft: 4,
  },
  primaryValue: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
  },
  primaryLightValue: {
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.primaryText,
  },
}))

const Widget29 = ({
  style = {},
  width = 740,
  height = 420,
  cellHeight = 17,
  topOffset = 0,
  topic = 'widget-29',
  titleWidth = 160,
  titleFontSize = null,

  cellColumnCount = 31,
  cellRowCount = null,

  mainHeight = 0,
  eachRightCell = 20,
  eachLeftCell = 30,

  zoom = 1,
}) => {
  const { title, data, titleColor } = useNodeRed(topic)
  const classes = useStyles()
  const [isOnHover, setIsOnHover] = useState(false)

  const { setToolTipData } = useContext(ToolTipContext)

  if (!title) {
    return ''
  }
  const strokeWidth = 0.25
  const gridWidth = cellColumnCount * cellHeight
  const gridHeight = (cellRowCount ? cellRowCount + 1 : data.data.length * 2) * cellHeight + 2

  let gridColumns = []
  for (let i = 1; i < cellColumnCount; i++) {
    gridColumns.push(
      <g key={i}>
        <path
          className={classes.path}
          d={`M ${i * cellHeight} 0, L ${i * cellHeight} ${gridHeight}`}
          strokeWidth={strokeWidth}
        />
      </g>
    )
  }

  let gridRows = []

  for (let i = 1; i < (cellRowCount ? cellRowCount + 1 : data.data.length * 2); i++) {
    gridRows.push(
      <path
        key={i}
        className={classes.path}
        d={`M 0 ${i * cellHeight}, L ${gridWidth} ${i * cellHeight}`}
        strokeWidth={strokeWidth}
      />
    )
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        borderRadius: 8,
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
        <div
          className={clsx({
            [classes.blueTitle]: titleColor === 'blue',
            [classes.greenTitle]: titleColor === 'green',
            [classes.thirdBlueTitle]: titleColor === 'purple',
            [classes.cyanTitle]: titleColor === undefined,
          })}
          style={{
            marginBottom: topOffset,
            fontSize: titleFontSize ? titleFontSize : 12,
          }}
        >
          {title}
        </div>
        <div styles={{ height: mainHeight }}></div>

        <table className={classes.wrapper}>
          <tbody>
            <tr className={classes.oneRow}>
              <th style={{ height: 47 }}></th>
              {data.columns.map((item, idx) => {
                if (data.columns[idx] === 'Company' || data.columns[idx] === 'Market')
                  return (
                    <th key={idx}>
                      <div className={classes.subRightTitle} style={{ paddingRight: eachRightCell }}>
                        {item}
                      </div>
                    </th>
                  )
                return (
                  <th key={idx}>
                    <div className={classes.subLeftTitle} style={{ paddingLeft: eachLeftCell }}>
                      {item}
                    </div>
                  </th>
                )
              })}
            </tr>
            {data.data.map((item, idx) => {
              return (
                <tr className={classes.oneRow} key={idx}>
                  <td className={classes.titleCell} style={{ width: titleWidth }}>
                    {item.title}
                    {item.badge === 'info' && (
                      <InfoOutlinedIcon
                        style={{ fontSize: 18, marginLeft: 3, marginTop: -2 }}
                        id={`titleCellInfo-${idx}`}
                        onMouseOver={e => {
                          let elem = document.querySelector(`#titleCellInfo-${idx}`)
                          let rect = elem.getBoundingClientRect()
                          if (isOnHover === false)
                            setToolTipData(
                              item.tooltip ? item.tooltip : 'There is no data from data-driven',
                              rect.x,
                              rect.y,
                              true,
                              zoom
                            )
                          setIsOnHover(true)
                        }}
                        onMouseLeave={e => {
                          setIsOnHover(false)
                          setToolTipData()
                        }}
                      />
                    )}
                  </td>
                  {item.details.map((each, index) => {
                    if (data.columns[index] === 'Company' || data.columns[index] === 'Market')
                      return (
                        <td key={index}>
                          <div className={classes.eachRightCell} style={{ paddingRight: eachRightCell }}>
                            {data.columns[index] === 'Company' ? (
                              <div className={classes.companyContent}>
                                <span className={classes.primaryValue}>{each.value}</span>
                                {each.badge === 'info' && (
                                  <div
                                    className={classes.wrapperCircle}
                                    id={`eachCellInfo-${idx}-${index}`}
                                    onMouseOver={e => {
                                      let elem = document.querySelector(`#eachCellInfo-${idx}-${index}`)
                                      let rect = elem.getBoundingClientRect()
                                      if (isOnHover === false)
                                        setToolTipData(
                                          each.tooltip ? each.tooltip : 'There is no data from data-driven',
                                          rect.x,
                                          rect.y,
                                          true,
                                          zoom
                                        )
                                      setIsOnHover(true)
                                    }}
                                    onMouseLeave={e => {
                                      setIsOnHover(false)
                                      setToolTipData()
                                    }}
                                  >
                                    <div className={classes.iconWhite}></div>
                                    <InfoIcon className={classes.infoIcon} />
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className={classes.primaryLightValue}>{each.value}</span>
                            )}
                          </div>
                        </td>
                      )
                    return (
                      <td key={index}>
                        <div className={classes.eachLeftCell} style={{ paddingLeft: eachLeftCell }}>
                          <div className={classes.cellWrapper}>
                            {each.fill ? (
                              <>
                                {each.growth ? (
                                  <Triangle
                                    type={each.growth}
                                    mode={each.growth === TriangleType.up ? 'success' : 'danger'}
                                    width={TriangleSize.width / 2}
                                    bottomWidth={TriangleSize.bottomWidth / 2}
                                  />
                                ) : (
                                  <div className={classes.equal}></div>
                                )}
                              </>
                            ) : (
                              <>
                                {each.growth ? (
                                  <OutlineTriangle
                                    type={each.growth}
                                    mode={each.growth === TriangleType.up ? 'success' : 'danger'}
                                    width={TriangleSize.width}
                                    height={TriangleSize.bottomWidth / 2}
                                  />
                                ) : (
                                  <div className={classes.equal}></div>
                                )}
                              </>
                            )}
                            {each.growth && each.growth === TriangleType.up ? (
                              <span className={classes.successValue}>{each.value}</span>
                            ) : (
                              <span className={classes.dangerValue}>{each.value}</span>
                            )}
                          </div>
                        </div>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>

        <svg
          className={classes.gridTable}
          style={{ top: 45 + topOffset }}
          height={gridHeight}
          viewBox={`0 0 ${gridWidth} ${gridHeight}`}
          width={gridWidth}
          xmlns="http://www.w3.org/2000/svg"
        >
          {gridRows}
          {gridColumns}
        </svg>
      </div>
    </DashboardCard>
  )
}

export default Widget29
