import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import ProcessLine from 'components/processes/ProcessLine'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'
import StarIcon from '@material-ui/icons/Star'
import { threeDots } from 'helpers/helpers'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontFamily: theme.typography.ultralightFontFamily,
    fontSize: 8,
    padding: 5,
    letterSpacing: 1.5,
    height: 'auto',
  },
  title: {
    fontFamily: theme.typography.thinFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 2,
    fontSize: 18,
    marginBottom: 3,
  },
  totalRating: {
    marginTop: 10,
    whiteSpace: 'nowrap',
    fontFamily: theme.typography.ultralightFontFamily,
    fontSize: 10,
  },
  eachRate: {
    fontFamily: theme.typography.ultralightFontFamily,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 8,
    height: 11,
    marginTop: 7,
    marginBottom: 3,
  },
  starRating: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    position: 'relative',
    backgroundColor: theme.palette.common.secondaryBlack,
    overflow: 'auto',
  },

  alphaTarget: {
    position: 'absolute',
    textAlign: 'right',
    height: 35,
    left: 0,
    makeMode: 'alpha',
    backgroundColor: theme.palette.common.primaryRed,
  },
}))

const Widget30 = ({ style = {}, width = 205, height = 205, topic = 'widget-30' }) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) {
    return ''
  }

  let totalRate = 0
  let maxRate = data[0]
  let score = 0
  data.forEach((item, idx) => {
    totalRate += item.reviews
    score += (5 - idx) * item.reviews
    if (maxRate.reviews < item.reviews) maxRate = item
  })
  score = score / totalRate

  let rateWidth = [
    (score >= 1 ? 1 : score - 0) * 35,
    (score >= 2 ? 1 : score - 1) * 35,
    score <= 2 ? 0 : (score >= 3 ? 1 : score - 2) * 35,
    score <= 3 ? 0 : (score >= 4 ? 1 : score - 3) * 35,
    score <= 4 ? 0 : (score >= 5 ? 1 : score - 4) * 35,
  ]

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
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
        {data.map((item, idx) => {
          return (
            <div className={classes.eachRate} key={idx}>
              <div style={{ textAlign: 'left', width: '50%' }}>{item.spec}</div>
              <ProcessLine
                height={12}
                width={160}
                value={(100 * item.reviews) / totalRate}
                radius={5}
                processColor={'blue'}
              />
              <div style={{ textAlign: 'right', width: '30%' }}>{parseInt((100 * item.reviews) / totalRate)}%</div>
            </div>
          )
        })}
        <div className={classes.totalRating}>
          {' '}
          Reviews: {threeDots(totalRate)} | Rating: {maxRate.spec}
        </div>

        <div className={classes.starRating}>
          <div className={classes.starWrapper} style={{ borderRadius: 6 }}>
            <div className={classes.alphaTarget} style={{ width: rateWidth[0] }}></div>
            <StarIcon style={{ zIndex: 2, fontSize: 28 }} />
          </div>
          <div className={classes.starWrapper} style={{ borderRadius: 6 }}>
            <div className={classes.alphaTarget} style={{ width: rateWidth[1] }}></div>
            <StarIcon style={{ zIndex: 2, fontSize: 28 }} />
          </div>
          <div className={classes.starWrapper} style={{ borderRadius: 6 }}>
            <div className={classes.alphaTarget} style={{ width: rateWidth[2] }}></div>
            <StarIcon style={{ zIndex: 2, fontSize: 28 }} />
          </div>
          <div className={classes.starWrapper} style={{ borderRadius: 6 }}>
            <div className={classes.alphaTarget} style={{ width: rateWidth[3] }}></div>
            <StarIcon style={{ zIndex: 2, fontSize: 28 }} />
          </div>
          <div className={classes.starWrapper} style={{ borderRadius: 6 }}>
            <div className={classes.alphaTarget} style={{ width: rateWidth[4] }}></div>
            <StarIcon style={{ zIndex: 2, fontSize: 28 }} />
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget30
