import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.palette.common.primaryBlue,
    borderStyle: 'solid',
    padding: 10,
    width: 460,
    fontFamily: theme.typography.mediumFontFamily,
    display: 'flex',
    flexDirection: 'column',
    fontSize: 16,
    marginLeft: 20,
    marginRight: 20,
  },
  row: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  year: {
    width: 50,
    height: '100%',
    borderRight: '1px solid #fff',
    display: 'flex',
    alignItems: 'center',
  },
  data: {
    fontFamily: theme.typography.mediumFontFamily,
    letterSpacing: 0.6,
    margin: '0 5px',
  },
  first: {
    color: theme.palette.common.primaryBlue,
  },
  second: {
    color: theme.palette.common.primaryCyan,
  },
  third: {
    color: theme.palette.common.secondaryBlue,
  },
  fourth: {
    color: theme.palette.common.primaryGreen,
  },
}))

const Widget12 = () => {
  const payload = useNodeRed('widget-12')
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {payload.rows &&
        payload.rows.map((row, idx) => {
          return (
            <div className={classes.row} key={`row-${idx}`}>
              <div className={classes.year}>{row}</div>
              {payload.data[idx].map((el, index) => {
                return (
                  <div
                    className={clsx(classes.data, {
                      [classes.first]: index === 0,
                      [classes.second]: index === 1,
                      [classes.third]: index === 2,
                      [classes.fourth]: index === 3,
                    })}
                    key={`row-${idx}-${index}`}
                  >
                    {el}
                  </div>
                )
              })}
            </div>
          )
        })}
    </div>
  )
}

export default Widget12
