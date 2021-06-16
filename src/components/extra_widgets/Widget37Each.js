import { makeStyles } from '@material-ui/core/styles'
import Triangle from 'components/basic_components/Triangle'
import { TriangleType, TriangleMode } from 'constants/common'
import HorizontalTripleSlider from 'components/processes/HorizontalTripleSlider'

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRight: `2px solid ${theme.palette.common.primaryText}`,
    '&:last-child': {
      borderRight: 'unset',
    },
    justifyContent: 'space-between',
    padding: '0 5px',
  },
  itemTitle: {
    letterSpacing: 0.35,
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 15,
  },
  itemValue: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.primaryText,
    letterSpacing: 1.2,
    fontSize: 50.5,
  },
  itemUnit: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.primaryText,
    fontSize: 35,
  },
  itemMeta: {
    letterSpacing: 1,
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 15,
    lineHeight: 1.3,
    textAlign: 'center',
    marginBottom: 5,
    height: 20,
    width: 150,
  },

  triangleWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    fontSize: 11,
    justifyContent: 'center',
  },
  equalLine: {
    marginTop: 5,
    height: 2,
    width: 20,
    backgroundColor: theme.palette.common.primaryCyan,
  },
  triangleLabel: {
    color: theme.palette.common.primaryText,
  },
  upGrowthValue: {
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.primaryRed,
    letterSpacing: 1,
  },
  downGrowthValue: {
    fontFamily: theme.typography.lightFontFamily,
    color: theme.palette.common.secondaryGreen,
    letterSpacing: 1,
  },
  growthInfo: {
    fontFamily: theme.typography.lightFontFamily,
    letterSpacing: 1,
  },
}))

const Widget37Each = ({
  title = null,
  value = null,
  meta = null,
  type = null,
  growth = null,
  growthInfo = null,
  growthValue = null,
  info = null,
  height = 130,
}) => {
  const classes = useStyles()

  if (!title) {
    return ''
  }

  return (
    <div className={classes.item} style={{ height: height, minWidth: 140 }}>
      <div className={classes.itemTitle}>{title}</div>
      {value && (
        <div className={classes.itemValue}>
          {value}
          <span className={classes.itemUnit}>%</span>
        </div>
      )}
      {(meta || value) && <div className={classes.itemMeta}>{meta} </div>}
      {growth && (
        <div className={classes.triangleWrapper}>
          {growth === 'equal' ? (
            <div className={classes.equalLine}></div>
          ) : (
            <Triangle
              type={growth}
              mode={growth === TriangleType.up ? TriangleMode.danger : TriangleMode.success}
              width={8}
              bottomWidth={10}
            />
          )}
          <div style={{ width: growth === TriangleType.down ? 5 : 10 }}></div>
          <div className={growth === 'up' ? classes.upGrowthValue : classes.downGrowthValue}>{growthValue}</div>
          <div style={{ width: 3 }}></div>
          <div className={classes.growthInfo}>{' ' + growthInfo}</div>
        </div>
      )}
      {info && (
        <div style={{ marginBottom: 30, width: '100%' }}>
          <HorizontalTripleSlider
            {...info}
            sticky={true}
            strokeWidth={2}
            sliderHeight={21}
            sliderWidth={2}
            pointSize={10}
            fontSize={10}
          />
        </div>
      )}
    </div>
  )
}

export default Widget37Each
