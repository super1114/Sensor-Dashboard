import React, { useState, useEffect, useContext } from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import PageContext from 'contexts/PageContext'
import useWindowSize from 'hooks/useWindowSize'

import Widget59 from 'widgets/Widget59'
import Widget61 from 'widgets/Widget61'
import Widget62 from 'widgets/Widget62'
import Widget63 from 'widgets/Widget63'
import Widget64 from 'widgets/Widget64'

const PageFourteen = () => {
  const { setPageTitle } = useContext(PageContext)
  const [zoom, setZoom] = useState(1)
  const windowSize = useWindowSize()
  const matches = useMediaQuery('(min-width:600px)')

  const DefaultPageSize = {
    PageWidth: 1180,
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
          <Widget61 width={520} height={458} />

          <Grid container direction="row" justify="space-between" style={{ display: 'flex', width: 520 }}>
            <Grid directoin="column" style={{ width: 206 }}>
              <Widget59
                width={206}
                height={131}
                betweenSpace={8}
                splitBarWidth={50}
                fontSize={7}
                titleFontSize={10}
                textColor={'blue'}
                topic={'topic-59-1'}
              />
              <Widget59
                width={206}
                height={183}
                fontSize={7}
                titleFontSize={10}
                betweenSpace={6.5}
                splitBarWidth={50}
                textColor={'cyan'}
                topic={'topic-59-2'}
              />
            </Grid>
            <Grid directoin="column" style={{ width: 305 }}>
              <Widget62 width={305} height={324}></Widget62>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justify="flex-start"
          direction="column"
          alignItems="flex-start"
          style={{ width: 634, marginLeft: 10 }}
        >
          <Widget63 width={634} height={422}></Widget63>
          <Widget64 width={634} height={360}></Widget64>
        </Grid>
      </Grid>
    </>
  )
}

export default PageFourteen
