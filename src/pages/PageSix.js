import React, { useState, useEffect, useContext } from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import PageContext from 'contexts/PageContext'
import useWindowSize from 'hooks/useWindowSize'

import Widget28 from 'widgets/Widget28'
import Widget29 from 'widgets/Widget29'
import Widget33 from 'widgets/Widget33'
import Widget34 from 'widgets/Widget34'
import Widget35 from 'widgets/Widget35'
import Widget36 from 'widgets/Widget36'

const PageSix = () => {
  const { setPageTitle } = useContext(PageContext)

  const [zoom, setZoom] = useState(1)
  const windowSize = useWindowSize()
  const matches = useMediaQuery('(min-width:600px)')

  const DefaultPageSize = {
    PageWidth: 1240,
    PageHeight: 840,
  }

  useEffect(() => {
    setPageTitle('Costs (Value Creation) Dashboard')
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
          justify="flex-start"
          alignItems="center"
          direction="column"
          style={{ width: 'auto', height: 'auto', marginRight: 5 }}
        >
          <Widget33 width={455} height={222} />
          <Widget28 width={455} height={56} direction={'horizontal'} topic={'widget-28-2'} />
          <Widget33 width={455} height={222} topic={'widget-33-2'} />
          <Widget34 width={455} height={260} />
        </Grid>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          direction="column"
          style={{ width: 760, height: 'fit-content' }}
        >
          <Widget29
            width={710}
            height={387}
            style={{ marginTop: 0 }}
            topic={'widget-29-2'}
            topOffset={10}
            cellColumnCount={29}
          />
          <Grid container justify="space-between" alignItems="center" direction="row" style={{ width: 740 }}>
            <Widget35 style={{ width: 385, height: 417 }} />
            <Widget36 width={345} style={{ width: 345, height: 415 }} />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default PageSix
