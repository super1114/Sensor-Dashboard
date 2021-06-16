import React from 'react'
import clsx from 'clsx'
import { RowHeight } from 'constants/common'
import { sumUpArray } from 'utils/common'
import styles from './ComposeBarWithGrid.module.scss'

const ComposeBarWithGrid = ({ data, height = 30, rowHeight = RowHeight, width = 400 }) => {
  if (!data) {
    return null
  }

  const maxSum = Math.max(...data.map(row => sumUpArray(row))) + 50

  return (
    <div className={styles.composeGridBarContainer}>
      <div className={styles.composeGridBarWrapper} style={{ width: `${width}px` }}>
        {data.map((row, index) => {
          const total = sumUpArray(row)
          const percentage = row.map(el => (el * 100) / total)

          return (
            <div
              className={styles.composeGridBarRow}
              key={`row-${index}`}
              style={{ height: `${rowHeight}px`, width: `${(total / maxSum) * 100}%` }}
            >
              {row.map((cell, idx) => {
                return (
                  <div
                    className={clsx(styles.composeGridBarCell, {
                      [styles.blue]: idx === 0,
                      [styles.cyan]: idx === 1,
                      [styles.purple]: idx === 2,
                      [styles.green]: idx === 3,
                    })}
                    style={{ height: `${height}px`, width: `${percentage[idx]}%` }}
                    key={`compose-bar-${index}-${idx}`}
                  >
                    {cell.toLocaleString(undefined, { maximumFractionDigits: 1 })}
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
      <svg height="400" viewBox="0 0 400 400" width="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid20" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" stroke="gray" strokeWidth="1" fill="transparent"></path>
          </pattern>
        </defs>
        <rect stroke="gray" fill="#16103A" height="400" width="400" y="0" strokeWidth="1"></rect>
        <rect fill="url(#grid20)" height="400" width="400" y="0"></rect>
      </svg>
    </div>
  )
}

export default ComposeBarWithGrid
