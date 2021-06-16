import React, { useState, useEffect, useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import PageContext from 'contexts/PageContext'
import useWindowSize from 'hooks/useWindowSize'

import Widget27 from 'widgets/Widget27'
import Widget28 from 'widgets/Widget28'
import Widget29 from 'widgets/Widget29'
import Widget30 from 'widgets/Widget30'
import Widget31 from 'widgets/Widget31'
import Widget32 from 'widgets/Widget32'


const useStyles = makeStyles(theme => ({
  grid: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'stretch'
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
    justifyContent: 'space-between'
  },
}))

const PageFive = () => {
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
    setPageTitle('Strategy')
    const zoomWidthLevel = (windowSize.width - 48) / DefaultPageSize.PageWidth
    const zoomHeightLevel = (windowSize.height - 48 - (matches ? 60 : 48)) / DefaultPageSize.PageHeight
    setZoom(Math.min(zoomWidthLevel, zoomHeightLevel))
  }, [])

  useEffect(() => {
    const zoomWidthLevel = (windowSize.width - 48) / DefaultPageSize.PageWidth
    const zoomHeightLevel = (windowSize.height - 48 - (matches ? 60 : 48)) / DefaultPageSize.PageHeight
    setZoom(Math.min(zoomWidthLevel, zoomHeightLevel))
  }, [windowSize, matches])

  useEffect(() => {
    setPageTitle('Income from Asset Growth l Revenue (Value Creation) Dashboard')
  }, [])

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
            <Widget27 width={550} />
            <Widget28 width={56} height={350} />
            <Widget27 topic={"widget-27-2"} width={550} />
          </div>
        </Grid>

        <Grid container justify="flex-start" alignItems="center" style={{ marginTop: -5 }}>
          <Widget29 width={750} height={420} />
          <div className={classes.gridVertical}>
            <div className={classes.gridHorizontal}>
              <Widget30
                width={204}
                height={190}
              />
              <Widget31
                width={204}
                height={190}
              />
            </div>
            <Widget32
              height={190}
            />
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default PageFive
