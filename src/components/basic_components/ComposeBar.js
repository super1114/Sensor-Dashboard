import React from 'react'
import clsx from 'clsx'
import { RowHeight } from 'constants/common'
import { sumUpArray } from 'utils/common'
import styles from './ComposeBar.module.scss'

export const BarMode = {
  outer: 'outer',
  inner: 'inner',
}

const ComposeBar = ({ data, height = 30, rowHeight = RowHeight, width = 400, mode = BarMode.inner }) => {
  return (
    <div className={styles.composeBarContainer}>
      <div className={styles.composeBarWrapper} style={{ width: `${width}px` }}>
        {data &&
          data.map((row, index) => {
            const total = sumUpArray(row)
            const percentage = row.map(el => (el * 100) / total)

            return (
              <div className={styles.composeBarRow} key={`row-${index}`} style={{ height: `${rowHeight}px` }}>
                {row.map((cell, idx) => {
                  return (
                    <div
                      className={clsx(styles.composeBarCell, {
                        [styles.blue]: idx === 0,
                        [styles.cyan]: idx === 1,
                        [styles.purple]: idx === 2,
                        [styles.green]: idx === 3,
                      })}
                      style={{ height: `${height}px`, width: `${percentage[idx]}%` }}
                      key={`compose-bar-${index}-${idx}`}
                    >
                      {mode === BarMode.inner || idx < 3
                        ? cell.toLocaleString(undefined, { maximumFractionDigits: 1 })
                        : ''}
                    </div>
                  )
                })}
              </div>
            )
          })}
        <div className={styles.percentageBar}>
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
      {mode === BarMode.outer && (
        <div className={styles.composeBarLastColumn}>
          {data &&
            data.map((row, index) => {
              return (
                <div
                  className={styles.composeBarCell}
                  style={{ height: `${rowHeight}px` }}
                  key={`last-column-${index}`}
                >
                  {row[row.length - 1].toLocaleString(undefined, { maximumFractionDigits: 1 })}
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default ComposeBar
