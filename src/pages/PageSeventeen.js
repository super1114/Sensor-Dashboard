import React, { useState, useEffect, useContext } from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import PageContext from 'contexts/PageContext'
import useWindowSize from 'hooks/useWindowSize'

import Widget75 from 'widgets/Widget75'
import Widget76 from 'widgets/Widget76'
import Widget77 from 'widgets/Widget77'
import Widget78 from 'widgets/Widget78'
import Widget79 from 'widgets/Widget79'
import Widget80 from 'widgets/Widget80'

const PageSeventeen = () => {
  const { setPageTitle } = useContext(PageContext)
  const [zoom, setZoom] = useState(1)
  const windowSize = useWindowSize()
  const matches = useMediaQuery('(min-width:600px)')

  const DefaultPageSize = {
    PageWidth: 1180,
    PageHeight: 800,
  }

  useEffect(() => {
    setPageTitle('Board of Directors')
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
          <Widget75 height={774} width={869}></Widget75>
        </Grid>
        <Grid
          container
          justify="space-between"
          direction="column"
          alignItems="flex-start"
          style={{ width: 302, marginLeft: 7 }}
        >
          <Widget76 width={302} height={181} />
          <Widget77 width={302} height={152} />
          <Widget78 width={302} height={163} />
          <Widget79 width={302} height={173} />
          <Widget80 width={302} height={81} />
        </Grid>
      </Grid>
    </>
  )
}

export default PageSeventeen
