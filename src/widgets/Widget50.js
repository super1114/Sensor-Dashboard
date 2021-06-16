import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import PBTTriangle from 'components/extra_widgets/PBTTriangle'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'
import clsx from 'clsx'
import UnderlyingToStatuatoryGraph from 'components/graphs/UnderlyingToStatuatoryGraph'
import CirclePercentage from 'components/basic_components/CirclePercentage'

import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontSize: 8,
    padding: 5,
    WebkitTouchCallout: 'none' /* iOS Safari */,
    WebkitUserSelect: 'none' /* Safari */,
    KhtmlUserSelect: 'none' /* Konqueror HTML */,
    MozUserSelect: 'none' /* Old versions of Firefox */,
    MsUserSelect: 'none' /* Internet Explorer/Edge */,
    userSelect:
      'none' /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */,
  },
  title: {
    fontFamily: theme.typography.MediumFontFamily,
    color: theme.palette.common.primaryText,
    letterSpacing: 2,
    fontSize: 18,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%',
    position: 'relative',
  },

  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    marginLeft: -5,
  },
  graphSection: {
    display: 'flex',
    height: 245,
  },
  graphSectionTitle: {
    fontSize: 8,
    fontFamily: theme.palette.common.lightFontFamily,
    lineHeight: '9px',
    letterSpacing: 0.6666666865348816,
    textAlign: 'right',
    height: 210,
    paddingTop: 25,
    width: 55,
    marginRight: -9,
    backgroundColor: theme.palette.common.baseCardBackground,
    zIndex: 1,
  },
  mediumFont: {
    fontFamily: theme.palette.common.MediumFontFamily,
  },
  graphSubtitle: {
    height: 36,
  },
  oneGraphWrapper: {
    width: 175,
    height: 250,
    display: 'flex',
  },
  triangleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 20,
  },
  eachTriangle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 36,
    justifyContent: 'space-between',
  },

  percentageSection: {
    marginTop: 13,
    height: 93,
    display: 'flex',
  },
  percentageTitle: {
    height: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.common.baseCardBackground,
    zIndex: 1,
  },
  percentageSubTitle: {
    height: 30,
    width: 75,
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 8,
    lineHeight: '9px',
    letterSpacing: 0.6666666865348816,
  },
  percentageEach: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 154,
    marginRight: 20,
    height: 93,
    marginTop: 5,
  },

  carouselBtnActive: {
    height: 7,
    width: 7,
    position: 'absolute',
    top: -375,
    borderRadius: '100%',
    backgroundColor: theme.palette.common.primaryText,
  },
  carouselBtn: {
    height: 7,
    width: 7,
    position: 'absolute',
    top: -375,
    borderRadius: '100%',
    backgroundColor: theme.palette.common.secondaryCardBackground,
  },
}))

const Widget50 = ({ style = {}, width = 1173, height = 380, topic = 'topic-50' }) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) {
    return ''
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 5, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 6,
      slidesToSlide: 5, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 6,
      slidesToSlide: 5, // optional, default to 1.
    },
  }

  const carousels = []
  // eslint-disable-next-line array-callback-return
  data.map((each, idx) => {
    carousels.push(
      <div className={classes.oneGraphPercentageWrapper} key={idx}>
        <div className={classes.oneGraphWrapper} width={154} height={250}>
          <UnderlyingToStatuatoryGraph data={each.tax} key={idx} year={each.year} />
          <div className={clsx(classes.graphSectionTitle, classes.triangleWrapper)} style={{ marginTop: 2 }}>
            <PBTTriangle growth={each.growth.underlying.growth} value={each.growth.underlying.value} />
            <PBTTriangle growth={each.growth.ipoShare.growth} value={each.growth.ipoShare.value} />
            <PBTTriangle growth={each.growth.strategicItem.growth} value={each.growth.strategicItem.value} />
            <PBTTriangle growth={each.growth.simplification.growth} value={each.growth.simplification.value} />
            <PBTTriangle growth={each.growth.fairValue.growth} value={each.growth.fairValue.value} />
            <PBTTriangle growth={each.growth.statustory.growth} value={each.growth.statustory.value} />
          </div>
        </div>

        <div className={classes.percentageEach}>
          <CirclePercentage radius={36} fontSize={10} color={'blue'} value={each.percentage.underlying.toFixed(1)} />
          <CirclePercentage radius={36} fontSize={10} color={'cyan'} value={each.percentage.market.toFixed(1)} />
        </div>
      </div>
    )
  })

  const temp = []
  temp.push(<div></div>)
  const CustomDot = ({ onClick, ...rest }) => {
    const { index, active } = rest
    const carouselItems = [temp, temp, temp, temp, temp, temp, temp, temp, temp, temp]

    // onMove means if dragging or swiping in progress.
    // active is provided by this lib for checking if the item is active or not.
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a
        className={active ? classes.carouselBtnActive : classes.carouselBtn}
        style={{ right: -index * 12 + 35 }}
        onClick={() => onClick()}
      >
        {React.Children.toArray(carouselItems)[index * 5]}
      </a>
    )
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        paddingLeft: 10,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
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
          position: 'relative',
        }}
      >
        <div className={classes.title}>{title}</div>
        <div className={classes.body}>
          <div className={classes.graphSection}>
            <div className={classes.graphSectionTitle}>
              <div className={clsx(classes.mediumFont, classes.graphSubtitle)}>Underlying profit before tax</div>
              <div className={classes.graphSubtitle}>IPO share based payments</div>
              <div className={classes.graphSubtitle}>Strategic items</div>
              <div className={classes.graphSubtitle} style={{ height: 28 }}>
                Simplification costs
              </div>
              <div className={classes.graphSubtitle} style={{ height: 40 }}>
                Fair value losses on financial instruments
              </div>
              <div className={clsx(classes.mediumFont, classes.graphSubtitle)}>Statustory profit before tax</div>
            </div>
            <div style={{ width: width - 70 }}>
              <Carousel
                responsive={responsive}
                draggable={true}
                arrows={false}
                showDots={true}
                customDot={<CustomDot />}
                dotListClass
                renderDotsOutside={true}
              >
                {carousels}
              </Carousel>
            </div>
          </div>
          <div className={classes.percentageSection}>
            <div className={classes.percentageTitle}>
              <div className={classes.percentageSubTitle}>% of underlying PBT being adjustments</div>
              <div className={classes.percentageSubTitle}>Market % of underlying PBT being adjustments</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget50
