import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import LineGraphWithTitle from 'components/graphs/LineGraphWithTitle'
import TableChart from 'components/tables/TableChart'
import { CardMode, DefaultComponentTitleSize } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 1200,
    height: 'auto',
    paddingBottom: 10,
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryBlue,
    fontSize: DefaultComponentTitleSize,
  },
  subtitle: {
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 1.5,
    fontSize: DefaultComponentTitleSize / 2 + 3,
  },
}))

const Widget21 = ({ style = {}, width = 1200, subtitle = null }) => {
  const { title, data, years } = useNodeRed('widget-21')
  const classes = useStyles()

  if (!title) {
    return ''
  }

  return (
    <DashboardCard mode={CardMode.auto} style={{ ...style, overflow: 'initial' }}>
      <div
        className={classes.root}
        style={{
          width: width,
          overflow: 'initial',
        }}
      >
        <div className={classes.title}>{title}</div>
        {subtitle && <div className={classes.subtitle}>{subtitle}</div>}
        {data.map((each, idx) => {
          if (each.type === 'lineGraph')
            return (
              <LineGraphWithTitle
                key={idx}
                width={width}
                values={each.data}
                title={each.title}
                fontBold={each.fontBold}
                strokeColor={each.color}
                height={70}
                fontSize={18}
              />
            )
          return (
            <div key={idx}>
              <TableChart
                data={each.data}
                showYear={idx === 0 ? true : false}
                years={years}
                height={50}
                width={width - 10}
                fontSize={18}
              />
              <div style={{ height: 6.5 }}></div>
            </div>
          )
        })}
      </div>
    </DashboardCard>
  )
}

export default Widget21
