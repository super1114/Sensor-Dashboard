import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import OneLineBarChart from 'components/charts/OneLineBarChart'
import { fillingType, borderType } from 'constants/common'
import clsx from 'clsx'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    paddingBottom: 10,
    WebkitTextSizeAdjust: 'none',
    position: 'relative',
    width: '100%',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 8,
    lineHeight: '9.38px',
    letterSpacing: 0.53,
    marginBottom: 1,
  },
  blue: {
    color: theme.palette.common.primaryBlue,
  },
  cyan: {
    color: theme.palette.common.primaryCyan,
  },
  secondaryBlue: {
    color: theme.palette.common.thirdBlue,
  },
  extraTitle: {
    fontSize: 6.42,
    letterSpacing: 0.54,
    position: 'absolute',
    display: 'flex',
    top: 0,
    right: 0,
  },

  blueTitle: {
    color: theme.palette.common.primaryBlue,
  },
  cyanTitle: {
    color: theme.palette.common.primaryCyan,
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

  subtitleThridBlue: {
    fontFamily: theme.typography.thinFontFamily,
    color: theme.palette.common.thirdBlue,
  },
  subtitleSecondaryBlue: {
    fontFamily: theme.typography.thinFontFamily,
    color: theme.palette.common.secondaryBlue,
  },
  subtitleGreen: {
    fontFamily: theme.typography.thinFontFamily,
    color: theme.palette.common.primaryGreen,
  },
  subtitleSecondaryGreen: {
    fontFamily: theme.typography.thinFontFamily,
    color: theme.palette.common.secondaryGreen,
  },
  subtitleCyan: {
    fontFamily: theme.typography.thinFontFamily,
    color: theme.palette.common.primaryCyan,
  },
  subtitleWhite: {
    fontFamily: theme.typography.thinFontFamily,
    color: theme.palette.common.primaryText,
  },

  headerNormal: {
    fontFamily: theme.typography.lightFontFamily,
    height: 10,
    display: 'flex',
    textAlign: 'start',
    fontSize: 8,
    lineHeight: '10px',
    letterSpacing: '0.53px',
  },
  alignCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  alignLeft: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },

  tableTd: {
    fontFamily: theme.typography.mediumFontFamily,
    letterSpacing: 0.54,
    fontSize: 8,
    height: 18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
  },

  contentMedium: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 6.42,
    letterSpacing: 0.54,
    display: 'flex',
    alingItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlign: 'start',
    height: 18,
    width: 25,
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
}))

const Widget73 = ({ style = {}, width = 500, height = 300, topic = 'topic-73' }) => {
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
        borderRadius: 8,
        margin: 0,
        padding: 8,
        paddingTop: 4,
        paddingBottom: 0,
        width: width,
        height: height,
        overflow: 'initial',
      }}
    >
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.extraTitle}>
          {data.titles.map((each, idx) => {
            return (
              <div
                className={clsx({
                  [classes.blue]: each.color === 'blue',
                  [classes.cyan]: each.color === 'cyan',
                  [classes.secondaryBlue]: each.color === 'thirdBlue',
                })}
                style={{ display: 'flex' }}
                key={idx}
              >
                <span style={{ color: 'white', display: idx === 0 ? 'none' : 'block' }}>&nbsp;</span>
                {each.title}
                <span style={{ color: 'white', display: idx === data.titles.length - 1 ? 'none' : 'block' }}>
                  &nbsp;|
                </span>
              </div>
            )
          })}
        </div>

        <div className={classes.body}>
          <div className={classes.table}>
            <table className={classes.tableWrapper}>
              <tbody>
                <tr>
                  <td style={{ width: 25 }}>
                    <div className={clsx(classes.alignLeft)}></div>
                  </td>
                  <td>
                    <div className={clsx(classes.headerNormal, classes.alignCenter)}>Company</div>
                  </td>
                  <td>
                    <div className={clsx(classes.headerNormal, classes.alignCenter)}>Market</div>
                  </td>
                </tr>
                {data.years.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>
                        <div className={clsx(classes.contentMedium, classes.tableTd)}>{item}</div>
                      </td>
                      <td>
                        <div className={clsx(classes.tableTd)}>
                          <OneLineBarChart
                            data={data.values[idx].company}
                            colors={['thirdBlue', 'cyan', 'secondaryBlue']}
                            height={13}
                            width={110}
                            fillType={fillingType.filled}
                            radius={6.5}
                            max={100}
                            suffix={'%'}
                          />
                        </div>
                      </td>

                      <td>
                        <div className={clsx(classes.tableTd)}>
                          <OneLineBarChart
                            data={data.values[idx].market}
                            colors={['thirdBlue', 'cyan', 'secondaryBlue']}
                            height={13}
                            width={110}
                            fillType={fillingType.outlined}
                            radius={6.5}
                            max={100}
                            suffix={'%'}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <svg className={classes.twoline} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
              <path className={classes.path} d={`M 35 20, L 35 410`} strokeWidth={0.5} />
              <path className={classes.path} d={`M 176 20, L 176 410`} strokeWidth={0.5} />
            </svg>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget73
