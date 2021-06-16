import React, { useState, useEffect, useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import PageContext from 'contexts/PageContext'
import useWindowSize from 'hooks/useWindowSize'

import Widget13 from 'widgets/Widget13'
import Widget14 from 'widgets/Widget14'
import Widget19 from 'widgets/Widget19'
import Widget20 from 'widgets/Widget20'
import Widget21 from 'widgets/Widget21'
import Widget22 from 'widgets/Widget22'
import Widget23 from 'widgets/Widget23'
import Widget24 from 'widgets/Widget24'
import Widget25 from 'widgets/Widget25'
import Widget26 from 'widgets/Widget26'

const useStyles = makeStyles(theme => ({
  grid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    letterSpacing: 1.5,
  },
}))

const PageFour = () => {
  const classes = useStyles()
  const { setPageTitle } = useContext(PageContext)

  const [zoom, setZoom] = useState(1)
  const windowSize = useWindowSize()
  const matches = useMediaQuery('(min-width:600px)')

  const DefaultPageSize = {
    PageWidth: 2500,
    PageHeight: 1600,
  }

  useEffect(() => {
    setPageTitle('Snapshot / Callout View - Option 1')
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
        direction="column"
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
        <Grid container justify="flex-start" alignItems="center">
          <div className={classes.grid}>
            <Grid container wrap="nowrap" justify="flex-start" alignItems="stretch">
              <Widget19 style={{
                width: 300
              }} />
              <Widget20 style={{
                width: 300
              }} />
            </Grid>
            <Grid container wrap="nowrap" justify="flex-start" alignItems="stretch">
              <Widget22 topic="widget-22-2" />
              <Widget22 />
            </Grid>
            <Widget24 />
          </div>
          <Widget21
            subtitle={"£m unless stated"}
          />
          <div className={classes.grid}>
            <Widget13 width={570} />
            <Widget23 />
            <Widget25 />
            <Grid container wrap="nowrap" justify="flex-start" alignItems="stretch">
              <Widget26 />
              <Widget14 width={285} />
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default PageFour
