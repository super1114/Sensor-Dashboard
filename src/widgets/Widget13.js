import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import HorizontalTripleSlider from 'components/processes/HorizontalTripleSlider'

import { CardMode, DefaultComponentTitleSize } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 620,
    height: '100%',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.primaryText,
    fontSize: DefaultComponentTitleSize,
    marginLeft: 5,
  },
  body: {
    display: 'flex',
    marginTop: 20,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10px 10px',
    borderRight: `2px solid ${theme.palette.common.primaryText}`,
    '&:last-child': {
      borderRight: 'unset',
    },
  },
  itemTitle: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.secondaryText,
    fontSize: 20,
  },
  itemValue: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.primaryText,
    fontSize: 65,
  },
  itemUnit: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.primaryText,
    fontSize: 42,
  },
  itemMeta: {
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.secondaryText,
    fontSize: 14,
    lineHeight: 1.3,
    textAlign: 'center',
    marginBottom: 5,
  },
}))

const Widget13 = ({ width = 620, topic = 'widget-13' }) => {
  const { title, data } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) {
    return ''
  }

  return (
    <DashboardCard mode={CardMode.auto} style={{ padding: 10, marginLeft: 5, paddingBottom: 20 }}>
      <div className={classes.root} style={{ width: width }}>
        <div className={classes.title}>{title}</div>
        <div className={classes.body}>
          {data.map(({ title, value, meta, info }, index) => {
            return (
              <div className={classes.item} key={`item-${index}`}>
                <div className={classes.itemTitle}>{title}</div>
                <div className={classes.itemValue}>
                  {value}
                  <span className={classes.itemUnit}>%</span>
                </div>
                <div className={classes.itemMeta}>{meta}</div>
                <HorizontalTripleSlider {...info} sticky={true} />
              </div>
            )
          })}
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget13
