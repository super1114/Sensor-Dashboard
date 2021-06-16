import React from 'react'

import Triangle from 'components/basic_components/Triangle'
import { TriangleMode, TriangleType } from 'constants/common'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  eachTriangle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },

  cyanSlider: {
    backgroundColor: theme.palette.common.primaryCyan,
    height: 1,
    width: 18,
    left: 1,
    top: 110,
  },
}))

const PBTTriangle = ({
  growth = TriangleType.up,
  value = 0,
  triangleBottomWidth = 10,
  triangleWidth = 8.5,
  height = 36,
  width = 20,
}) => {
  const classes = useStyles()

  if (value !== 0)
    return (
      <div
        className={classes.eachTriangle}
        style={{
          width: width,
          height: height,
        }}
      >
        <Triangle
          type={TriangleType.up}
          mode={growth === TriangleType.up ? TriangleMode.success : TriangleMode.danger}
          width={triangleWidth}
          bottomWidth={triangleBottomWidth}
        />
        <div style={{ height: 3 }}></div>
        {value.toFixed(1)}
      </div>
    )

  return (
    <div
      className={classes.eachTriangle}
      style={{
        width: width,
        height: height - 7,
        paddingTop: 7,
      }}
    >
      <div className={classes.cyanSlider}></div>-
    </div>
  )
}

export default PBTTriangle
