import { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CachedIcon from '@material-ui/icons/Cached'

import DashboardCard from 'components/basic_components/DashboardCard'

import { CardMode, DefaultComponentTitleSize } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'
import { Schedule, Person, Healing, ScreenShare, PanTool, Forum } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  header: {
    display: 'flex',
  },
  title: {
    fontFamily: theme.typography.boldFontFamily,
    fontSize: DefaultComponentTitleSize,
    color: theme.palette.common.primaryText,
    flex: 1,
    marginBottom: 10,
  },
  multiface: {
    marginLeft: 'auto',
    cursor: 'pointer',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
    '&:last-child': {
      marginBottom: 'unset',
    },
  },
  groupTitle: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.secondaryText,
    fontSize: 18,
  },
  items: {
    display: 'flex',
    marginTop: 5,
  },
  item: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: '5px 5px 10px 5px',
    // width: 100,
    marginRight: 10,
    background: theme.palette.common.secondaryCardBackground,
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.secondaryText,
    fontSize: 16,
    lineHeight: '16px',
    letterSpacing: 1.2,
    '&:last-child': {
      marginRight: 'unset',
    },
    textAlign: 'center',
    height: 95,
    cursor: 'pointer',
  },
  itemTitle: {
    whiteSpace: 'pre-line',
    height: 60,
    display: 'flex',
    alignItems: 'center',
  },
  blue: {
    color: theme.palette.common.primaryBlue,
  },
  cyan: {
    color: theme.palette.common.primaryCyan,
  },
  green: {
    color: theme.palette.common.primaryGreen,
  },
}))

const Widget18 = ({ style = {} }) => {
  const { title, data } = useNodeRed('widget-18')
  const classes = useStyles()
  const [face, setFace] = useState(0)

  if (!title || !data.length) {
    return ''
  }

  const updateFace = () => {
    setFace((face + 1) % data.length)
  }

  const icons = [
    [
      <Forum style={{ fontSize: 32 }} />,
      <PanTool style={{ fontSize: 32 }} />,
      <ScreenShare style={{ fontSize: 32 }} />,
    ],
    [<Person style={{ fontSize: 32 }} />, <Schedule style={{ fontSize: 32 }} />, <Healing style={{ fontSize: 32 }} />],
  ]

  const currentData = data[face]

  const onItemClick = link => {
    window.open(link, '_blank')
  }

  return (
    <DashboardCard mode={CardMode.auto} style={{ ...style, padding: 10 }}>
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.title}>{title}</div>
          <div className={classes.multiface}>
            <CachedIcon onClick={updateFace} style={{ fontSize: 32 }} />
          </div>
        </div>
        <div className={classes.body}>
          {currentData.map((group, index) => {
            return (
              <div className={classes.group} key={`group-${index}`}>
                <div className={classes.groupTitle}>{group.title}</div>
                <div className={classes.items}>
                  {group.items.map((item, idx) => {
                    return (
                      <div
                        className={clsx(classes.item, {
                          [classes.blue]: idx === 0,
                          [classes.cyan]: idx === 1,
                          [classes.green]: idx === 2,
                        })}
                        onClick={() => onItemClick(item.link)}
                        key={`item-${index}-${idx}`}
                      >
                        <div className={classes.itemTitle}>{item.title}</div>
                        {icons[index][idx]}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget18
