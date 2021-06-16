import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import CirclePercentage from '../components/basic_components/CirclePercentage'
import CagrMarkVertical from '../components/cagrs/CagrMarkVertical'
import CagrMarkHorizontal from 'components/cagrs/CagrMarkHorizontal'
import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: 'auto',
  },
  title: {
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 2,
    fontSize: 12,
    marginBottom: 5,
  },
  circleGroup: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  percentageGroup: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  verticalTitle: {
    width: 12,
    fontSize: 9,
    fontFamily: theme.typography.mediumFontFamily,
    padding: 0,
    marginTop: -2,
    marginRight: 4,
    margin: 0,
  },
}))

const Widget28 = ({ style = {}, width = 550, height = 300, topic = 'widget-28', direction = 'vertical' }) => {
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
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: direction === 'vertical' ? 5 : 10,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 0,
        borderRadius: 8,
      }}
    >
      <div
        className={classes.root}
        style={{
          width: width,
          height: height,
          display: 'flex',
          flexDirection: direction === 'vertical' ? 'column' : 'row',
          alignItems: direction === 'vertical' && 'center',
          justifyContent: direction === 'horizontal' && 'center',
        }}
      >
        {direction === 'vertical' ? (
          <>
            <div className={classes.title}>{title}</div>
            <CagrMarkHorizontal {...data.mark} height={9} direction={direction} width={width} />
          </>
        ) : (
          <>
            <p className={clsx(classes.title, classes.verticalTitle)}>C A G R</p>
            <CagrMarkVertical {...data.mark} width={9} direction={direction} height={50} />
          </>
        )}
        <div></div>
        {data.percentages.map((item, idx) => {
          return (
            <div
              key={idx}
              className={classes.percentageGroup}
              style={{
                flex: item.length,
                flexDirection: direction === 'vertical' ? 'column' : 'row',
                alignItems: direction === 'horizontal' && 'stretch',
              }}
            >
              {item.map((each, idx_each) => {
                return (
                  <div
                    key={idx_each}
                    className={classes.circleGroup}
                    style={{
                      flexDirection: direction === 'vertical' ? 'row' : 'column',
                      alignItems: direction === 'vertical' && 'space-between',
                      justifyContent: direction === 'horizontal' && 'space-between',
                    }}
                  >
                    <CirclePercentage color={'blue'} value={each.first} radius={20} fontSize={7} />
                    <CirclePercentage color={'cyan'} radius={20} fontSize={7} value={each.second} />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </DashboardCard>
  )
}

export default Widget28
