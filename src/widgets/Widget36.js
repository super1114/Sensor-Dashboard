import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode, detailsColors } from 'constants/common'
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
    fontFamily: theme.typography.lightFontFamily,
    letterSpacing: 1.5,
    fontSize: 18,
    marginBottom: 10,
  },
  subtitle: {
    width: 270,
    fontSize: 8,
    fontFamily: theme.typography.thinFontFamily,
    marginBottom: 14,
    letterSpacing: 1.1,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'inherit',
    fontFamily: theme.typography.thinFontFamily,
    alignItems: 'flex-start',
  },

  staffCosts: {
    height: 23,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: theme.typography.lightFontFamily,
    border: 'none',
    color: theme.palette.common.primaryText,
    backgroundColor: detailsColors[0],
  },
  premises: {
    height: 23,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: theme.typography.lightFontFamily,
    border: 'none',
    backgroundColor: detailsColors[1],
    color: theme.palette.common.primaryText,
  },
  other: {
    height: 23,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: theme.typography.lightFontFamily,
    backgroundColor: detailsColors[2],
    color: theme.palette.common.baseCardBackground,
    border: 'none',
  },
  depreciation: {
    height: 23,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: theme.typography.lightFontFamily,
    backgroundColor: detailsColors[3],
    color: theme.palette.common.baseCardBackground,
    border: 'none',
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
  },
  barWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 11,
    width: '100%',
  },
  year: {
    color: theme.palette.common.primaryText,
    fontFamily: theme.typography.thinFontFamily,
    width: 30,
    textAlign: 'left',
    height: 'auto',
  },
}))

const Widget36 = ({ style = {}, width = 'auto', height, topic = 'widget-36' }) => {
  const { title, subtitles, data } = useNodeRed(topic)
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
        paddingTop: 0,
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
        <div className={classes.subtitle}>
          {subtitles.map((each, idx) => {
            return (
              <span key={idx} style={{ color: detailsColors[idx] }} className={classes.subtitle}>
                {' '}
                {each}{' '}
                <span style={{ color: 'white' }} className={classes.subtitle}>
                  {' '}
                  {idx !== subtitles.length - 1 && '| '}
                </span>
              </span>
            )
          })}
        </div>
        <div className={classes.body}>
          {data.map((item, idx) => {
            return (
              <div className={classes.barWrapper} key={idx}>
                <div className={classes.year}>{item.year}</div>
                <div
                  className={classes.staffCosts}
                  style={{
                    width:
                      ((width - 60) * item.staffCosts) /
                      (item.staffCosts + item.premises + item.other + item.depreciation),
                  }}
                >
                  {item.staffCosts}
                </div>
                <div
                  className={classes.premises}
                  style={{
                    width:
                      ((width - 60) * item.premises) /
                      (item.staffCosts + item.premises + item.other + item.depreciation),
                  }}
                >
                  {item.premises}
                </div>
                <div
                  className={classes.other}
                  style={{
                    width:
                      ((width - 60) * item.other) / (item.staffCosts + item.premises + item.other + item.depreciation),
                  }}
                >
                  {item.other}
                </div>
                <div
                  className={classes.depreciation}
                  style={{
                    width:
                      ((width - 60) * item.depreciation) /
                      (item.staffCosts + item.premises + item.other + item.depreciation),
                  }}
                >
                  {item.depreciation}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget36
