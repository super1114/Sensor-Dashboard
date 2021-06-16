import { makeStyles } from '@material-ui/core/styles'

import DashboardCard from 'components/basic_components/DashboardCard'
import { CardMode } from 'constants/common'
import useNodeRed from 'hooks/useNodeRed'
import clsx from 'clsx'

const Widget60 = ({
  style = {},
  width = 400,
  height = 400,
  topic = 'topic-59',
  betweenSpace = 14,
  splitBarWidth = 111,
  textColor = 'blue',
  fontSize = 11,
  titleFontSize = 12.32,
}) => {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      fontSize: 8,
      padding: 5,
      WebkitTextSizeAdjust: 'none',
    },
    title: {
      fontFamily: theme.typography.mediumFontFamily,
      color: theme.palette.common.primaryText,
      fontSize: titleFontSize,
      lineHeight: `${titleFontSize * 1.1}px`,
      letterSpacing: (0.62 * titleFontSize) / 12,
      display: 'flex',
      alignItems: 'flex-end',
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'nowrap',
      width: '100%',
      textAlign: 'center',
    },
    content: {
      fontSize: fontSize,
      letterSpacing: fontSize / 11,
      lineHeight: `${fontSize * 1.1}px`,
      fontFamily: theme.typography.lightFontFamily,
      color: theme.palette.common.thirdBlue,
      position: 'relative',
      '&::after': {
        width: splitBarWidth,
        height: 0.5,
        bottom: 0,
        backgroundColor: theme.palette.common.primaryText,
        position: 'absolute',
        marginLeft: -(splitBarWidth / 2),
        left: '50%',
        content: `''`,
      },
      '&:last-child': {
        fontSize: fontSize,
        letterSpacing: fontSize / 11,
        lineHeight: `${fontSize * 1.1}px`,
        fontFamily: theme.typography.lightFontFamily,
        color: theme.palette.common.thirdBlue,
        position: 'relative',
        '&::after': {
          width: 0,
          height: 0,
          content: ``,
        },
      },
    },

    blueText: {
      color: theme.palette.common.thirdBlue,
    },
    cyanText: {
      color: `${theme.palette.common.primaryCyan} !important`,
    },
  }))

  const { title, data } = useNodeRed(topic)
  const classes = useStyles()

  if (!title) {
    return ''
  }

  return (
    <DashboardCard
      mode={CardMode.auto}
      style={{
        ...style,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 0,
        borderRadius: 8,
        width: width,
        height: height,
      }}
    >
      <div
        className={classes.root}
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <div className={classes.title}>{title}</div>
        <div className={classes.body}>
          {data.map((each, key) => {
            return (
              <div
                key={key}
                className={clsx(classes.content, {
                  [classes.blueText]: textColor === 'blue',
                  [classes.cyanText]: textColor === 'cyan',
                })}
                style={{ paddingTop: betweenSpace, paddingBottom: betweenSpace }}
              >
                {each}
              </div>
            )
          })}
        </div>
      </div>
    </DashboardCard>
  )
}

export default Widget60
