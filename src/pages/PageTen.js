import React, { useState, useEffect, useContext } from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import PageContext from 'contexts/PageContext'
import useWindowSize from 'hooks/useWindowSize'

import Widget48 from 'widgets/Widget48'
import Widget29 from 'widgets/Widget29'
import Widget49 from 'widgets/Widget49'

const PageTen = () => {
  const { setPageTitle } = useContext(PageContext)

  const [zoom, setZoom] = useState(1)
  const windowSize = useWindowSize()
  const matches = useMediaQuery('(min-width:600px)')

  const DefaultPageSize = {
    PageWidth: 1220,
    PageHeight: 830,
  }

  useEffect(() => {
    setPageTitle('Capital Strength')
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
          <Widget48 width={673} height={410} />
          <Widget48 width={673} height={410} topic={'topic-48-1'} gradientColor="cyan" />
        </Grid>
        <Grid container justify="flex-start" direction="column" alignItems="flex-start" style={{ width: 530 }}>
          <Widget29
            titleFontSize={14.5}
            width={530}
            height={465}
            mainHeight={15}
            topOffset={0}
            style={{ marginTop: 0, padding: 10, paddingRight: 0 }}
            topic={'topic-29-4'}
            cellColumnCount={23}
            cellRowCount={23}
            titleWidth={115}
            eachRightCell={20}
            eachLeftCell={10}
            zoom={zoom}
          />

          <div
            style={{
              height: 'auto',
              width: 550,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Widget49 width={263} height={190} topic={'topic-49'} />

            <Widget49 width={263} height={190} topic={'topic-49-1'} />

            <Widget49 width={263} height={135} topic={'topic-49-2'} />

            <Widget49 width={263} height={135} topic={'topic-49-3'} />
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default PageTen
