import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'
import clsx from 'clsx'
import DailyPriceTable from 'components/tables/DailyPriceTable'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontSize: 8,
    padding: 5,
  },
  title: {
    fontFamily: theme.typography.MediumFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 2,
    fontSize: 18,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'flex-end',
  },
  eachSubTitle: {
    fontSize: 7,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 7,
    paddingLeft: 4,
    paddingRight: 4,
  },
  blueTextColor: {
    fontFamily: theme.typography.MediumFontFamily,
    color: theme.palette.common.primaryBlue,
    fontSize: 7,
  },
  cyanTextColor: {
    fontFamily: theme.typography.MediumFontFamily,
    color: theme.palette.common.primaryCyan,
    fontSize: 7,
  },

  body: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
  },
  oneWrap: {
    width: '18%',
    height: 207,
    marginBottom: 10,
  },
}))

const Widget46 = ({ style = {}, width = 1173, height = 476, topic = 'topic-46' }) => {
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
        marginRight: 0,
        marginTop: 0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        borderRadius: 8,
        width: width,
        height: height,
      }}
    >
      <div
        className={classes.root}
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <div className={classes.title}>
          {title.main}
          <span style={{ width: 5 }}></span>
          {title.subtitles.map((each, idx) => {
            return (
              <span className={classes.eachSubTitle} key={idx}>
                <span
                  className={clsx(classes.subtitle, {
                    [classes.blueTextColor]: each.color === 'blue',
                    [classes.cyanTextColor]: each.color === 'cyan',
                  })}
                >
                  {each.label}
                </span>
                {idx !== title.subtitles.length - 1 && '|'}
              </span>
            )
          })}
        </div>
        <div className={classes.body}>
          {data.map((each, idx) => (
            <div className={classes.oneWrap} key={idx}>
              <DailyPriceTable data={each} height={207} width={205} />
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget46
