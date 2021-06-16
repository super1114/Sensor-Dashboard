import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import SkillsAndExperience from 'components/tables/SkillsAndExperience'
import { CardMode } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    paddingBottom: 10,
    WebkitTextSizeAdjust: 'none',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 8,
    lineHeight: '9.42px',
    letterSpacing: 0.67,
  },
  blue: {
    color: theme.palette.common.primaryBlue,
  },
  cyan: {
    color: theme.palette.common.primaryCyan,
  },
  extraTitle: {
    fontSize: 6.42,
    letterSpacing: 0.54,
    lineHeight: '7.52px',
    display: 'flex',
    right: 33,
    marginTop: 2,
  },

  titleWrapper: {
    display: 'flex',
  },
  subTitle: {
    width: 30,
    textAlign: 'left',
    fontSize: 6.42,
    letterSpacing: 0.54,
    lineHeight: '7.52px',
    fontFamily: theme.typography.mediumFontFamily,
  },
  titles: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  subtitle: {
    fontSize: 6,
    lineHeight: '7.03px',
    letterSpacing: 0.5,
    textAlign: 'center',
    fontFamily: theme.typography.mediumFontFamily,
    marginBottom: 2,
    paddingRight: 5,
    paddingLeft: 5,
  },
  each: {
    display: 'flex',
    alignItems: 'center',
    height: 22,
    position: 'relative',
  },
  eachWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  eachData: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 18,
  },
  percentage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 4.82,
    lineHeight: '5.62px',
    letterSpacing: 0.4,
    height: 7,
  },
  circleWrapper: {
    height: 15,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  blueCircle: {
    borderRadius: '100%',
    backgroundColor: theme.palette.common.primaryBlue,
  },
  cyanCircle: {
    borderRadius: '100%',
    backgroundColor: theme.palette.common.primaryCyan,
  },

  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginLeft: 30,
  },
  svgLineGray: {
    stroke: theme.palette.common.primaryGray,
    fill: theme.palette.common.primaryGray,
    strokeWidth: 0.55,
  },
  svgLineWhite: {
    stroke: theme.palette.common.primaryText,
    fill: theme.palette.common.primaryText,
    strokeWidth: 0.55,
  },
}))

const Widget71 = ({ style = {}, width = 500, height = 300, topic = 'topic-71' }) => {
  const { title, data, years } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) {
    return ''
  }
  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        borderRadius: 8,
        margin: 0,
        padding: 8,
        paddingTop: 3,
        paddingBottom: 0,
        width: width,
        height: height,
        overflow: 'initial',
      }}
    >
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.extraTitle}>
          <div className={classes.blue}>Company&nbsp;</div>|<div className={classes.cyan}>&nbsp;Market</div>
        </div>

        <div className={classes.wrapper}>
          <div className={classes.titleWrapper}>
            <div className={classes.subTitle}></div>
            <div className={classes.titles}>
              {data[0].titles.map((each, idx) => {
                return (
                  <div className={classes.subtitle} key={idx}>
                    {each}
                  </div>
                )
              })}
            </div>
          </div>
          {years.map((each, idx) => {
            let tmp = data[idx].data
            let max = Math.max(...tmp.company, ...tmp.market)
            let eachWidth = (width - 46) / 8
            return (
              <div className={classes.each} key={idx}>
                <div className={classes.subTitle}>{years[idx]}</div>
                {data[0].titles.map((title, index) => {
                  return (
                    <div className={classes.eachWrapper} key={index}>
                      <div className={classes.eachData}>
                        <div className={classes.circleWrapper}>
                          <div
                            className={classes.blueCircle}
                            style={{ height: (8 * tmp.company[index]) / max, width: (8 * tmp.company[index]) / max }}
                          ></div>
                        </div>
                        <div className={classes.percentage}>{tmp.company[index]}%</div>
                      </div>
                      <div className={classes.eachData}>
                        <div className={classes.circleWrapper}>
                          <div
                            className={classes.cyanCircle}
                            style={{ height: (8 * tmp.market[index]) / max, width: (8 * tmp.market[index]) / max }}
                          ></div>
                        </div>
                        <div className={classes.percentage}>{tmp.market[index]}%</div>
                      </div>
                    </div>
                  )
                })}

                <svg
                  className={classes.svg}
                  height={22}
                  viewBox={`0 0 ${width - 46} 22`}
                  width={width - 46}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {data[0].titles.map((title, index) => {
                    return (
                      <g key={index}>
                        <line
                          className={classes.svgLineWhite}
                          x1={index * 2 * eachWidth}
                          x2={index * 2 * eachWidth}
                          y1={0}
                          y2={22}
                        ></line>
                        <line
                          className={classes.svgLineGray}
                          x1={(index * 2 + 1) * eachWidth}
                          x2={(index * 2 + 1) * eachWidth}
                          y1={0}
                          y2={22}
                        ></line>
                      </g>
                    )
                  })}
                  <line
                    className={classes.svgLineWhite}
                    x1={width - 46 - 0.55}
                    x2={width - 46 - 0.55}
                    y1={0}
                    y2={22}
                    key={`last vertical line - ${idx}`}
                  ></line>

                  <line
                    className={classes.svgLineGray}
                    x1={0}
                    x2={width - 46}
                    y1={15}
                    y2={15}
                    key={`medium line - ${idx}`}
                  ></line>
                  <line
                    className={classes.svgLineGray}
                    x1={0}
                    x2={width - 46}
                    y1={22}
                    y2={22}
                    key={`bottom line - ${idx}`}
                  ></line>
                </svg>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget71
