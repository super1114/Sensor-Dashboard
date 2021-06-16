import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import Triangle from 'components/basic_components/Triangle'

import { CardMode, DefaultComponentTitleSize, TriangleSize } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-around',
    width: '100%',
    // width: 400,
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    letterSpacing: 1.1,
    fontSize: DefaultComponentTitleSize,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  content: {
    fontFamily: theme.typography.semiBoldFontFamily,
    fontSize: 80,
  },
  unit: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 60,
  },
  descriptionWrapper: {
    display: 'flex',
  },
  description: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 16,
    marginLeft: 10,
  },
}))

const Widget14 = ({ style = {}, width = 350, height = 'auto' }) => {
  const { title, content, description } = useNodeRed('widget-14')
  const classes = useStyles()

  if (!title) {
    return ''
  }

  return (
    <DashboardCard mode={CardMode.auto} style={{ ...style, paddingTop: 5 }}>
      <div className={classes.root} style={{ width: width, height: height }}>
        <div className={classes.title}>{title}</div>
        <div className={classes.body}>
          <div className={classes.content}>
            {content}
            <span className={classes.unit}>p</span>
          </div>
          <div className={classes.descriptionWrapper}>
            <Triangle {...TriangleSize} />
            <span className={classes.description}>{description}</span>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget14
