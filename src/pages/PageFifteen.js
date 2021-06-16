import React, { useState, useEffect, useContext } from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import PageContext from 'contexts/PageContext'
import useWindowSize from 'hooks/useWindowSize'

import Widget41 from 'widgets/Widget41'
import Widget65 from 'widgets/Widget65'
import Widget66 from 'widgets/Widget66'
import Widget67 from 'widgets/Widget67'
import Widget68 from 'widgets/Widget68'

import { makeStyles } from '@material-ui/core/styles'
import PriceTableHover from 'components/basic_components/PriceTableHover'
import HoverContext from 'contexts/HoverContext'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },

  hover: {
    position: 'absolute',
    top: 100,
    right: 100,
  },
}))

const PageFifteen = () => {
  const { setPageTitle } = useContext(PageContext)
  const [zoom, setZoom] = useState(1)
  const windowSize = useWindowSize()
  const matches = useMediaQuery('(min-width:600px)')

  const classes = useStyles()

  const DefaultPageSize = {
    PageWidth: 1180,
    PageHeight: 800,
  }
  const { hoverIndex, hoverType } = useContext(HoverContext)

  const getPos = () => {
    let pos = {
      x: 0,
      y: 0,
    }
    if (hoverIndex !== 'Not on') pos.x = hoverIndex * 47 + 500
    if (hoverType === 'Impairment charge (£m)') pos.y = 67
    if (hoverType === 'Cost of Risk') pos.y = 120
    return pos
  }

  useEffect(() => {
    setPageTitle('Shareholders & Dividends')
    const zoomWidthLevel = (windowSize.width - 48) / DefaultPageSize.PageWidth
    const zoomHeightLevel = (windowSize.height - 48 - (matches ? 60 : 48)) / DefaultPageSize.PageHeight
    setZoom(Math.min(zoomWidthLevel, zoomHeightLevel))
  }, [])

  useEffect(() => {
    const zoomWidthLevel = (windowSize.width - 48) / DefaultPageSize.PageWidth
    const zoomHeightLevel = (windowSize.height - 48 - (matches ? 60 : 48)) / DefaultPageSize.PageHeight
    setZoom(Math.min(zoomWidthLevel, zoomHeightLevel))
  }, [windowSize, matches])

  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        style={{
          width: DefaultPageSize.PageWidth,
          position: 'absolute',
          transform: `translateX(-50%) scale(${zoom})`,
          left: '50%',
          transformOrigin: 'top',
        }}
      >
        <Grid
          container
          justify="space-between"
          alignItems="center"
          direction="column"
          style={{ width: 'auto', height: 'auto' }}
        >
          <Widget65 width={570} height={342} />
          <Widget66 width={586} height={151} />
          <Widget68 width={586} height={266} topic="topic-68" />
        </Grid>

        <Grid container justify="flex-start" direction="column" alignItems="flex-start" style={{ width: 590 }}>
          <Widget41 width={570} height={565} topic={'topic-41-1'} titleWidth={85} titleMargin={-10} />
          <div style={{ height: 214, width: 590, display: 'flex', justifyContent: 'space-between', marginLeft: 8 }}>
            <Widget67 topic={'topic-67-1'} height={214} width={190} />
            <Widget67 topic={'topic-67-2'} height={214} width={190} />
            <Widget67 topic={'topic-67-3'} height={214} width={190} />
          </div>
        </Grid>

        <div
          className={classes.hover}
          style={{
            top: getPos().y,
            left: getPos().x,
            position: 'absolute',
          }}
        >
          <PriceTableHover />
        </div>
      </Grid>
    </>
  )
}

export default PageFifteen
