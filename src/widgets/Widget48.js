import { makeStyles } from '@material-ui/core/styles'

import { threeDots } from 'helpers/helpers'
import { borderType } from 'constants/common'
import clsx from 'clsx'
import { CardMode } from 'constants/common'
import DashboardCard from 'components/basic_components/DashboardCard'
import GradientProgress from 'components/processes/GradientProgress'
import OneLineBarChart from 'components/charts/OneLineBarChart'
import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontFamily: theme.typography.thinFontFamily,
    fontSize: 8,
    height: 'auto',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 10,
    letterSpacing: 0.67,
    marginBottom: 10,
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
    height: 28,
    display: 'flex',
    textAlign: 'start',
    marginBottom: 5,
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
    height: 28,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  contentMedium: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 6.42,
    letterSpacing: 0.54,
    display: 'flex',
    alingItems: 'flex-start',
    textAlign: 'start',
    height: 26,
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

const Widget48 = ({ style = {}, width = 'auto', height = 205, topic = 'topic-48', gradientColor = 'blue' }) => {
  const { title, data, mode } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) {
    return ''
  }

  let maxAssets = Math.max(...data.map(one => one.credit + one.operational + one.other))
  let maxResources = Math.max(...data.map(one => one.cet1 + one.at1 + one.tier2))

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        marginLeft: 0,
        marginTop: 0,
        marginRight: 0,
        paddingLeft: 7,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 10,
        width: width,
        height: height,
      }}
    >
      <div
        className={classes.root}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          className={clsx(classes.title, {
            [classes.blueTitle]: title.color === 'blue',
            [classes.cyanTitle]: title.color === 'cyan',
          })}
        >
          {title.title}
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
                    <div className={clsx(classes.headerNormal, classes.alignLeft)}>Common Equilty Tier 1 Capital</div>
                  </td>
                  <td>
                    <div className={clsx(classes.headerNormal, classes.alignCenter)}>
                      <div>Risk Weighted Assets</div>
                      <div>
                        <span className={classes.subtitleThridBlue}>Credit</span> |
                        <span className={classes.subtitleCyan}> Operational</span> |
                        <span className={classes.subtitleSecondaryBlue}> Other</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className={clsx(classes.headerNormal, classes.alignCenter)}>
                      <div>Resources</div>
                      <div>
                        <span className={classes.subtitleThridBlue}>CET1</span> |
                        <span className={classes.subtitleCyan}> AT1</span> |
                        <span className={classes.subtitleGreen}> Tier 2</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className={clsx(classes.headerNormal, classes.alignCenter)}>Spread</div>
                  </td>

                  <td>
                    <div className={clsx(classes.headerNormal, classes.alignCenter)}>
                      <div>Requirements</div>
                      <div>
                        <span className={classes.subtitleSecondaryBlue}>Pillar 1</span> |
                        <span className={classes.subtitleWhite}> Pillar 2a</span> |
                        <span className={classes.subtitleSecondaryGreen}> CCoB</span>
                      </div>
                    </div>
                  </td>
                </tr>
                {data.map((item, idx) => {
                  let total = item.credit + item.operational + item.other
                  let resources = item.cet1 + item.at1 + item.tier2
                  let requireAsset = item.pillar1 + item.pillar2 + item.ccob
                  return (
                    <tr key={idx}>
                      <td>
                        <div className={clsx(classes.contentMedium, classes.tableTd)} style={{ marginRight: 5 }}>
                          {item.year}
                        </div>
                      </td>

                      <td>
                        <div className={clsx(classes.alignRight, classes.tableTd)}>
                          <GradientProgress
                            value={item.commonEquaily}
                            maxValue={maxAssets}
                            mode={'success'}
                            color={gradientColor}
                            progressWidth={30}
                            radius={4}
                            width={30}
                            height={10}
                          />
                          <div className={classes.value} style={{ width: 35 }}>
                            {threeDots(item.commonEquaily)}
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className={clsx(classes.alignRight, classes.tableTd)} style={{ marginRight: 10 }}>
                          <GradientProgress
                            value={total}
                            maxValue={maxAssets}
                            mode={'success'}
                            color={gradientColor}
                            progressWidth={30}
                            radius={4}
                            width={30}
                            height={10}
                          />
                          <div className={classes.value} style={{ width: 35, textAlign: 'center' }}>
                            {threeDots(total)}
                          </div>
                          <OneLineBarChart
                            data={[item.credit, item.operational, item.other]}
                            colors={['thirdBlue', 'cyan', 'secondaryBlue']}
                            height={19}
                            width={124}
                            fillType={mode}
                            radius={6.5}
                          />
                        </div>
                      </td>

                      <td>
                        <div className={clsx(classes.alignRight, classes.tableTd)}>
                          <div className={classes.value} style={{ width: 40, textAlign: 'left' }}>
                            {((100 * resources) / total).toFixed(1)}%
                          </div>
                          <OneLineBarChart
                            data={[item.cet1, item.at1, item.tier2]}
                            colors={['green', 'cyan', 'thirdBlue']}
                            height={19}
                            width={133}
                            fillType={mode}
                            borderRightType={borderType.strict}
                            radius={6.5}
                            max={maxResources}
                          />
                        </div>
                      </td>
                      <td>
                        <div className={clsx(classes.alignRight, classes.tableTd)}>
                          <div className={classes.value} style={{ width: 25, textAlign: 'center' }}>
                            {((100 * (resources - requireAsset)) / total).toFixed(1)}%
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={clsx(classes.alignRight, classes.tableTd)}>
                          <OneLineBarChart
                            data={[item.pillar1, item.pillar2, item.ccob]}
                            colors={['secondaryBlue', 'white', 'secondaryGreen']}
                            height={19}
                            width={112}
                            borderLeftType={borderType.strict}
                            fillType={mode}
                            radius={6.5}
                          />
                          <div className={classes.value} style={{ width: 35, textAlign: 'right' }}>
                            {((100 * requireAsset) / total).toFixed(1)}%
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <svg className={classes.twoline} viewBox={`0 0 455, 250`} xmlns="http://www.w3.org/2000/svg">
              <path className={classes.path} d={`M 19 27, L 19 410`} strokeWidth={0.5} />
              <path className={classes.path} d={`M 62 27, L 62 410`} strokeWidth={0.5} />
              <path className={classes.path} d={`M 202 27, L 202 410`} strokeWidth={0.5} />
            </svg>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget48
