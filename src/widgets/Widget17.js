import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import TripleSlider from 'components/processes/TripleSlider'

import { CardMode, DefaultComponentTitleSize } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  title: {
    display: 'flex',
    fontFamily: theme.typography.boldontFamily,
    fontSize: DefaultComponentTitleSize,
    flex: 1,
    // color: theme.palette.common.primaryBorder,
  },
  titleWrapper: {
    display: 'flex',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
  },
  tags: {
    display: 'flex',
  },
  tag: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 14,
    borderRight: `1px solid ${theme.palette.common.secondaryText}`,
    padding: '0 5px',
    '&:last-child': {
      borderRight: 'unset',
      paddingRight: 'unset',
    },
  },
  worst: {
    color: theme.palette.common.primaryRed,
  },
  best: {
    color: theme.palette.common.secondaryGreen,
  },
  business: {
    color: theme.palette.common.primaryBlue,
  },
  bodyWrapper: {
    display: 'flex',
    flex: 1,
    height: 'auto',
    width: '100%',
    alignItems: 'center',
  },
  body: {
    marginTop: 20,
  },
  sliderWrapper: {
    padding: '0 20px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sliderTitle: {
    textAlign: 'center',
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 18,
    marginTop: 20,
    padding: '0 5px',
    color: theme.palette.common.secondaryText,
  },
}))

const Widget17 = ({ topic = 'widget-17', style = {} }) => {
  const { title, tags, data } = useNodeRed(topic)
  const classes = useStyles()

  if (!data) {
    return ''
  }

  return (
    <DashboardCard mode={CardMode.auto} style={{ ...style, padding: 10, paddingBottom: 20 }}>
      <Grid container direction="column" justify="flex-start" alignItems="flex-start">
        <div className={classes.titleWrapper}>
          <div className={classes.title}>{title}</div>
          <div className={classes.tags}>
            {tags.map((tag, index) => {
              return (
                <div
                  className={clsx(classes.tag, {
                    [classes.business]: tag.status === 'business',
                    [classes.worst]: tag.status === 'worst',
                    [classes.best]: tag.status === 'best',
                  })}
                  key={`tag-${index}`}
                >
                  {tag.value}
                </div>
              )
            })}
          </div>
        </div>
        <div className={classes.bodyWrapper}>
          <Grid className={classes.body} container justify="flex-start" alignItems="flex-start" wrap="nowrap">
            {data.map((info, index) => {
              return (
                <div className={classes.sliderWrapper} key={`info-${index}`}>
                  <TripleSlider {...info} />
                  <div className={classes.sliderTitle}>{info.title}</div>
                </div>
              )
            })}
          </Grid>
        </div>
      </Grid>
    </DashboardCard>
  )
}

export default Widget17
