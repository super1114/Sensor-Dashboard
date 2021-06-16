import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { useState } from 'react'
import HorizontalTripleSlider from 'components/processes/HorizontalTripleSlider'
import { CardMode, TripleSliderMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 620,
    height: '100%',
    overflow: 'hidden',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.primaryText,
    fontSize: 10,
    marginBottom: 10,
    marginLeft: 5,
    letterSpacing: 1.5,
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },

  carouselWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 121,
    width: 225,
    borderRadius: 10,
    border: `3px solid ${theme.palette.common.primaryCyan}`,
  },
  bottomLeftCircle: {
    position: 'absolute',
    width: 23,
    height: 23,
    borderRadius: '100%',
    backgroundColor: theme.palette.common.primaryCyan,
    bottom: -10,
    right: -10,
  },
  content: {
    fontSize: 15,
    fontFamily: theme.typography.thinFontFamily,
    letterSpacing: 0.5,
  },
  carouselBtnGroup: {
    position: 'absolute',
    bottom: 3,
    left: 90,
    width: 40,
    height: 10,
    display: 'flex',
    alingItems: 'center',
    justifyContent: 'space-between',
  },
  carouselBtnActive: {
    height: 7,
    width: 7,
    borderRadius: '100%',
    backgroundColor: theme.palette.common.primaryText,
  },
  carouselBtn: {
    height: 7,
    width: 7,
    borderRadius: '100%',
    backgroundColor: theme.palette.common.secondaryCardBackground,
  },
  activeContent: {
    display: 'block',
    margin: 0,
    padding: '0 10px',
  },
  inActiveContent: {
    display: 'none',
    margin: 0,
    padding: 0,
  },
  transparentBackground: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: '#52FFFF',
    opacity: 0.1,
  },
}))

const Widget38 = ({ width = 620, height = 181, topic = 'widget-38' }) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()
  const [activeContent, setActiveContent] = useState(0)

  if (!title) {
    return ''
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        padding: 10,
        paddingTop: 5,
        borderRight: 10,
        marginLeft: 5,
        marginRight: 0,
        marginTop: 0,
        borderRadius: 10,
      }}
    >
      <div className={classes.root} style={{ width: width, height: height }}>
        <div className={classes.title}>{title}</div>
        <div className={classes.body}>
          <div className={classes.carouselWrapper}>
            <div className={classes.transparentBackground}></div>
            <div className={classes.content}>
              {data.carousel.map((item, idx) => (
                <p key={idx} className={activeContent === idx ? classes.activeContent : classes.inActiveContent}>
                  {item}
                </p>
              ))}
            </div>
            <div className={classes.carouselBtnGroup}>
              {data.carousel.map((item, idx) => {
                return (
                  <a
                    key={idx}
                    className={activeContent === idx ? classes.carouselBtnActive : classes.carouselBtn}
                    onClick={() => {
                      setActiveContent(idx)
                    }}
                  >
                    {}
                  </a>
                )
              })}
            </div>
            <div className={classes.bottomLeftCircle}></div>
          </div>
          <div style={{ height: 20 }}></div>
          <div
            style={{
              width: '95%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 130,
            }}
          >
            <HorizontalTripleSlider
              {...data.changes}
              fontSize={10}
              mode={TripleSliderMode.filled}
              fillBgColor={'rgba(82, 255, 255, 0.4)'}
            />
            <HorizontalTripleSlider
              {...data.market}
              fontSize={10}
              titleOffset={10}
              sliderHeight={30}
              pointSize={16}
              sticky={true}
            />
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget38
