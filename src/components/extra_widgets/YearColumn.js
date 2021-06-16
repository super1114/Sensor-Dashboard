import React from 'react'
import { RowHeight } from 'constants/common'
import styles from './YearColumn.module.scss'

const YearColumn = ({ years = [], height = RowHeight }) => {
  return (
    <div className={styles.yearColumnWrapper}>
      {years.map((year, index) => (
        <div className={styles.year} style={{ height: `${height}px` }} key={`year-${index}`}>
          {year}
        </div>
      ))}
    </div>
  )
}

export default YearColumn
