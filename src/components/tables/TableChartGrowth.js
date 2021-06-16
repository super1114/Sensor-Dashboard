import { makeStyles } from '@material-ui/core/styles'
import TableChartOneLineGrowthCell from './TableChartOneLineGrowthCell'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    position: 'relative',
    fontSize: 8,
  },
  lines: {
    position: 'absolute',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 8,
    lineHeight: '9.38px',
    letterSpacing: 0.67,
    marginRight: '3%',
    width: '20%',
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    width: 'inherit',
  },
  year: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  underline: {
    width: '83%',
    position: 'absolute',
    left: '17%',
    bottom: '0',
  },
  linePath: {
    stroke: theme.palette.common.primaryText,
    fill: 'transparent',
  },
}))

const TableChartGrowth = ({
  style = {},
  data = [],
  width = 1200,
  height = 60,
  showYear = false,
  fontSize = 20,
  years = [],
  strokeWidth = 0.3,
}) => {
  const classes = useStyles()

  return (
    <div style={{ ...style, width: width, position: 'relative', marginBottom: height - 20 }}>
      {showYear ? (
        <div className={classes.root} style={{ fontSize: fontSize }}>
          <div className={classes.title}></div>
          <div
            className={classes.content}
            style={{ flexDirection: 'row', marginLeft: -fontSize, letterSpacing: 0, marginBottom: 10 }}
          >
            {years.map((each, idx) => {
              return (
                <div className={classes.year} key={idx} style={{ width: `${98 / years.length}%` }}>
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
        height={height * data.length + fontSize * 2}
        viewBox={`0 0 ${width} ${height * data.length + fontSize * 2}`}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
      >
        {years.map((each, idx) => {
          return (
            <path
              className={classes.linePath}
              key={idx}
              d={`M ${((width * 0.8) / years.length) * idx + width * 0.2}, 0 L ${
                ((width * 0.8) / years.length) * idx + width * 0.2
              } , ${height * data.length + fontSize * 2}`}
              strokeWidth={strokeWidth}
            />
          )
        })}
      </svg>

      {data.map((each, idx) => {
        return (
          <div className={classes.root} style={{ fontSize: fontSize, height: height }} key={idx}>
            <div className={classes.title} style={{ marginBottom: each.subtitle.length > 20 ? -8 : -4 }}>
              {each.subtitle}
            </div>
            <div className={classes.content}>
              {each.marks.map((item, idx_item) => {
                return (
                  <div key={idx_item} style={{ width: (width * 0.8) / years.length }}>
                    <TableChartOneLineGrowthCell
                      color={each.color}
                      {...item}
                      height={height - 3}
                      width={(width * 0.8) / years.length - 1}
                      fontSize={fontSize}
                      oneFixed={each.oneFixed}
                    />
                  </div>
                )
              })}
            </div>

            <svg
              className={classes.underline}
              height={strokeWidth * 2}
              viewBox={`0 0 ${width} ${strokeWidth * 2}`}
              width="80%"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path
                className={classes.linePath}
                d={`M 0, ${strokeWidth * 1} L ${width}, ${strokeWidth}`}
                strokeWidth={strokeWidth}
              />
            </svg>
            {/* <div className={classes.underline}></div> */}
          </div>
        )
      })}
    </div>
  )
}

export default TableChartGrowth
