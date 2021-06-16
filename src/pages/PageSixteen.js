import React, { useState, useEffect, useContext } from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import PageContext from 'contexts/PageContext'
import useWindowSize from 'hooks/useWindowSize'

import Widget69 from 'widgets/Widget69'
import Widget70 from 'widgets/Widget70'
import Widget71 from 'widgets/Widget71'
import Widget72 from 'widgets/Widget72'
import Widget73 from 'widgets/Widget73'
import Widget74 from 'widgets/Widget74'

const PageSixteen = () => {
  const { setPageTitle } = useContext(PageContext)
  const [zoom, setZoom] = useState(1)
  const windowSize = useWindowSize()
  const matches = useMediaQuery('(min-width:600px)')

  const DefaultPageSize = {
    PageWidth: 1200,
    PageHeight: 800,
  }

  useEffect(() => {
    setPageTitle('Board Composition')
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
          <Widget69 width={716} height={145} />
          <div style={{ height: 8 }}></div>
          <Widget70 width={716} height={352} />
          <div style={{ display: 'flex', marginTop: 10, justifyContent: 'space-between', width: '100%' }}>
            <Widget71 width={191} height={265} />
            <Widget73 width={315} height={265} />
            <Widget71 width={191} height={265} topic="topic-71-1" />
          </div>
        </Grid>
        <Grid
          container
          justify="flex-start"
          direction="column"
          alignItems="flex-start"
          style={{ width: 468, marginLeft: 7 }}
        >
          <Widget72 width={468} height={507} topic={'topic-72'} />
          <div style={{ height: 10 }}></div>
          <Widget74 width={468} height={265} />
        </Grid>
      </Grid>
    </>
  )
}

export default PageSixteen
