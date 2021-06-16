import HoverContext from 'contexts/HoverContext'
import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  wrapperImpairement: {
    position: 'relative',
    width: 'max-content',
    height: 'max-content',
  },

  wrapperCostofRisk: {
    position: 'relative',
    width: 'max-content',
    height: 'max-content',
  },

  root: {
    borderRadius: 5,
    border: `2px solid ${theme.palette.common.thirdBlue}`,
    backgroundColor: theme.palette.common.secondaryBlack,
    fontSize: 6,
    fontFamily: theme.typography.mediumFontFamily,
    padding: 3,
    display: 'flex',
    flexDirection: 'column',
    width: 188,
  },

  rootCyan: {
    border: `2px solid ${theme.palette.common.primaryCyan}`,
  },

  titleBlue: {
    borderBottom: `1px dashed ${theme.palette.common.thirdBlue}`,
    paddingBottom: 3,
    color: theme.palette.common.thirdBlue,
  },
  titleCyan: {
    borderBottom: `1px dashed ${theme.palette.common.primaryCyan}`,
    paddingBottom: 3,
    color: theme.palette.common.primaryCyan,
  },
  titlePurple: {
    borderBottom: `1px dashed ${theme.palette.common.secondaryBlue}`,
    paddingBottom: 3,
    color: theme.palette.common.secondaryBlue,
  },
  titleGreen: {
    borderBottom: `1px dashed ${theme.palette.common.primaryGreen}`,
    paddingBottom: 3,
    color: theme.palette.common.primaryGreen,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
  },
  companyText: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.thirdBlue,
    fontSize: 6,
    marginBottom: 3,
  },
  nearText: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryText,
    fontSize: 6,
    marginBottom: 3,
  },
  marketTopText: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.secondaryGreen,
    fontSize: 6,
    marginBottom: 3,
  },
  marketWorstText: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.primaryRed,
    fontSize: 6,
    marginBottom: 3,
  },
  calculation: {
    borderBottom: `1px dashed ${theme.palette.common.primaryCyan}`,
    display: 'flex',
    fontFamily: theme.typography.lightFontFamily,
    justifyContent: 'space-between',
  },
  formulaWrapper: {
    width: 45,
    paddingTop: 3,
    paddingBottom: 3,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    textAlign: 'center',
  },
  formular: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: 5,
    fontFamily: theme.typography.lightFontFamily,
  },
  formularTextBold: {
    fontFamily: theme.typography.mediumFontFamily,
  },
  equal: {
    display: 'flex',
    alignItems: 'center',
    width: 7,
    fontSize: 12,
    fontFamily: theme.typography.mediumFontFamily,
  },
  formularSpliter: {
    height: 0.5,
    backgroundColor: theme.palette.common.primaryText,
    width: '100%',
  },
  formularValue: {
    height: 40,
    fontSize: 12,
    fontFamily: theme.typography.mediumFontFamily,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  linkSVG: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  linkPath: {
    strokeWidth: 2.5,
    stroke: theme.palette.common.thirdBlue,
    fill: 'transparent',
  },
  linkCyan: {
    stroke: theme.palette.common.primaryCyan,
  },
}))

const PriceTableHover = () => {
  const classes = useStyles()

  const { hoverType, hoverInfo } = useContext(HoverContext)

  if (hoverType === 'Not on') return <></>

  if (hoverType === 'Impairment charge (£m)')
    return (
      <div className={classes.wrapperImpairement}>
        <div className={classes.root}>
          <div className={classes.titleBlue}>Impairement Charge</div>
          <div className={classes.body}>
            <div className={classes.companyText}>
              <span>Company {hoverInfo.year}</span>
              {hoverInfo.marketPrice.toFixed(1)}
            </div>
            <div className={classes.nearText}>
              <span>Nearest Competitor {hoverInfo.year}</span>
              {hoverInfo.near_comp.toFixed(1)}
            </div>
            <div className={classes.marketTopText}>
              <span>Market Top Performer {hoverInfo.year}</span>
              {hoverInfo.tp_mark.toFixed(1)}
            </div>
            <div className={classes.marketWorstText}>
              <span>Market Worst Performer {hoverInfo.year}</span>
              {hoverInfo.bt_mark.toFixed(1)}
            </div>
          </div>
        </div>
        <svg width={20} height={12} viewBox={`0,0,20,5`} className={classes.linkSVG}>
          <path className={clsx(classes.linkPath)} d={`m 0 10, L 20 5`}></path>
        </svg>
      </div>
    )

  if (hoverType === 'Cost of Risk')
    return (
      <div className={classes.wrapperCostofRisk}>
        <div className={clsx(classes.root, classes.rootCyan)}>
          <div className={classes.titleCyan}>Cost of Risk</div>
          <div className={classes.calculation}>
            <div className={classes.formulaWrapper}>
              <div className={classes.formular}>
                <div className={classes.formularTextBold}>Formula</div>
                <div>Impairment Charge</div>
                <div className={classes.formularSpliter}></div>
                <div>OutStanding Balances</div>
              </div>
              <div className={classes.equal}>=</div>
            </div>

            <div className={classes.formulaWrapper} style={{ width: 60 }}>
              <div className={classes.formular}>
                <div className={classes.formularTextBold}> Company {hoverInfo.year}</div>
                <div>£{hoverInfo.marketPrice.toFixed(1)}m</div>
                <div className={classes.formularSpliter}></div>
                <div>£{hoverInfo.outstandingBalances.toFixed(1)}bn</div>
              </div>
              <div className={classes.equal}>=</div>
            </div>

            <div className={classes.formularValue}>{hoverInfo.marketPrice.toFixed(2)}%</div>
          </div>
          <div className={classes.body}>
            <div className={classes.companyText}>
              <span>Company {hoverInfo.year}</span>
              {hoverInfo.marketPrice.toFixed(2)}%
            </div>
            <div className={classes.nearText}>
              <span>Nearest Competitor {hoverInfo.year}</span>
              {hoverInfo.near_comp.toFixed(2)}%
            </div>
            <div className={classes.marketTopText}>
              <span>Market Top Performer {hoverInfo.year}</span>
              {hoverInfo.tp_mark.toFixed(2)}%
            </div>
            <div className={classes.marketWorstText}>
              <span>Market Worst Performer {hoverInfo.year}</span>
              {hoverInfo.bt_mark.toFixed(2)}%
            </div>
          </div>
        </div>
        <svg width={20} height={12} viewBox={`0,0,20,5`} className={classes.linkSVG}>
          <path className={clsx(classes.linkPath, classes.linkCyan)} d={`m 0 10, L 20 5`}></path>
        </svg>
      </div>
    )

  return <></>
}

export default PriceTableHover
