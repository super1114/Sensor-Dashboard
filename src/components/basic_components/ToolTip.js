import React, { useContext } from 'react'
import ToolTipContext from '../../contexts/ToolTipContext'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  toolTipWrapper: {
    position: 'absolute',
    letterSpacing: 0.3,
    fontSize: 12,
    fontFamily: theme.typography.lightFontFamily,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },

  toolTipBgDefault: {
    color: '#fff',
    background: '#222',
    border: '1px solid transparent',
    borderRadius: 3,
    padding: '8px 21px',
    transition: 'opacity 0.3s ease-out',
  },
}))

const ToolTip = ({ bgColor = 'default', position = 'top' }) => {
  const classes = useStyles()
  const { content, xPos, yPos, shown, zoom } = useContext(ToolTipContext)

  if (!shown) return null

  return (
    <div
      className={clsx(classes.toolTipWrapper, {
        [classes.toolTipBgDefault]: bgColor === 'default',
      })}
      style={{
        top: position === 'top' ? yPos - 35 : yPos,
        left: xPos,
        transform: `translateX(-50%) scale(${zoom})`,
      }}
    >
      {content}
    </div>
  )
}

export default ToolTip
