import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: theme.typography.lightFontFamily,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 16,
    width: 270,
    margin: '10px 15px 40px',
  },
  matrix: {
    display: 'flex',
    marginTop: 5,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  cell: {
    width: 19.5,
    height: 19.5,
    borderRadius: 10,
    background: theme.palette.common.secondaryCardBackground,
    margin: '0 4.5px 4.5px 0',
  },
  blue: {
    background: theme.palette.common.primaryBlue,
  },
  cyan: {
    background: theme.palette.common.primaryCyan,
  },
  title: {
    textAlign: 'center',
    color: theme.palette.common.secondaryText,
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 24,
    wordBreak: 'break-all',
  },
  row: {
    display: 'flex',
  },
  year: {
    color: theme.palette.common.secondaryText,
    fontSize: 16,
    transform: 'Rotate(-60deg) translate(5px, -5px)',
    width: 24,
  },
}))

const Matrix10x10 = ({ title = '', data, rows }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        {rows.map((row, idx) => {
          return (
            <div className={classes.year} key={`row-${idx}`}>
              {row}
            </div>
          )
        })}
      </div>
      <div className={classes.matrix}>
        {data.map((column, idx) => {
          return (
            <div className={classes.column} key={`column-${idx}`}>
              {column.map((cell, index) => {
                return (
                  <div
                    className={clsx(classes.cell, {
                      [classes.blue]: cell > 0 && index + 1 === column.length,
                      [classes.cyan]: cell > 0 && index + 1 < column.length,
                    })}
                    key={`cell-${idx}-${index}`}
                  ></div>
                )
              })}
            </div>
          )
        })}
      </div>
      <div className={classes.title}>{title}</div>
    </div>
  )
}

export default Matrix10x10
