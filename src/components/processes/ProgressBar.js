import React from 'react'
import clsx from 'clsx'

import { ColorMode, TextMode, RowHeight } from 'constants/common'

import styles from './ProgressBar.module.scss'

const ProgressBar = ({
  color = ColorMode.primary,
  height = 10,
  width,
  progress,
  value,
  mode = TextMode.separate,
}) => {
  const progressText = <div className={styles.progressBarText}>{value}</div>
  return (
    <div
      className={styles.progressBarItem}
      style={{ height: `${RowHeight}px` }}
    >
      <div
        className={clsx(styles.progressBarWrapper, {
          [styles.primary]: color === ColorMode.primary,
          [styles.cyan]: color === ColorMode.cyan,
        })}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div className={styles.progress} style={{ width: `${progress}%` }}>
          {mode === TextMode.inner && progressText}
        </div>
        {mode === TextMode.outer && progressText}
      </div>
      {mode === TextMode.separate && progressText}
    </div>
  )
}

export default ProgressBar
