import React from 'react'
import clsx from 'clsx'
import { ColorMode } from 'constants/common'
import styles from './VerticalProgressBar.module.scss'

const VerticalProgressBar = ({
  color = ColorMode.primary,
  height = 40,
  width,
  highlightTop = true,
  values = [],
}) => {
  return (
    <div
      className={clsx(styles.verticalProgressBarWrapper, {
        [styles.primary]: color === ColorMode.primary,
        [styles.cyan]: color === ColorMode.cyan,
      })}
      style={{ width: `${width}px` }}
    >
      {values.map((value, idx) => (
        <div
          className={clsx(styles.verticalProgress, {
            [styles.halfTop]: (idx < values.length / 2) && highlightTop,
          })}
          style={{ height: `${height}px` }}
          key={`vertical-${idx}`}
        >
          {value.toLocaleString()}
        </div>
      ))}
    </div>
  )
}

export default VerticalProgressBar
