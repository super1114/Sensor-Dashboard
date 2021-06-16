import React from 'react'
import clsx from 'clsx'
import styles from './Column.module.scss'

const Column = ({ bordered = false, header, children }) => {
  return (
    <div className={styles.columnWrapper}>
      <div className={styles.columnHeader}>
        {header}
      </div>
      <div className={clsx(styles.columnBody, {
        [styles.bordered]: bordered
      })}>
        {children}
      </div>
    </div>
  )
}

export default Column
