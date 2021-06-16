import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import Triangle from 'components/basic_components/Triangle'
import clsx from 'clsx'
import { CardMode, TriangleMode, TriangleType } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontFamily: theme.typography.thinFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 8,
    padding: 5,
    letterSpacing: 1,
    height: 'auto',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    letterSpacing: 1,
    fontSize: 10,
    marginBottom: 10,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: 'inherit',
    fontFamily: theme.typography.thinFontFamily,
    alignItems: 'flex-start',
  },
  section: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: 32,
    paddingTop: 12,
    paddingBottom: 20,
    borderBottom: '0.5px solid white',
  },
  doubleSection: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: 94,
    paddingTop: 10,
    paddingBottom: 5,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 210,
    marginTop: 5,
  },
  doubleContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 210,
    marginTop: -5,
  },
  label: {
    fontSize: 8,
    fontFamily: theme.typography.thinFontFamily,
    letterSpacing: 1,
    lineHeight: 1.2,
  },
  subtitle: {
    fontFamily: theme.typography.mediumFontFamily,
    lineHeight: 1.2,
  },
  eachValue: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 15,
  },
  doubleEachValue: {
    display: 'flex',
    fontFamily: theme.typography.thinFontFamily,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'space-around',
  },
  value: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 35,
  },
  offsetPercentage: {
    fontFamily: theme.typography.thinFontFamily,
  },
  doubleOffsetWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  offsetWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
  },
  offset: {
    display: 'flex',
    marginLeft: 8,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  greenFont: {
    color: theme.palette.common.secondaryGreen,
  },
  redFont: {
    color: theme.palette.common.primaryRed,
  },
  offsetLabel: {
    fontFamily: theme.typography.thinlightFontFamily,
    marginTop: 2,
  },
}))

const Widget34 = ({ style = {}, width = 'auto', height = 205, topic = 'widget-34' }) => {
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
        marginLeft: 0,
        marginTop: 0,
        marginRight: 0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 2,
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
        <div className={classes.title}>{title}</div>
        <div className={classes.body}>
          {/* cost section */}

          <div className={classes.section}>
            <div className={classes.content}>
              <div className={classes.label}>
                {data.cost.description} <span className={classes.subtitle}>{data.cost.title}</span>
              </div>
            </div>
            <div className={classes.eachValue}>
              £<span className={classes.value}>{data.cost.value}</span>m
            </div>
            <div className={classes.offsetWrapper}>
              <Triangle
                type={data.cost.growth}
                mode={data.cost.growth === TriangleType.up ? TriangleMode.success : TriangleMode.danger}
                width={7.5}
                bottomWidth={9.2}
              />
              <div className={classes.offset}>
                <div
                  className={clsx(
                    classes.offsetPercentage,
                    data.cost.growth === TriangleType.up ? classes.greenFont : classes.redFont
                  )}
                >
                  {data.cost.percentage}%
                </div>
                <div className={classes.offsetLabel}>{data.cost.label}</div>
              </div>
            </div>
          </div>

          {/* income Section */}

          <div className={classes.section}>
            <div className={classes.content}>
              <div className={classes.label}>
                {data.income.description} <span className={classes.subtitle}>{data.income.title}</span>
              </div>
            </div>
            <div className={classes.eachValue}>
              £<span className={classes.value}>{data.income.value}</span>m
            </div>
            <div className={classes.offsetWrapper}>
              <Triangle
                type={data.income.growth}
                mode={data.income.growth === TriangleType.up ? TriangleMode.success : TriangleMode.danger}
                width={7.5}
                bottomWidth={9.2}
              />
              <div className={classes.offset}>
                <div
                  className={clsx(
                    classes.offsetPercentage,
                    data.income.growth === TriangleType.up ? classes.greenFont : classes.redFont
                  )}
                >
                  {data.income.percentage}%
                </div>
                <div className={classes.offsetLabel}>{data.income.label}</div>
              </div>
            </div>
          </div>

          {/* income & cost */}

          <div className={classes.doubleSection}>
            <div className={classes.doubleContent}>
              <div className={classes.label}>
                {data.both.description}{' '}
                <span className={classes.subtitle} style={{ width: 100 }}>
                  {data.both.title}
                </span>
              </div>
            </div>
            <div className={classes.doubleEachValue}>
              <div>Costs</div>
              <div style={{ fontSize: 15 }}>
                £<span className={classes.value}>{data.both.costValue}</span>m
              </div>
              <div>Income</div>
              <div style={{ fontSize: 15 }}>
                £<span className={classes.value}>{data.both.incomeValue}</span>m
              </div>
            </div>

            <div className={classes.doubleOffsetWrapper}>
              <div className={classes.offsetWrapper}>
                <Triangle
                  type={data.both.growthCost}
                  mode={data.both.growthCost === TriangleType.up ? TriangleMode.success : TriangleMode.danger}
                  width={7.5}
                  bottomWidth={9.2}
                />
                <div className={classes.offset}>
                  <div
                    className={clsx(
                      classes.offsetPercentage,
                      data.both.growthCost === TriangleType.up ? classes.greenFont : classes.redFont
                    )}
                  >
                    {data.both.growthCostPercentage}%
                  </div>
                  <div className={classes.offsetLabel}>{data.both.label}</div>
                </div>
              </div>
              <div className={classes.offsetWrapper}>
                <Triangle
                  type={data.both.growthIncome}
                  mode={data.both.growthIncome === TriangleType.up ? TriangleMode.success : TriangleMode.danger}
                  width={7.5}
                  bottomWidth={9.2}
                />
                <div className={classes.offset}>
                  <div
                    className={clsx(
                      classes.offsetPercentage,
                      data.both.growthIncome === TriangleType.up ? classes.greenFont : classes.redFont
                    )}
                  >
                    {data.both.growthIncomePercentage}%
                  </div>
                  <div className={classes.offsetLabel}>{data.both.label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget34
