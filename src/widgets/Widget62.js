import { makeStyles } from '@material-ui/core/styles'

import clsx from 'clsx'
import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'

import Alignment from '../assets/icons/alignment.svg'
import Impact from '../assets/icons/impact.svg'
import Customers from '../assets/icons/customers.svg'
import Shakeholders from '../assets/icons/shakeholders.svg'
import Culture from '../assets/icons/culture.svg'
import Transparency from '../assets/icons/transparency.svg'
import arrowCircle from 'assets/icons/arrowCircle.svg'
import { PriorityHigh, Publish } from '@material-ui/icons'

import mqttService from 'service/mqtt'
const client = mqttService.getClient(() => {})

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    fontSize: 8,
    padding: 5,
    WebkitTextSizeAdjust: 'none',
    position: 'relative',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.83,
    marginBottom: 2,
  },

  arrowCircle: {
    position: 'absolute',
    top: 1,
    right: 5,
  },
  blueTextColor: {
    color: theme.palette.common.primaryBlue,
  },
  cyanTextColor: {
    color: theme.palette.common.primaryCyan,
  },

  body: {
    display: 'flex',
    marginTop: 5,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    width: '100%',
  },
  wrapperContext: {
    width: 71,
    height: 68,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    padding: 10,
    paddingTop: 7,
    paddingBottom: 8,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.83,
    borderRadius: 8,
    marginBottom: 6,
    fontFamily: theme.typography.lightFontFamily,
    backgroundColor: theme.palette.common.secondaryCardBackground,
  },

  icons: {
    width: 29,
    height: 29,
  },

  subTitle: {
    color: theme.palette.common.primaryText,
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.83,
    marginTop: 3,
    marginBottom: 9,
    width: '100%',
  },
  blue: {
    color: theme.palette.common.thirdBlue,
  },
  cyan: {
    color: theme.palette.common.primaryCyan,
  },
  green: {
    color: theme.palette.common.primaryGreen,
  },

  gradientWrapper: {
    width: 75,
    height: 50,
    top: 0,
    left: 0,
    border: `2px solid ${theme.palette.common.primaryRed}`,
    borderRadius: 10,
    position: 'relative',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    fontSize: 8,
    lineHeight: '9.38px',
    letterSpacing: 0.67,
  },
  gradientBg: {
    width: 75,
    height: 50,
    top: 0,
    left: 0,
    opacity: 0.15,
    background: `linear-gradient(to right, ${theme.palette.common.primaryRed}, ${theme.palette.common.secondaryRed})`,
    position: 'absolute',
    borderRadius: 10,
  },

  displayCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 15,
    height: 15,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(50%, 50%)',
    color: theme.palette.common.primaryText,
  },
  dangerIcon: {
    background: theme.palette.common.primaryRed,
  },
  danger: {
    borderColor: theme.palette.common.primaryRed,
  },
}))

const Widget62 = ({ style = {}, width = 1173, height = 476, topic = 'topic-62' }) => {
  const { title, subTitle, rand } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) {
    return ''
  }

  const newPublish = () => {
    mqttService.publish(client, 'principles-bank', JSON.stringify({}))
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
        paddingTop: 0,
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
          {title}----{rand}
        </div>
        <a
          className={classes.arrowCircle}
          onClick={() => {
            newPublish()
          }}
        >
          <img src={arrowCircle} alt="arrow_circle"></img>
        </a>
        <div className={classes.body}>
          <div className={classes.wrapperContext}>
            <div className={classes.blue}>Alignment</div>
            <img src={Alignment} className={classes.icons} alt="icon" />
          </div>
          <div className={classes.wrapperContext}>
            <div className={classes.cyan}>Impact and Target Setting</div>
            <img src={Impact} className={classes.icons} alt="icon" />
          </div>
          <div className={classes.wrapperContext}>
            <div className={classes.green}>Clients & Customers</div>
            <img src={Customers} className={classes.icons} alt="icon" />
          </div>
          <div className={classes.wrapperContext}>
            <div className={classes.blue}>Shakeholders</div>
            <img src={Shakeholders} className={classes.icons} alt="icon" />
          </div>
          <div className={classes.wrapperContext}>
            <div className={classes.cyan}>Governance & Culture</div>
            <img src={Culture} className={classes.icons} alt="icon" />
          </div>
          <div className={classes.wrapperContext}>
            <div className={classes.green}>Transparency & Accountability</div>
            <img src={Transparency} className={classes.icons} alt="icon" />
          </div>

          <div className={classes.subTitle}>{subTitle}</div>

          <div className={clsx(classes.wrapperContext, classes.displayCenter)}>
            <div className={classes.gradientWrapper}>
              <div className={classes.blue}>Analyse current impact on people and planet</div>
              <div className={clsx(classes.icon, classes.dangerIcon)}>
                <PriorityHigh style={{ fontSize: 12 }} />
              </div>
              <div className={classes.gradientBg}></div>
            </div>
          </div>

          <div className={clsx(classes.wrapperContext, classes.displayCenter)}>
            <div className={classes.gradientWrapper}>
              <div className={classes.cyan}>Set targets to improve impact, and implement</div>
              <div className={clsx(classes.icon, classes.dangerIcon)}>
                <PriorityHigh style={{ fontSize: 12 }} />
              </div>
              <div className={classes.gradientBg}></div>
            </div>
          </div>

          <div className={clsx(classes.wrapperContext, classes.displayCenter)}>
            <div className={classes.gradientWrapper}>
              <div className={classes.green} style={{ padding: 10 }}>
                Publicly report on progress
              </div>
              <div className={clsx(classes.icon, classes.dangerIcon)}>
                <PriorityHigh style={{ fontSize: 12 }} />
              </div>
              <div className={classes.gradientBg}></div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget62
