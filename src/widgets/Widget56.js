import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { useState } from 'react'
import HorizontalTripleSlider from 'components/processes/HorizontalTripleSlider'
import Triangle from 'components/basic_components/Triangle'
import { CardMode, TriangleMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'
import { toBillion } from 'helpers/helpers'
import clsx from 'clsx'

import InfoPng from 'assets/icons/info.png'

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 8,
    padding: 5,
    letterSpacing: 1.5,
    width: '100%',
    height: 'auto',
    WebkitTextSizeAdjust: 'none',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 0.93,
    fontSize: 11.2,
    marginBottom: 5,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
  },

  mainValue: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 36,
    letterSpacing: 3,
  },
  value: {
    fontFamily: theme.typography.mediumFontFamily,
    textAlign: 'center',
    width: '100%',
    fontSize: 24,
    letterSpacing: 2,
  },
  meta: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'inherit',
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 8,
    letterSpacing: 0.83,
    color: theme.palette.common.primaryText,
  },
  section: {
    display: 'flex',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 106,
    marginRight: 10,
  },
  bottomLeftCircle: {
    position: 'absolute',
    width: 23,
    height: 23,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: '100%',
    backgroundColor: theme.palette.common.thirdBlue,
    bottom: -8,
    right: -33,
  },
  content: {
    fontSize: 15,
    fontFamily: theme.typography.thinFontFamily,
    letterSpacing: 0.5,
  },
  carouselWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 110,
    width: 160,
    borderRadius: 10,
    border: `3px solid ${theme.palette.common.thirdBlue}`,
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
    fontSize: 13,
    lineHeight: '15px',
    letterSpacing: 1.1,
  },
  transparentBackground: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: theme.palette.common.thirdBlue,
    opacity: 0.2,
  },

  subTitle: {
    fontSize: 8,
    fontFamily: theme.typography.mediumFontFamily,
    lineHeight: '9.38px',
    letterSpacing: 0.67,
  },
  sectionWrapper: {
    width: '70%',
    marginLeft: '12%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  yearSection: {
    backgroundColor: 'rgba(61, 182, 252, 0.4)',
    height: 18,
    borderRadius: 9,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 2,
    paddingLeft: 2,
    fontSize: 8,
    fontFamily: theme.typography.thinFontFamily,
    letterSpacing: 0.67,
  },

  circleButton: {
    width: 11.7,
    height: 11.7,
    borderRadius: '100%',
    backgroundColor: 'transparent',
    border: `2px solid ${theme.palette.common.thirdBlue}`,
    borderBox: 'border-box',
    '&:hover': {
      backgroundColor: theme.palette.common.thirdBlue,
      border: 'none',
      width: 15.7,
      height: 15.7,
    },
    '&:active': {
      backgroundColor: theme.palette.common.thirdBlue,
      border: 'none',
      width: 15.7,
      height: 15.7,
    },
  },
  activeCircleButton: {
    borderRadius: '100%',
    backgroundColor: theme.palette.common.thirdBlue,
    border: 'none',
    width: 15.7,
    height: 15.7,
  },
}))

const Widget56 = ({ style = {}, width = 255, height = 185, topic = 'topic-56' }) => {
  const { title, data, years } = useNodeRed(topic)
  const classes = useStyles()
  const [tap, setTap] = useState(false)
  const [currentYear, setCurrentYear] = useState(0)

  if (!title) {
    return ''
  }

  const handleYearClick = idx => {
    setCurrentYear(idx)
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        marginLeft: 10,
        marginRight: 0,
        marginTop: 0,
        paddingLeft: 7.5,
        paddingRight: 7.5,
        paddingTop: 0,
        borderRadius: 8,
        width: width,
        height: height,
      }}
    >
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.body}>
          <div className={classes.section}>
            <div className={classes.contentWrapper}>
              <div style={{ height: 10 }}></div>
              <div className={classes.value}>
                £<span className={classes.mainValue}>{toBillion(data[currentYear].value).toFixed(1)}</span>bn
              </div>
              <div style={{ height: 15 }}></div>
              <div className={classes.meta} style={{ marginTop: 7.22, marginBottom: 25 }}>
                <Triangle bottomWidth={8} width={7} mode={TriangleMode.success} />
                <span style={{ marginLeft: 5 }}>{data[currentYear].growthMeta}</span>
              </div>
            </div>

            <div style={{ width: '50%', position: 'relative' }}>
              <div className={classes.carouselWrapper}>
                <div className={classes.transparentBackground}></div>
                <div className={classes.content} style={{ visibility: tap ? 'visible' : 'hidden' }}>
                  <p className={classes.activeContent}>{data[currentYear].meta}</p>
                </div>
              </div>
              <a
                className={classes.bottomLeftCircle}
                onClick={() => {
                  setTap(!tap)
                }}
              >
                <img alt="info" src={InfoPng} />
              </a>
            </div>
          </div>

          <div className={classes.subTitle}>YoY Changes</div>
          <div style={{ height: 3 }}></div>
          <div className={clsx(classes.sectionWrapper, classes.yearSection)}>
            {years.map((each, idx) => {
              return (
                <a
                  key={idx}
                  className={clsx({
                    [classes.activeCircleButton]: currentYear === idx,
                    [classes.circleButton]: currentYear !== idx,
                  })}
                  onClick={() => {
                    handleYearClick(idx)
                  }}
                ></a>
              )
            })}
          </div>
          <div className={clsx(classes.sectionWrapper, classes.yearSection)} style={{ backgroundColor: 'transparent' }}>
            <div>{years[0]}</div>
            <div>{years[years.length - 1]}</div>
          </div>

          <div className={classes.subTitle} style={{ marginTop: 5 }}>
            Market Comparison
          </div>
          <div className={classes.sectionWrapper}>
            <HorizontalTripleSlider
              {...data[currentYear].market}
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

export default Widget56
