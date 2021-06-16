import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import clsx from 'clsx'
import useNodeRed from 'hooks/useNodeRed'
import copyLink from 'assets/icons/copyLink.svg'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'auto',
    WebkitTextSizeAdjust: 'none',
    position: 'relative',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.83,
    marginBottom: 12,
  },
  wrapperContext: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    paddingTop: 7,
    paddingBottom: 8,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.67,
    borderRadius: 8,
    marginBottom: 10,
    fontFamily: theme.typography.lightFontFamily,
    backgroundColor: theme.palette.common.secondaryCardBackground,
  },
  content_column: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  content_row: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  blackFont: {
    color: theme.palette.common.primaryBlack,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.67,
  },
  greenFont: {
    color: theme.palette.common.primaryGreen,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.67,
  },
  cyanFont: {
    color: theme.palette.common.primaryCyan,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.67,
  },
  blueFont: {
    color: theme.palette.common.thirdBlue,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.67,
  },
  fontBold: {
    fontFamily: theme.typography.mediumFontFamily,
  },

  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    top: -3,
    right: 3,
  },
}))

const Widget72 = ({ style = {}, width = 586, height = 151, topic = 'topic-72' }) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) {
    return ''
  }

  const generateBreakByAnd = text => {
    let strs = text.split('&')
    let context = []
    strs.map((each, idx) => {
      context.push(<p style={{ margin: 0, padding: 0 }}>{each}</p>)
      if (idx !== strs.length - 1) context.push('&')
    })
    return context
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        borderRadius: 8,
        margin: 0,
        padding: 8,
        paddingTop: 10,
        paddingBottom: 0,
        width: width,
        height: height,
        overflow: 'initial',
      }}
    >
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <a className={classes.icon}>
          <img src={copyLink} alt="copy_link" width={18} height={18}></img>
        </a>
        <div className={classes.body}>
          <div className={classes.content_column}>
            <div className={classes.wrapperContext} style={{ padding: 0, paddingTop: 8, paddingBottom: 4 }}>
              <div className={classes.content_row}>
                <div
                  className={clsx(classes.fontBold, classes.cyanFont, classes.center)}
                  style={{ width: 128, paddingLeft: 3, paddingRight: 3, marginTop: -5 }}
                >
                  <span>{generateBreakByAnd(data.content1[0].text)}</span>
                </div>
                <div className={classes.content_column}>
                  <div className={classes.content_row} style={{ marginTop: -3 }}>
                    <span style={{ marginLeft: 4, marginTop: -1 }}>{data.content1[1].text}</span>
                    <span style={{ marginRight: 4, marginTop: 1 }}>{data.content1[2].text}</span>
                  </div>
                  <div className={classes.content_row} style={{ marginTop: 2 }}>
                    <span style={{ marginLeft: 60 }}>{data.content1[3].text}</span>
                    <span style={{ marginRight: 40 }}>{data.content1[4].text}</span>
                  </div>
                  <div className={classes.content_row} style={{ marginTop: 3 }}>
                    <span style={{ marginLeft: 30, marginTop: 2 }}>{data.content1[5].text}</span>
                    <span style={{ marginRight: 5, marginTop: 4 }}>{data.content1[6].text}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.content_row}>
            <div className={classes.wrapperContext} style={{ marginRight: 7, height: 180 }}>
              <div className={classes.content_column} style={{ alignItems: 'flex-start', marginTop: 5 }}>
                <span style={{ marginLeft: 8 }}>{data.content2[0].text}</span>
              </div>
              <div className={classes.content_column}>
                <span>{data.content2[1].text}</span>
              </div>
              <div className={classes.content_column}>
                <span style={{ marginLeft: 30 }}>{data.content2[2].text}</span>
              </div>
              <div className={classes.content_row}>
                <div
                  className={clsx(classes.content_column, classes.greenFont, classes.fontBold)}
                  style={{ marginLeft: -18 }}
                >
                  <span>{generateBreakByAnd(data.content2[3].text)}</span>
                </div>
                <div className={classes.content_column} style={{ display: 'flex', justifyContent: 'center' }}>
                  <span style={{ width: 130, marginLeft: -23 }}>{data.content2[4].text}</span>
                </div>
              </div>
              <div className={classes.content_column}>
                <span style={{ marginLeft: 40, marginTop: 4 }}>{data.content2[5].text}</span>
              </div>
              <div className={classes.content_column}>
                <span style={{ marginLeft: 20, marginTop: 4, width: 160, textAlign: 'left', marginBottom: 5 }}>
                  {data.content2[6].text}
                </span>
              </div>
            </div>
            <div className={classes.wrapperContext}>
              <div className={classes.content_column}>
                <span style={{ marginTop: 30, marginLeft: 10 }}>{data.content3[0].text}</span>
              </div>
              <div className={classes.content_row}>
                <div className={classes.content_column} style={{ textAlign: 'left' }}>
                  <span style={{ marginLeft: 10 }}>{data.content3[1].text}</span>
                </div>
                <div
                  className={clsx(classes.content_column, classes.blueFont, classes.fontBold)}
                  style={{ justifyContent: 'center' }}
                >
                  <span>{data.content3[2].text}</span>
                </div>
              </div>
              <div className={classes.content_column}>
                <span>{data.content3[3].text}</span>
              </div>
              <div className={classes.content_column}>
                <span style={{ marginBottom: 10 }}>{data.content3[4].text}</span>
              </div>
            </div>
          </div>
          <div className={classes.content_column}>
            <div className={classes.wrapperContext} style={{ height: 86, padding: 0 }}>
              <div className={classes.content_column} style={{ height: 27, justifyContent: 'center' }}>
                <div className={classes.content_row}>
                  <span style={{ marginLeft: 80 }}>{data.content4[0].text}</span>
                  <span style={{ marginRight: 30, marginTop: 5 }}>{data.content4[1].text}</span>
                </div>
              </div>
              <div className={classes.content_row} style={{ height: 30, marginTop: -3 }}>
                <div className={clsx(classes.content_column, classes.cyanFont)} style={{ width: 120 }}>
                  <span>{generateBreakByAnd(data.content4[2].text)}</span>
                </div>
                <div className={classes.content_column}>
                  <div className={classes.content_row}>
                    <span style={{ marginTop: 2 }}>{data.content4[3].text}</span>
                    <span style={{ marginTop: 5, marginRight: 30 }}>{data.content4[4].text}</span>
                  </div>
                  <div className={classes.content_column}>
                    <span style={{ marginTop: -5 }}>{data.content4[5].text}</span>
                  </div>
                </div>
              </div>
              <div className={classes.content_column}>
                <div className={classes.content_row} style={{ marginBottom: 10 }}>
                  <span style={{ marginLeft: 90 }}>{data.content4[6].text}</span>
                  <span style={{ marginRight: 30, marginTop: 2 }}>{data.content4[7].text}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.content_column} style={{ marginTop: -2 }}>
            <div className={classes.wrapperContext} style={{ height: 80 }}>
              <div className={classes.content_row}>
                <div className={classes.content_column}>
                  <span style={{ marginTop: 3 }}>{data.content5[0].text}</span>
                  <span style={{ marginTop: 10 }}>{data.content5[1].text}</span>
                  <span style={{ marginTop: 10 }}>{data.content5[2].text}</span>
                  <span style={{ marginTop: 10, marginLeft: 30 }}>{data.content5[3].text}</span>
                </div>
                <div className={classes.content_column} style={{ justifyContent: 'space-around', marginLeft: 20 }}>
                  <div className={clsx(classes.content_column, classes.blueFont, classes.fontBold)}>
                    <span style={{ width: 120 }}>{data.content5[4].text}</span>
                  </div>
                  <span style={{ width: 120 }}>{data.content5[5].text}</span>
                </div>
                <div className={classes.content_column} style={{ marginRight: 20 }}>
                  <span style={{ width: 118 }}>{data.content5[6].text}</span>
                  <span style={{ width: 118 }}>{data.content5[7].text}</span>
                  <span style={{ width: 118 }}>{data.content5[8].text}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget72
