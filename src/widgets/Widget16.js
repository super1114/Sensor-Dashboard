import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import InfoIcon from 'components/Icons/InfoIcon'

import { CardMode, DefaultComponentTitleSize } from 'constants/common'

import useNodeRed from 'hooks/useNodeRed'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 5,
    display: 'flex',
    flexWrap: 'wrap',
    width: 558,
    minWidth: 500,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    fontSize: DefaultComponentTitleSize,
    marginLeft: 10,
    marginBottom: 10,
    // color: theme.palette.common.primaryBorder,
  },
  subtitle: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 22,
    color: theme.palette.common.secondaryText,
  },
  value: {
    fontFamily: theme.typography.semiBoldFontFamily,
    fontSize: 60,
    margin: `5px 0`,
  },
  affix: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 45,
  },
  description: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 16,
    color: theme.palette.common.secondaryText,
    whiteSpace: 'pre-line',
    padding: '0 5px',
  },
  meta: {
    fontFamily: theme.typography.lightFontFamily,
    fontSize: 16,
    color: theme.palette.common.secondaryText,
    height: 80,
    display: 'flex',
    alignItems: 'center',
  },
  metaInfoWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 25,
  },
  metaInfo: {
    textAlign: 'left',
    fontSize: 18,
  },
  divider: {
    border: `1px solid ${theme.palette.common.secondaryText}`,
    margin: '5px 0',
    width: 120,
  },
  link: {
    width: 30,
    height: 30,
    minWidth: 30,
    margin: '0 15px',
    borderRadius: 15,
    background: theme.palette.common.primaryBlue,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    '& > div': {
      textAlign: 'center',
    },
  },
}))

const Widget16 = () => {
  const payload = useNodeRed('widget-16')
  const classes = useStyles()

  if (!Array.isArray(payload)) {
    return ''
  }

  return (
    <div className={classes.root}>
      {payload.map(({ title, subtitle, value, description, meta, prefix, suffix }, idx) => {
        return (
          <DashboardCard
            mode={CardMode.auto}
            style={{ flex: '1 0 45%', height: 375, margin: '5px 7px 5px 5px', padding: 5, paddingTop: 10 }}
            key={`card-${idx}`}
          >
            <div className={classes.info}>
              <div className={classes.title}>{title}</div>
              <div className={classes.body}>
                <div className={classes.subtitle}>{subtitle}</div>
                <div className={classes.value}>
                  <span className={classes.affix}>{prefix}</span>
                  {value}
                  <span className={classes.affix}>{suffix}</span>
                </div>
                <div className={classes.description}>{description}</div>
                <div className={classes.meta}>
                  <div className={classes.link}>
                    <InfoIcon width="20px" height="20px" />
                  </div>
                  <div className={classes.metaInfoWrapper}>
                    <div className={classes.divider}></div>
                    <div className={classes.metaInfo}>{meta}</div>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
        )
      })}
    </div>
  )
}

export default Widget16
