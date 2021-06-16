import React, { useState, useEffect, useContext } from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import PageContext from 'contexts/PageContext'
import useWindowSize from 'hooks/useWindowSize'

import Widget81 from 'widgets/Widget81'
import Widget82 from 'widgets/Widget82'
import Widget83 from 'widgets/Widget83'
import Widget84 from 'widgets/Widget84'
import Widget85 from 'widgets/Widget85'
import Widget86 from 'widgets/Widget86'
import Widget87 from 'widgets/Widget87'
import Widget88 from 'widgets/Widget88'
import Widget89 from 'widgets/Widget89'
import Widget90 from 'widgets/Widget90'
import Widget91 from 'widgets/Widget91'

const PageEighteen = () => {
  const { setPageTitle } = useContext(PageContext)
  const [zoom, setZoom] = useState(1)
  const windowSize = useWindowSize()
  const matches = useMediaQuery('(min-width:600px)')

  const DefaultPageSize = {
    PageWidth: 1180,
    PageHeight: 800,
  }

  useEffect(() => {
    setPageTitle('Audit')
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
          transformOrigin: 'top',
          left: '50%',
        }}
      >
        <Grid
          container
          justify="space-between"
          alignItems="center"
          direction="column"
          style={{ width: 'auto', height: 790 }}
        >
          <Widget81 height={344} width={576} />
          <Widget82 height={140} width={576} />
          <Grid
            container
            justify="space-between"
            alignItems="center"
            direction="row"
            style={{ width: '100%', height: 67 }}
          >
            <Widget84 width={302} height={67} />
            <Widget85 width={131} height={67} />
            <Widget86 width={131} height={67} />
          </Grid>
          <Widget83 width={576} height={211} />
        </Grid>
        <Grid
          container
          justify="space-between"
          direction="column"
          alignItems="flex-start"
          style={{ width: 591, marginLeft: 7 }}
        >
          <Widget87 width={591} height={156} />
          <Widget88 width={591} height={431} />
          <Grid
            container
            justify="space-between"
            alignItems="center"
            direction="row"
            style={{ width: '100%', height: 186 }}
          >
            <Widget89 width={203} height={186} />
            <Widget90 width={203} height={186} />
            <Widget91 width={171} height={186} />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default PageEighteen
