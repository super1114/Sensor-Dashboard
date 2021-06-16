import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import VerticalTripleSlider from 'components/processes/VerticalTripleSlider'

import { CardMode } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 8,
    padding: 5,
    letterSpacing: 1.5,
    width: '100%',
    height: 'auto',
    WebkitTextSizeAdjust: 'none',
  },
  title: {
    display: 'flex',
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: 10,
    letterSpacing: 0.83,
    lineHeight: '11.72px',
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
    marginTop: 3,
    marginRight: 10,
  },
  tag: {
    fontFamily: theme.typography.thinFontFamily,
    fontSize: 6,
    borderRight: `1px solid ${theme.palette.common.secondaryText}`,
    letterSpacing: 0.5,
    padding: '0 3px',
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
    marginLeft: -20,
    marginTop: 15,
    display: 'flex',
    flex: 1,
    height: 'auto',
    width: '100%',
    alignItems: 'center',
  },
  body: {},
  sliderWrapper: {
    padding: '0 20px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sliderTitle: {
    textAlign: 'center',
    fontFamily: theme.typography.thinFontFamily,
    fontSize: 10,
    letterSpacing: 0.83,
    lineHeight: '11.72px',
    padding: '0 5px',
    color: theme.palette.common.secondaryText,
  },
}))

const Widget78 = ({ topic = 'topic-78', style = {}, width = 255, height = 185 }) => {
  const { title, tags, data } = useNodeRed(topic)
  const classes = useStyles()

  if (!data) {
    return ''
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        margin: 0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 0,
        borderRadius: 8,
        width: width,
        height: height,
        flexDirection: 'column',
        overflow: 'initial',
      }}
    >
      <div className={classes.root}>
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
                  <VerticalTripleSlider {...info} height={83} />
                  <div style={{ height: 10 }}></div>
                  <div className={classes.sliderTitle}>{info.title}</div>
                </div>
              )
            })}
          </Grid>
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget78
