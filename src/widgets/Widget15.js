import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import Matrix10x10 from 'components/charts/Matrix10x10'
import { CardMode } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 10,
    fontFamily: theme.typography.lightFontFamily,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: 1540,
  },
  row: {
    height: 20,
    display: 'flex',
    alignItems: 'center',
  },
  year: {
    width: 50,
    height: '100%',
    borderRight: '1px solid #fff',
  },
  data: {
    fontFamily: theme.typography.lightFontFamily,
    margin: '0 5px',
  },
}))

const Widget15 = () => {
  const payload = useNodeRed('widget-15')
  const classes = useStyles()

  return (
    <DashboardCard mode={CardMode.auto} style={{ paddingLeft: 30, paddingBottom: 0, marginTop: 20 }}>
      {Array.isArray(payload) ? (
        <div className={classes.root}>
          {payload.map((matrix, idx) => {
            return <Matrix10x10 {...matrix} key={`matrix-${idx}`} />
          })}
        </div>
      ) : (
        ''
      )}
    </DashboardCard>
  )
}

export default Widget15
