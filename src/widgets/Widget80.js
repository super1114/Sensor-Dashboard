import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import bank from 'assets/icons/bank.svg'
import finance from 'assets/icons/finance.svg'
import investment from 'assets/icons/investment.svg'
import technology from 'assets/icons/technology.svg'
import digital from 'assets/icons/digital.svg'
import marketing from 'assets/icons/marketing.svg'
import legal from 'assets/icons/legal.svg'
import operation from 'assets/icons/operation.svg'
import international from 'assets/icons/international.svg'
import other from 'assets/icons/other.svg'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    WebkitTextSizeAdjust: 'none',
    width: '100%',
  },
  each: {
    width: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 6,
  },
  svgImg: {
    height: 17,
    width: 17,
  },
  text: {
    marginTop: 4,
    fontSize: 7,
    letterSpacing: '0.6',
    lineHeight: '8.2px',
    fontFamily: theme.typography.mediumFontFamily,
    textAlign: 'center',
    width: 43,
  },
}))

const Widget75 = ({ style = {}, width = 500, height = 300, topic = 'topic-75' }) => {
  const classes = useStyles()

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        borderRadius: 8,
        margin: 0,
        padding: 10,
        paddingTop: 3,
        paddingBottom: 0,
        width: width,
        height: height,
      }}
    >
      <div className={classes.root}>
        <div className={classes.each}>
          <img className={classes.svgImg} src={bank} alt="bank" />
          <div className={classes.text}>Banking</div>
        </div>
        <div className={classes.each}>
          <img className={classes.svgImg} src={finance} alt="finance" />
          <div className={classes.text}>Finance</div>
        </div>
        <div className={classes.each}>
          <img className={classes.svgImg} src={investment} alt="investments & pension" />
          <div className={classes.text}>Investments & Pensions</div>
        </div>
        <div className={classes.each}>
          <img className={classes.svgImg} src={technology} alt="technology" />
          <div className={classes.text}>Technology</div>
        </div>
        <div className={classes.each}>
          <img className={classes.svgImg} src={digital} alt="digital" />
          <div className={classes.text}>Digital</div>
        </div>
        <div className={classes.each}>
          <img className={classes.svgImg} src={marketing} alt="marketing" />
          <div className={classes.text}>Marketing</div>
        </div>
        <div className={classes.each}>
          <img className={classes.svgImg} src={legal} alt="legal" />
          <div className={classes.text}>Legal</div>
        </div>
        <div className={classes.each}>
          <img className={classes.svgImg} src={operation} alt="operation" />
          <div className={classes.text}>Operation</div>
        </div>
        <div className={classes.each}>
          <img className={classes.svgImg} src={international} alt="international" />
          <div className={classes.text}>International</div>
        </div>
        <div className={classes.each}>
          <img className={classes.svgImg} src={other} alt="other" />
          <div className={classes.text}>Other</div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget75
