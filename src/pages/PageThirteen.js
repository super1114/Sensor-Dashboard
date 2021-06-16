import React, { useState, useEffect, useContext } from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import PageContext from 'contexts/PageContext'
import useWindowSize from 'hooks/useWindowSize'

import Widget57 from 'widgets/Widget57'
import Widget58 from 'widgets/Widget58'
import Widget59 from 'widgets/Widget59'
import Widget60 from 'widgets/Widget60'

const PageThirteen = () => {
  const { setPageTitle } = useContext(PageContext)
  const [zoom, setZoom] = useState(1)
  const windowSize = useWindowSize()
  const matches = useMediaQuery('(min-width:600px)')

  const DefaultPageSize = {
    PageWidth: 1180,
    PageHeight: 800,
  }

  useEffect(() => {
    setPageTitle('Market Risk')
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
          <Widget57 width={905} height={380} topic={'topic-57'} titleColor="blue" />
          <Widget57 width={905} height={380} topic={'topic-57-1'} titleColor="cyan" />
        </Grid>
        <Grid
          container
          justify="flex-start"
          direction="column"
          alignItems="flex-start"
          style={{ width: 250, marginLeft: 10 }}
        >
          <Grid
            container
            justify="space-between"
            direction="row"
            alignItems="center"
            style={{ width: 260, height: 258 }}
          >
            <Widget58 width={258} height={258}></Widget58>
            <Widget59 width={258} height={200}></Widget59>
            <Widget60 width={258} height={292}></Widget60>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default PageThirteen
