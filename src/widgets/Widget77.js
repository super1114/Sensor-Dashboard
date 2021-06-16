import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import BoardEvolutionTable from 'components/tables/BoardEvolutionTable'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'
import clsx from 'clsx'

import informGreen from 'assets/icons/informGreen.svg'
import alertRed from 'assets/icons/alertRed.svg'

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
    letterSpacing: 0.83,
    fontSize: 10,
    marginBottom: 5,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
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
    backgroundColor: theme.palette.common.secondaryGreen,
    bottom: -10,
    right: -12,
  },
  content: {
    fontSize: 15,
    fontFamily: theme.typography.thinFontFamily,
    letterSpacing: 0.5,
  },
  carouselWrapperDanger: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    border: `3px solid ${theme.palette.common.primaryRed}`,
  },
  carouselWrapperSuccess: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    border: `3px solid ${theme.palette.common.secondaryGreen}`,
  },
  activeContent: {
    display: 'block',
    margin: 0,
    padding: '0 10px',
    fontSize: 13,
    lineHeight: '15px',
    letterSpacing: 1.1,
  },
  transparentBackgroundDanger: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: theme.palette.common.primaryRed,
    opacity: 0.08,
  },
  transparentBackgroundSuccess: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: theme.palette.common.secondaryGreen,
    opacity: 0.08,
  },
}))

const Widget77 = ({ style = {}, width = 255, height = 185, topic = 'topic-77' }) => {
  const { title, data, type } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) {
    return ''
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        margin: 0,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 0,
        borderRadius: 8,
        width: width,
        height: height,
      }}
    >
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.body}>
          <div
            className={clsx({
              [classes.carouselWrapperDanger]: type === 'danger',
              [classes.carouselWrapperSuccess]: type === 'info',
            })}
            style={{ height: height - 40, width: width - 30 }}
          >
            {type === 'danger' ? (
              <div className={classes.transparentBackgroundDanger}></div>
            ) : (
              <div className={classes.transparentBackgroundSuccess}></div>
            )}

            <div className={classes.content}>
              <BoardEvolutionTable data={data} width={width - 40} height={height - 50} />
            </div>

            {type === 'info' ? (
              <a className={classes.bottomLeftCircle}>
                <img alt="info" src={informGreen} width={23} height={23} />
              </a>
            ) : (
              <a className={classes.bottomLeftCircle}>
                <img alt="info" src={alertRed} width={23} height={23} />
              </a>
            )}
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget77
