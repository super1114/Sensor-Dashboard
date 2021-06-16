import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import infoGreen from 'assets/icons/informGreen.svg'
import alertRed from 'assets/icons/alertRed.svg'
import femaleCyan from 'assets/icons/femaleCyan.svg'
import maleBlue from 'assets/icons/maleBlue.svg'

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    overflow: 'initial',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'initial',
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 33,
    overflow: 'initial',
    marginRight: 2,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 6.42,
    letterSpacing: 0.54,
  },
  informImg: {
    height: 8,
    width: 8,
  },
  year: {
    fontSize: 6.42,
    letterSpacing: 0.54,
    fontFamily: theme.typography.lightFontFamily,
  },

  members: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  member: {
    height: 8,
    width: 8,
  },

  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  svgLine: {
    strokeWidth: 0.3,
    stroke: theme.palette.common.primaryText,
  },
}))
const BoardEvolutionTable = ({ height = 207, width = 205, data = [] }) => {
  const classes = useStyles()

  let eachHeight = (height - 16) / data.length
  return (
    <div
      className={classes.wrapper}
      style={{
        height: height,
        width: width,
      }}
    >
      <div className={classes.row} style={{ height: 15 }}>
        <div className={classes.titleWrapper}></div>
        <div className={classes.title} style={{ width: 100 }}>
          {data[0].evolutions[0].title}
        </div>
        <div className={classes.title} style={{ width: 68 }}>
          {data[0].evolutions[1].title}
        </div>
        <div className={classes.title} style={{ width: 68 }}>
          {data[0].evolutions[2].title}
        </div>
      </div>

      {data.map((each, idx) => {
        return (
          <div className={classes.row} style={{ height: eachHeight }} key={idx}>
            <div className={classes.titleWrapper}>
              <div className={classes.year}>{each.year}</div>
              {each.check && (
                <img className={classes.informImg} src={infoGreen} alt="" width={7.67} height={7.67}></img>
              )}
              {each.danger && <img className={classes.informImg} src={alertRed} alt="" width={8} height={8}></img>}
            </div>

            <div className={classes.members} style={{ width: 102 }}>
              {each.evolutions[0].members.map((item, index) => {
                return (
                  <img key={index} className={classes.member} src={item === 'M' ? maleBlue : femaleCyan} alt=""></img>
                )
              })}
            </div>
            <div style={{ width: 4 }}></div>
            <div className={classes.members} style={{ width: 68 }}>
              {each.evolutions[1].members &&
                each.evolutions[1].members.map((item, index) => {
                  return (
                    <img key={index} className={classes.member} src={item === 'M' ? maleBlue : femaleCyan} alt=""></img>
                  )
                })}
            </div>
            <div style={{ width: 4 }}></div>
            <div className={classes.members} style={{ width: 68 }}>
              {each.evolutions[2].members &&
                each.evolutions[2].members.map((item, index) => {
                  return (
                    <img key={index} className={classes.member} src={item === 'M' ? maleBlue : femaleCyan} alt=""></img>
                  )
                })}
            </div>
          </div>
        )
      })}

      <svg
        className={classes.svg}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1={131} y1={15} x2={131} y2={height} className={classes.svgLine}></line>
        <line x1={198} y1={15} x2={198} y2={height} className={classes.svgLine}></line>
      </svg>
    </div>
  )
}

export default BoardEvolutionTable
