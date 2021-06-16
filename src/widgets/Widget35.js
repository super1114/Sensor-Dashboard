import { makeStyles } from '@material-ui/core/styles'

import { useState } from 'react'
import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'

import CandleStick from 'components/charts/CandleStick'

import rotateIcon from '../assets/icons/icons8-3d_rotate.png'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontFamily: theme.typography.ultralightFontFamily,
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: theme.typography.ultralightFontFamily,
    fontSize: 12,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'inherit',
    fontFamily: theme.typography.ultralightFontFamily,
    alignItems: 'flex-start',
    marginTop: 5,
  },
  iconWrapper: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'flex-end',
    height: 35,
    width: 35,
    backgroundImage: `url("${rotateIcon}")`,
    backgroundSize: '100% 100%',
    top: 0,
    right: 5,
  },
}))

const Widget35 = ({ style = {}, width = 'auto', height = 'inherit', topic = 'widget-35' }) => {
  const { title, subtitle, data } = useNodeRed(topic)

  const [index, setIndex] = useState(0)

  const classes = useStyles()

  if (!title || data.length === 0) {
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
        overflow: 'hidden',
      }}
    >
      <div
        className={classes.root}
        style={{
          width: width,
          height: height,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div className={classes.title}>
          <div>
            {title} <span className={classes.subtitle}>{subtitle}</span>
          </div>
          <a
            onClick={() => {
              setIndex((index + 1) % data.length)
            }}
            className={classes.iconWrapper}
          >
            {}
          </a>
        </div>
        <div className={classes.body}>
          <CandleStick data={data[index]} />
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget35
