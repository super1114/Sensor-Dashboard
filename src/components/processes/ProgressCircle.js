import React from 'react'
import clsx from 'clsx'

import { ColorMode, RowHeight } from 'constants/common'

import styles from './ProgressCircle.module.scss'

const ProgressCircle = ({ color = ColorMode.primary, size = 30, scale = 1, progress, value }) => {
  return (
    <div className={styles.progressCircleItem} style={{ height: `${RowHeight}px` }}>
      <div
        className={clsx(styles.progressCircleWrapper, {
          [styles.primary]: color === ColorMode.primary,
          [styles.cyan]: color === ColorMode.cyan,
        })}
        style={{ width: `${size * scale}px`, height: `${size * scale}px` }}
      >
        <div className={styles.progress} style={{ width: `${progress}%`, height: `${progress}%` }}></div>
      </div>
      <div className={styles.progressCircleText}>{value}</div>
    </div>
  )
}

export default ProgressCircle
