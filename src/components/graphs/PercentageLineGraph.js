import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    fontFamily: theme.typography.ultralightFontFamily,
    width: '100%',
  },
  path: {
    stroke: theme.palette.common.primaryBlue,
    fill: 'transparent',
  },
  title: {
    fontSize: 15,
  },
  outerCircle: {
    stroke: theme.palette.common.primaryBlue,
    strokeWidth: 3,
    fill: 'transparent',
  },
  innerCircle: {
    fill: theme.palette.common.primaryBlue,
  },
  text: {
    fill: theme.palette.common.secondaryText,
    fontFamily: theme.typography.ultralightFontFamily,
    letterSpacing: 1,
  },
  labeltext: {
    fill: theme.palette.common.secondaryText,
    fontFamily: theme.typography.lightFontFamily,
    letterSpacing: 0,
  }
}))

const LineGraph = ({
  edgeWidth = 150,
  outerRadius = 15,
  innerRadius = 10,
  strokeWidth = 3,
  fontSize = 30,
  fontSizeLabel = 20,
  height = 150,
  values = [],
  title = 'Market Share',
  labels = [],
}) => {
  const classes = useStyles()

  const maxVal = Math.max(...values)
  const minVal = Math.min(...values)
  const relVals = values.map(value => ((maxVal - value) * (height - fontSize - 30)) / (maxVal - minVal) + fontSize + outerRadius * 2)
  const paths = relVals.reduce((prev, cur, idx) => {
    if (prev.length === 0) {
      return `M ${outerRadius + strokeWidth + fontSize},${cur}`
    }

    return `${prev} L ${outerRadius + strokeWidth + edgeWidth * idx + fontSize},${cur}`
  }, '')

  return (
    <div className={classes.root}>
      <div className={classes.title}>{title}</div>
      <svg
        height={height}
        viewBox={`0 0 ${edgeWidth * values.length + outerRadius * 2} ${height + fontSize * 1.7}`}
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className={classes.path} d={paths} strokeWidth={3} />
        {relVals.map((val, idx) => {
          const x = outerRadius + strokeWidth + (edgeWidth) * idx
          return (
            <g key={`circle-${idx}`}>
              {
                idx >= 1 && idx <= relVals.length - 2 && val <= relVals[idx - 1] && val <= relVals[idx + 1]
                  ?
                  <>
                    <text className={classes.text} x={x} y={val - fontSize} fontSize={fontSize}>
                      {values[idx]}%
                      </text>
                    <circle className={classes.outerCircle} cx={x + fontSize} cy={val} r={outerRadius}></circle>
                    <circle className={classes.innerCircle} cx={x + fontSize} cy={val} r={innerRadius}></circle>
                  </>
                  :
                  <>
                    <circle className={classes.outerCircle} cx={x + fontSize} cy={val} r={outerRadius}></circle>
                    <circle className={classes.innerCircle} cx={x + fontSize} cy={val} r={innerRadius}></circle>
                    <text className={classes.text} x={x} y={val + outerRadius * 2 + fontSize} fontSize={fontSize}>
                      {values[idx]}%
                    </text>
                  </>
              }

              <text className={classes.labeltext} x={x + idx * 1} y={height + fontSize * 1.5} fontSize={fontSizeLabel}>
                {labels[idx]}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default LineGraph
