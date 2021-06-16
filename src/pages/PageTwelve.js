import React, { useState, useEffect, useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import PageContext from 'contexts/PageContext'
import useWindowSize from 'hooks/useWindowSize'

import Widget53 from 'widgets/Widget53'
import Widget28 from 'widgets/Widget28'
import Widget54 from 'widgets/Widget54'
import Widget55 from 'widgets/Widget55'
import Widget56 from 'widgets/Widget56'

const useStyles = makeStyles(theme => ({
  grid: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'stretch',
  },
  gridVertical: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  gridHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: 455,
    justifyContent: 'space-between',
  },
}))

const PageTwelve = () => {
  const classes = useStyles()
  const { setPageTitle } = useContext(PageContext)

  const [zoom, setZoom] = useState(1)
  const windowSize = useWindowSize()
  const matches = useMediaQuery('(min-width:600px)')

  const DefaultPageSize = {
    PageWidth: 1260,
    PageHeight: 850,
  }

  useEffect(() => {
    const zoomWidthLevel = (windowSize.width - 48) / DefaultPageSize.PageWidth
    const zoomHeightLevel = (windowSize.height - 48 - (matches ? 60 : 48)) / DefaultPageSize.PageHeight
    setPageTitle('Consolidated Balance Sheet')
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
            <Widget53 width={550} height={510} />
            <Widget28 width={50} height={520} topic={'topic-28-1'} />
            <Widget53 topic={'topic-53-1'} width={550} height={510} />
          </div>
        </Grid>
        <Grid container justify="flex-start" alignItems="center">
          <Widget54 width={265} height={272} topic={'topic-54'} />
          <Widget55 width={306} height={272} />
          <Widget55 width={306} height={272} topic={'topic-55-1'} />
          <Widget56 width={307} height={272} topic={'topic-56'} />
        </Grid>
      </Grid>
    </>
  )
}

export default PageTwelve
