import { makeStyles } from '@material-ui/core/styles'
import spinCircle from 'assets/icons/spinCircle.svg'
import GradientProgress from 'components/processes/GradientProgress'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
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
  linePath: {
    stroke: theme.palette.common.primaryText,
    fill: 'transparent',
  },
  spinCircle: {
    position: 'absolute',
    left: 5,
    top: 10,
  },

  underline: {
    width: '77%',
    position: 'absolute',
    left: '22%',
    bottom: '0',
  },
  marks: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 6.61,
    lineHeight: '7.8px',
    letterSpacing: 0.6,
  },
  slider: {
    marginBottom: 4,
    backgroundColor: theme.palette.common.baseBackground,
    height: 8,
    width: 41,
    marginLeft: 2,
    borderRadius: 4,
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    '&::after': {
      height: 9,
      position: 'absolute',
      width: 0.5,
      backgroundColor: theme.palette.common.primaryText,
      top: -0.5,
      right: '50%',
      content: `''`,
    },
  },
}))

const GradientTableChart = ({
  style = {},
  data = [],
  width = 1200,
  height = 60,
  showYear = false,
  fontSize = 20,
  years = [],
  strokeWidth = 0.5,

  titleTextAlign = 'left',
  titleWidth = 0.25,
  marginTitle = null,
  yearPosition = 0,
  parentFunc = null,
}) => {
  const classes = useStyles()

  const graphWidth = 1 - titleWidth

  return (
    <div style={{ ...style, width: width, position: 'relative', marginBottom: height - 20 }}>
      {showYear ? (
        <div className={classes.root} style={{ fontSize: fontSize }}>
          <div className={classes.title} style={{ width: `${titleWidth * 100}%`, marginRight: '5%' }}></div>
          <div className={classes.content} style={{ flexDirection: 'row', marginLeft: 5 - fontSize, letterSpacing: 0 }}>
            {years.map((each, idx) => {
              return (
                <div className={classes.year} key={idx} style={{ width: `${97 / years.length}%` }}>
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
        height={height * data.length + yearPosition}
        viewBox={`0 0 ${width} ${height * data.length + yearPosition}`}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
      >
        {years.map((each, idx) => {
          return (
            <path
              className={classes.linePath}
              key={idx}
              style={{}}
              d={`M ${((width * graphWidth) / years.length) * idx + width * (titleWidth - 0.005)}, ${yearPosition} L ${
                ((width * graphWidth) / years.length) * idx + width * (titleWidth - 0.005)
              } ${height * data.length + yearPosition}`}
              strokeWidth={strokeWidth}
            />
          )
        })}
      </svg>
      <div style={{ height: yearPosition }}></div>
      {data.map((each, idx) => {
        return (
          <div className={classes.root} style={{ fontSize: fontSize, height: height }} key={idx}>
            <div
              className={each.color ? classes.whiteTitle : classes.title}
              style={{
                marginBottom: each.subtitle.length > 30 && -12,
                marginRight: marginTitle ? marginTitle : '5%',
                textAlign: titleTextAlign,
                width: titleWidth * width,
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

            <div className={classes.content} style={{ marginLeft: 5 }}>
              {each.marks.map((item, idx_item) => {
                // let max = Math.max(each.marks.map(every => Math.max(every.company, every.competitor)))
                let max = Math.max(item.company, item.competitor)
                return (
                  <div key={idx_item} style={{ width: (width * graphWidth) / years.length }}>
                    <div className={classes.marks} style={{ padding: 2, paddingBottom: 4 }}>
                      <span>
                        {item.company}
                        {each.label}
                      </span>
                      <span>
                        {item.competitor}
                        {each.label}
                      </span>
                    </div>

                    <div className={classes.slider}>
                      <GradientProgress
                        height={9}
                        width={17}
                        progressWidth={17}
                        value={item.company}
                        maxValue={max}
                        color={'blue'}
                        radius={2.2}
                      />
                      <GradientProgress
                        height={9}
                        width={(17 * item.competitor) / max}
                        progressWidth={(17 * item.competitor) / max}
                        value={item.competitor}
                        maxValue={max}
                        color={'cyanRevert'}
                        radius={2.2}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <svg
              className={classes.underline}
              height={strokeWidth * 2}
              viewBox={`0 0 ${width} ${strokeWidth * 2}`}
              width="77%"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path
                className={classes.linePath}
                d={`M ${marginTitle / 2}, ${strokeWidth * 1} L ${width}, ${strokeWidth * 1}`}
                strokeWidth={strokeWidth * 2}
              />
            </svg>
          </div>
        )
      })}
    </div>
  )
}

export default GradientTableChart
