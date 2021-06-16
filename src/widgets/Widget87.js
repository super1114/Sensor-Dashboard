import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'
import { useState } from 'react'

import alertRed from 'assets/icons/alertRed.svg'

import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    paddingBottom: 10,
    WebkitTextSizeAdjust: 'none',
    width: '100%',
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
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 10,
    lineHeight: '11.72px',
    letterSpacing: 0.83,
  },
  bodyWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: -3,
    width: '100%',
  },
  infoWrapper: {
    height: 111,
    width: 263.6,
    border: `3px solid ${theme.palette.common.primaryRed}`,
    position: 'relative',
    borderRadius: 10,
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    fontSize: 13,
    lineHeight: '15px',
    letterSpacing: 1.08,
    paddingLeft: 4,
    color: theme.palette.common.priamryText,
    fontFamily: theme.typography.thinFontFamily,
  },
  icon: {
    width: 23.6,
    height: 23.6,
    position: 'absolute',
    bottom: -12,
    right: -12,
    background: `url(${alertRed})`,
    backgroundSize: '100%, 100%',
  },
  transparent: {
    background: 'rgba(246, 92, 107, 0.1)',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  listWrapper: {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.common.primaryBlue}`,
    borderRadius: 5,
    width: 253,
    height: 122,
    marginRight: 10,
    padding: 6,
    paddingLeft: 7,
    position: 'relative',
  },

  eachWrapper: {
    fontSize: 8,
    letterSpacing: 0.67,
    lineHeight: '9.4px',
    fontFamily: theme.typography.mediumFontFamily,
    display: 'flex',
    height: 12,
    alignItems: 'center',
  },

  blue: {
    color: theme.palette.common.primaryBlue,
  },
  white: {
    color: theme.palette.common.primaryText,
  },
  cyan: {
    color: theme.palette.common.primaryCyan,
  },
  secondaryBlue: {
    color: theme.palette.common.secondaryBlue,
  },
  year: {
    width: 25,
    marginRight: 5,
  },
  tagWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  item: {
    marginRight: 4,
    cursor: 'pointer',
  },
  spliter: {
    position: 'absolute',
    top: 6,
    left: 32,
    width: 1,
    backgroundColor: theme.palette.common.primaryText,
    height: 120,
  },
}))

const Widget87 = ({ style = {}, width = 500, height = 300, topic = 'topic-87' }) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()
  const [selectTag, setSelectTag] = useState(0)

  if (!title) return null

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        borderRadius: 8,
        margin: 0,
        padding: 8,
        paddingTop: 5,
        paddingBottom: 0,
        width: width,
        height: height,
        overflow: 'initial',
      }}
    >
      <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.bodyWrapper}>
          <div className={classes.infoWrapper}>
            <div className={classes.transparent}></div>
            <div className={classes.icon}></div>
            {data.contexts[selectTag]}
          </div>
          <div className={classes.listWrapper}>
            {data.years.map((each, idx) => {
              return (
                <div className={classes.eachWrapper} key={idx}>
                  <div className={classes.year}>{each}</div>
                  <div className={classes.tagWrapper}>
                    {data.data[idx].map((item, index) => {
                      return (
                        <a
                          key={index}
                          className={clsx(classes.item, {
                            [classes.blue]: item.color === 'blue',
                            [classes.cyan]: item.color === 'cyan',
                            [classes.secondaryBlue]: item.color === 'secondaryBlue',
                          })}
                          onClick={() => {
                            setSelectTag(Math.floor(Math.random() * data.contexts.length))
                          }}
                        >
                          {item.context}
                        </a>
                      )
                    })}

                    <div className={classes.spliter}></div>
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

export default Widget87
