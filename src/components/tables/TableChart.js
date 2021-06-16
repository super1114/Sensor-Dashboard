import { makeStyles } from '@material-ui/core/styles'
import TableChartTwoLineCell from './TableChartTwoLineCell'
import TableChartOneLineCell from './TableChartOneLineCell'
import spinCircle from 'assets/icons/spinCircle.svg'
import TriangleSvg from 'assets/icons/outlineTriangle.svg'
import { useState, useEffect } from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'relative',
    letterSpacing: 1.5,
  },
  lines: {
    position: 'absolute',
  },
  title: {
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.primaryText,
    lineHeight: 1.2,
  },
  whiteTitle: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    width: '26%',
    marginRight: '4%',
    lineHeight: 1.2,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    width: 'inherit',
  },
  year: {
    fontFamily: theme.typography.thinFontFamily,
    color: theme.palette.common.primaryText,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  underline: {
    width: '77%',
    position: 'absolute',
    left: '22%',
    bottom: '0',
  },
  linePath: {
    stroke: theme.palette.common.primaryText,
    fill: 'transparent',
  },
  spinCircle: {
    position: 'absolute',
    left: 5,
    top: 10,
  },

  nearCompetitor: {
    marginBottom: 15,
    marginLeft: 5,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  nearTitle: {
    cursor: 'pointer',
    zIndex: 1001,
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

  dropDownPanel: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 13,
    backgroundColor: theme.palette.common.secondaryCardBackground,
    opacity: 1,
    zIndex: 1000,
    width: 125,
    paddingTop: 5,
    borderRadius: 6,
  },
  eachItem: {
    height: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 8.82,
    lineHeight: '10.34px',
    letterSpacing: 0.74,
    fontFamily: theme.typography.lightFontFamily,
    width: 125,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.common.secondaryBlue,
    },
  },
}))

const TableChart = ({
  style = {},
  data = [],
  width = 1200,
  height = 60,
  showYear = false,
  fontSize = 20,
  years = [],
  chartCellType = 'twoLine',
  strokeWidth = 0.4,

  titleTextAlign = 'left',
  titleWidth = 0.23,
  marginTitle = 20,
  yearPosition = 0,
  parentFunc = () => {},
}) => {
  const classes = useStyles()
  const [dropShown, setDropShown] = useState(0)
  const [nearItem, setNearItem] = useState(0)

  const marginTitleWidth = marginTitle ? marginTitle : width * 0.05
  const graphWidth = width * (1 - titleWidth) - marginTitleWidth

  const getXPos = idx => (graphWidth / years.length) * idx + fontSize / 2

  return (
    <div style={{ ...style, width: width, position: 'relative', marginBottom: height - 20 }}>
      {showYear ? (
        <div className={classes.root} style={{ fontSize: fontSize }}>
          <div className={classes.title} style={{ width: titleWidth * width, marginRight: marginTitleWidth }}></div>
          <div
            className={classes.content}
            style={{ flexDirection: 'row', marginLeft: 5 - fontSize, letterSpacing: 0.68 }}
          >
            {years.map((each, idx) => {
              return (
                <div
                  className={classes.year}
                  key={idx}
                  style={{
                    width: graphWidth / years.length,
                  }}
                >
                  {each}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* draw vertical lines */}
      <svg
        className={classes.lines}
        style={{ marginLeft: marginTitleWidth + titleWidth * width }}
        height={height * data.length + fontSize + yearPosition}
        viewBox={`0 0 ${graphWidth} ${height * data.length + fontSize + yearPosition}`}
        width={graphWidth}
        xmlns="http://www.w3.org/2000/svg"
      >
        {years.map((each, idx) => {
          return (
            <path
              className={classes.linePath}
              key={idx}
              d={`M ${getXPos(idx)}, ${yearPosition} L ${getXPos(idx)} ${
                height * data.length + fontSize + yearPosition
              }`}
              strokeWidth={strokeWidth}
            />
          )
        })}
      </svg>
      <div style={{ height: yearPosition }}></div>
      {data.map((each, idx) => {
        return (
          <div className={classes.root} style={{ fontSize: fontSize, height: height }} key={idx}>
            {each.dropBox ? (
              <div className={classes.nearCompetitor}>
                <a
                  className={classes.nearTitle}
                  onClick={() => {
                    setDropShown(!dropShown)
                  }}
                  style={{
                    borderBottom: dropShown ? `1px solid white` : 'none',
                    height: dropShown ? 17 : 18,
                  }}
                >
                  <img src={TriangleSvg} alt={'triangle'} width={11} height={7}></img>
                  <div>{each.dropBox[nearItem].subtitle}</div>
                </a>
                <div className={classes.dropDownPanel} style={{ display: dropShown ? 'block' : 'none' }}>
                  {each.dropBox.map((item, index) => {
                    return (
                      <a
                        className={classes.eachItem}
                        key={index}
                        onClick={() => {
                          each.marks = each.dropBox[index].marks
                          setNearItem(index)
                          setDropShown(false)
                        }}
                      >
                        {item.subtitle}
                      </a>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div
                className={each.color ? classes.whiteTitle : classes.title}
                style={{
                  marginBottom: each.subtitle.length > 30 && -12,
                  width: titleWidth * width,
                  // marginRight: '5%',
                  marginRight: marginTitleWidth,
                  textAlign: titleTextAlign,
                  zIndex: 100,
                }}
              >
                {each.subtitle}
                {each.arrow && (
                  <a
                    onClick={() => {
                      parentFunc()
                    }}
                  >
                    <img className={classes.spinCircle} alt="spinCircle" src={spinCircle} />
                  </a>
                )}
              </div>
            )}

            <div className={classes.content}>
              {each.marks.map((item, idx_item) => {
                return (
                  <div key={idx_item} style={{ width: graphWidth / years.length }}>
                    {chartCellType === 'twoLine' ? (
                      <TableChartTwoLineCell
                        color={each.color}
                        {...item}
                        height={height - 3}
                        width={graphWidth / years.length - 1}
                        fontSize={fontSize}
                      />
                    ) : (
                      <TableChartOneLineCell
                        color={each.color}
                        {...item}
                        height={height - 3}
                        width={graphWidth / years.length - 1}
                        fontSize={fontSize}
                        oneFixed={each.oneFixed}
                      />
                    )}
                  </div>
                )
              })}
            </div>

            <svg
              className={classes.underline}
              height={strokeWidth * 2}
              viewBox={`0 0 ${graphWidth} ${strokeWidth * 2}`}
              width={graphWidth}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path
                className={classes.linePath}
                d={`M ${3}, ${strokeWidth * 1} L ${width}, ${strokeWidth * 1}`}
                strokeWidth={strokeWidth}
              />
            </svg>
          </div>
        )
      })}
    </div>
  )
}

export default TableChart
