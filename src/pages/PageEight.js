import React, { useState, useEffect, useContext } from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import PageContext from 'contexts/PageContext'
import useWindowSize from 'hooks/useWindowSize'

import Widget42 from 'widgets/Widget42'
import Widget43 from 'widgets/Widget43'
import Widget44 from 'widgets/Widget44'
import Widget45 from 'widgets/Widget45'

const PageEight = user => {
  const { setPageTitle } = useContext(PageContext)
  const [filter, setFilter] = useState(null)
  const [zoom, setZoom] = useState(1)
  const windowSize = useWindowSize()
  const matches = useMediaQuery('(min-width:600px)')

  const DefaultPageSize = {
    PageWidth: 1180,
    PageHeight: 800,
  }

  useEffect(() => {
    setPageTitle('News at your fingertips')
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
          style={{ width: 'auto', height: 'auto' }}
        >
          <Widget42 width={834} height={773} setFilter={setFilter} filter={filter} user={user.user} />
        </Grid>
        <Grid container justify="flex-start" direction="column" alignItems="flex-start" style={{ width: 321 }}>
          <Grid
            container
            justify="space-between"
            direction="row"
            alignItems="center"
            style={{ width: 321, height: 248 }}
          >
            <Widget43 topic={'topic-43-1'} />
            <Widget43 topic={'topic-43-2'} />
          </Grid>
          <Widget44 setFilter={setFilter} />
          <Widget45 setFilter={setFilter} />
        </Grid>
      </Grid>
    </>
  )
}

export default PageEight
