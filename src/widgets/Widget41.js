import { makeStyles } from '@material-ui/core/styles'

// import { useContext, useEffect } from 'react'
import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'
import HorizontalChart from 'components/charts/HorizontalChart'
// import HoverContext from 'contexts/HoverContext'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontFamily: theme.typography.ultralightFontFamily,
    fontSize: 8,
    marginLeft: 5,
    height: 'auto',
    WebkitTextSizeAdjust: 'none',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 1,
    fontSize: 10,
    marginBottom: 10,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: 'inherit',
    fontFamily: theme.typography.ultralightFontFamily,
    color: theme.palette.common.primaryText,
    alignItems: 'flex-start',
    marginTop: -5,
    position: 'relative',
  },
  blurLayout: {
    position: 'absolute',
    left: 100,
    top: 0,
    height: '100%',
    width: 475,
  },

  eachGroup: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  eachTitle: {
    fontSize: 7.2,
    lineHeight: '8.44px',
    width: 70,
    fontFamily: theme.typography.thinFontFamily,
    letterSpacing: 1,
  },
}))

const Widget41 = ({ style = {}, width = 740, height = 420, topic = 'topic-41', titleWidth = 70, titleMargin = 0 }) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()

  if (!title || data.length === 0) {
    return ''
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        marginTop: 0,
        marginRight: 0,
        paddingLeft: 5,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 5,
        borderRadius: 10,
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
          {data.map((item, idx) => {
            return (
              <div className={classes.eachGroup} key={idx}>
                <div className={classes.eachTitle} style={{ width: titleWidth, marginRight: titleMargin }}>
                  {item.title}
                </div>
                <HorizontalChart {...item} startOffset={30} width={500} height={50} yearShow={idx === 0} />
              </div>
            )
          })}
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget41
