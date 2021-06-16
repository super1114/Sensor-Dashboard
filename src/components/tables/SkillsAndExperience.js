import { makeStyles } from '@material-ui/core/styles'
import spinCircle from 'assets/icons/spinCircle.svg'
import GradientProgress from 'components/processes/GradientProgress'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    fontFamily: theme.typography.lightFontFamily,
  },
  lines: {
    position: 'absolute',
  },
  title: {
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 9.92,
    letterSpacing: 0.83,
  },
  whiteTitle: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 9.92,
    letterSpacing: 0.83,
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
    fontSize: 9.92,
    letterSpacing: 0.83,
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
    width: 41,
    fontSize: 7.44,
    lineHeight: '8.72px',
    letterSpacing: 0.62,
    marginBottom: 5,
  },
  slider: {
    marginBottom: 4,
    backgroundColor: theme.palette.common.baseBackground,
    height: 10,
    width: 41,
    marginLeft: 2,
    borderRadius: 4,
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    '&::after': {
      height: 10,
      position: 'absolute',
      width: 0.5,
      backgroundColor: theme.palette.common.primaryText,
      top: 0,
      right: '50%',
      content: `''`,
    },
  },
}))

const SkillsAndExperience = ({
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
      <div style={{ height: 2 }}></div>
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
              {each.arrow && <img className={classes.spinCircle} alt="spinCircle" src={spinCircle} />}
            </div>

            <div className={classes.content} style={{ marginLeft: 5 }}>
              {each.marks.map((item, idx_item) => {
                // let max = Math.max(each.marks.map(every => Math.max(every.bank, every.market)))
                return (
                  <div key={idx_item} style={{ width: (width * graphWidth) / years.length }}>
                    <div className={classes.marks}>
                      <span>
                        {item.bank}
                        {each.label}
                      </span>
                      <span>
                        {item.market}
                        {each.label}
                      </span>
                    </div>

                    <div className={classes.slider}>
                      <GradientProgress
                        height={10}
                        width={20}
                        progressWidth={20}
                        value={item.bank}
                        maxValue={100}
                        color={'blue'}
                        radius={2.2}
                      />
                      <GradientProgress
                        height={10}
                        width={(20 * item.market) / 100}
                        progressWidth={(20 * item.market) / 100}
                        value={item.market}
                        maxValue={100}
                        color={'cyanRevert'}
                        mode={'none'}
                        radius={2.2}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SkillsAndExperience
