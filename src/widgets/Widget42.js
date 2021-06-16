import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import clsx from 'clsx'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'

import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import glassFill from '../assets/icons/sunglassFill.svg'
import glassEmpty from '../assets/icons/sunglassEmpty.svg'
import clickBadge from '../assets/icons/click.svg'
import radiusIcon from '../assets/icons/radius.svg'

import mqttService from 'service/mqtt'
const client = mqttService.getClient(() => {})

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    overflow: 'hidden',

    WebkitTextSizeAdjust: 'none',
    WebkitTouchCallout: 'none' /* iOS Safari */,
    WebkitUserSelect: 'none' /* Safari */,
    KhtmlUserSelect: 'none' /* Konqueror HTML */,
    MozUserSelect: 'none' /* Old versions of Firefox */,
    MsUserSelect: 'none' /* Internet Explorer/Edge */,
    userSelect:
      'none' /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */,
  },

  titleBadge: {
    position: 'absolute',
    top: 5,
    right: 10,
    width: 20,
    height: 20,
  },

  radiusIcon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  carouselWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '5px 0',
    height: 234,
    borderRadius: 10,
    border: `2px solid ${theme.palette.common.thirdBlue}`,
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    height: 36,
  },
  titleWrapperContent: {
    height: 'inherit',
    display: 'flex',
    alignItems: 'center',
  },
  wrapperIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },

  carouselTitle: {
    fontSize: 20,
    letterSpacing: 1.6666666269302368,
    fontFamily: theme.typography.mediumFontFamily,
  },
  carouselSubtitle: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: -5,
    fontFamily: theme.typography.lightFontFamily,
    letterSpacing: 0.8333333134651184,
    textAlign: 'left',
  },
  content: {
    fontSize: 15,
    fontFamily: theme.typography.lightFontFamily,
    width: 'inherit',
    letterSpacing: 0.5,
  },
  carouselContent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  carouselContentWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: 30,
    width: 355,
  },
  carouselContentIconBlue: {
    height: 10,
    width: 10,
    marginTop: 2,
    backgroundColor: theme.palette.common.primaryBlue,
    borderRadius: '100%',
    marginRight: 15,
  },
  carouselContentIconCyan: {
    height: 10,
    marginTop: 2,
    width: 10,
    backgroundColor: theme.palette.common.primaryCyan,
    marginRight: 15,
    borderRadius: '100%',
  },
  carouselContentText: {
    fontSize: 12,
    color: theme.palette.common.primaryText,
    lineHeight: `14px`,
    letterSpacing: `1px`,
    padding: 0,
    margin: 0,
  },

  carouselBtnGroup: {
    position: 'absolute',
    bottom: 10,
    left: 383,
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

  newsWrapperParent: {
    height: 500,
    paddingTop: 10,
    width: 827,
    marginLeft: 20,
    overflow: 'hidden',
    overflowX: 'inherit',
  },
  newsWrapperChild: {
    height: 'inherit',
    width: 'inherit',
    overflow: 'auto',
    overflowX: 'inherit',
    paddingRight: 20,
  },

  successMark: {
    backgroundColor: theme.palette.common.primaryBlue,
    width: 21,
    height: 21,
    borderRadius: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  newsWrapper: {
    cursor: 'pointer',
    height: 89,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    position: 'relative',
    backgroundColor: theme.palette.common.secondaryBlack,
    color: theme.palette.common.primaryText,
    display: 'flex',
  },
  newsImage: {
    width: 118,
    height: 90,
    backgroundSize: 'auto 100%',
    marginRight: 9,
  },
  newsContent: {
    display: 'flex',
    width: 690,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  newsContentTitle: {
    fontFamily: theme.typography.mediumFontFamily,
    letterSpacing: 1,
    fontSize: 20,
  },
  newsContentContent: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 14,

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
  },
  newsContentInfo: {
    fontSize: 10,
    fontFamily: theme.typography.lightFontFamily,
  },

  newsContentBottomWrapper: {
    position: 'absolute',
    width: 220,
    bottom: 5,
    right: 5,
    height: 21,
    display: 'flex',
    justifyContent: 'space-between',
  },
  newsContentBottomNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 9,
    fontFamily: theme.typography.mediumFontFamily,
    height: 21,
    width: 21,
    borderRadius: '100%',
  },
  newsType: {
    borderRadius: 10.5,
    width: 144,
    height: 19,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
    fontFamily: theme.typography.mediumFontFamily,
  },
  newsFillIcon: {
    width: 21,
    height: 21,
  },

  blueCircle: {
    backgroundColor: theme.palette.common.primaryBlue,
  },
  cyanCircle: {
    backgroundColor: theme.palette.common.primarycyan,
  },
  redCircle: {
    backgroundColor: theme.palette.common.primaryRed,
  },
  greenCircle: {
    backgroundColor: theme.palette.common.secondaryGreen,
  },

  blueType: {
    border: `1px solid ${theme.palette.common.primaryBlue}`,
    color: theme.palette.common.primaryBlue,
  },
  cyanType: {
    border: `1px solid ${theme.palette.common.primaryCyan}`,
    color: theme.palette.common.primaryCyan,
  },
  greenType: {
    border: `1px solid ${theme.palette.common.primaryGreen}`,
    color: theme.palette.common.primaryGreen,
  },
  redType: {
    border: `1px solid ${theme.palette.common.primaryRed}`,
    color: theme.palette.common.primaryRed,
  },
  purpleType: {
    border: `1px solid ${theme.palette.common.secondaryBlue}`,
    color: theme.palette.common.secondaryBlue,
  },
}))

const Widget42 = ({
  width = 834,
  height = 773,
  topic = 'topic-42',
  setFilter = filter => {},
  filter = null,
  user = null,
}) => {
  const msg = useNodeRed(topic)

  const classes = useStyles()
  const [clickedArticle, setClickedArticle] = useState(null)
  const [toggles, setToggles] = useState([])
  const [title, setTitle] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (JSON.stringify(msg) !== JSON.stringify({ title: title, data: data })) {
      setTitle(msg.title)
      setData(msg.data)
    }
  }, [msg])

  useEffect(() => {
    if (data && data.news) setToggles(data.news.map(each => each.toggle))
  }, [data])

  useEffect(() => {}, [filter])

  if (!data) {
    return ''
  }

  const hightlights = []

  data.carousel.forEach((item, idx) => {
    hightlights.push(
      <div className={classes.activeContent} key={idx}>
        <div className={classes.titleWrapper}>
          <img src={radiusIcon} className={classes.radiusIcon} alt="radius Icon" />
          <div className={classes.titleWrapperContent}>
            <span className={classes.carouselTitle}>{item.title}</span>
            <span className={classes.carouselSubtitle}>{item.subTitle}</span>
          </div>
          <div className={classes.wrapperIcon}></div>
        </div>

        <div className={classes.carouselContent}>
          {item.hightlights.map((each, index) => {
            return (
              <div
                className={classes.carouselContentWrapper}
                key={index}
                style={{ width: index % 2 === 0 ? 385 : 365 }}
              >
                <div
                  className={each.color === 'blue' ? classes.carouselContentIconBlue : classes.carouselContentIconCyan}
                  style={{
                    marginTop: index === 0 ? 6 : index === 1 ? 15 : 2,
                  }}
                ></div>
                <div className={classes.carouselContentText} style={{ width: index % 2 === 0 ? 365 : 345 }}>
                  {each.content}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  })

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  }

  const CustomDot = ({ onClick, ...rest }) => {
    const { index, active } = rest

    // onMove means if dragging or swiping in progress.
    // active is provided by this lib for checking if the item is active or not.
    const temps = []
    temps.push(<div></div>)
    temps.push(<div></div>)
    temps.push(<div></div>)

    return (
      <a
        className={active ? classes.carouselBtnActive : classes.carouselBtn}
        onClick={() => onClick()}
        style={{ marginRight: 5, marginBottom: 5 }}
      >
        {React.Children.toArray(temps)[index]}
      </a>
    )
  }

  const handleToggle = (e, idx) => {
    e.stopPropagation()
    let tempArray = [...toggles]
    tempArray[idx] = 1 - tempArray[idx]
    setToggles(tempArray)

    mqttService.publish(
      client,
      'toolbar-company',
      JSON.stringify({
        user: user.username,
        toggle: {
          index: idx,
          value: tempArray[idx],
        },
      })
    )
    // e.stopPropagation();
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        padding: 11,
        borderRight: 10,
        marginLeft: 0,
        marginRight: 10,
        marginTop: 0,
        borderRadius: 10,
        height: height,
        width: width,
      }}
    >
      <div className={classes.root}>
        <div className={classes.carouselWrapper} style={{ width: width - 26 }}>
          <a
            onClick={() => {
              setFilter('highlights')
            }}
            style={{ zIndex: 10000 }}
          >
            <img src={clickBadge} className={classes.titleBadge} alt="click badge icon" />
          </a>
          <div className={classes.content}>
            <Carousel
              responsive={responsive}
              draggable={true}
              arrows={false}
              showDots={true}
              customDot={<CustomDot />}
              dotListClass
              renderDotsOutside={true}
            >
              {hightlights}
            </Carousel>
          </div>
        </div>

        <div className={classes.newsWrapperParent}>
          <div className={classes.newsWrapperChild}>
            {data.news.map((item, idx) => {
              if (filter === null || (item.specific && item.specific.includes(filter)))
                return (
                  <div
                    className={classes.newsWrapper}
                    key={idx}
                    style={{ width: width - 17 * 2 - 10, height: idx === clickedArticle ? 'max-content' : 89 }}
                    onClick={() => {
                      setClickedArticle(idx === clickedArticle ? null : idx)
                    }}
                  >
                    {item.successMark && <div className={classes.successMark}></div>}
                    <div
                      className={classes.newsImage}
                      style={{ backgroundImage: `url('../images/${item.imageUrl}')` }}
                    ></div>

                    <div className={classes.newsContent}>
                      <div className={classes.newsContentTitle}>{item.title}</div>
                      <div
                        className={classes.newsContentContent}
                        style={{
                          minHeight: idx === clickedArticle ? 'min-content' : 34,
                          marginTop: 9,
                          marginBottom: 10,
                        }}
                      >
                        {item.content}
                      </div>
                      <div className={classes.newsContentInfo}>
                        <span style={{ paddingRight: 5 }}>{item.info.date} </span>{' '}
                        <span style={{ paddingRight: 5 }}>|</span> Source: {item.info.source}
                      </div>
                    </div>
                    <div className={classes.newsContentBottomWrapper}>
                      <a
                        onClick={e => {
                          handleToggle(e, idx)
                        }}
                      >
                        {toggles[idx] ? (
                          <img src={glassFill} className={classes.newsFillIcon} alt="Seen" />
                        ) : (
                          <img src={glassEmpty} className={classes.newsFillIcon} alt="Never Seen" />
                        )}
                      </a>
                      <div
                        className={clsx(classes.newsType, {
                          [classes.blueType]: item.typeColor === 'blue',
                          [classes.cyanType]: item.typeColor === 'cyan',
                          [classes.greenType]: item.typeColor === 'green',
                          [classes.redType]: item.typeColor === 'red',
                          [classes.purpleType]: item.typeColor === 'purple',
                        })}
                      >
                        {item.type}
                      </div>
                      <div
                        className={clsx(classes.newsContentBottomNumber, {
                          [classes.blueCircle]: item.numberCircle === 'blue',
                          [classes.cyanCircle]: item.numberCircle === 'cyan',
                          [classes.greenCircle]: item.numberCircle === 'green',
                          [classes.redCircle]: item.numberCircle === 'red',
                        })}
                      >
                        {item.number}
                      </div>
                    </div>
                  </div>
                )
            })}
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget42
