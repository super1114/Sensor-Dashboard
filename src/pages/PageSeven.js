import React, { useState, useEffect, useContext } from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import PageContext from 'contexts/PageContext'
import useWindowSize from 'hooks/useWindowSize'

import Widget29 from 'widgets/Widget29'
import Widget37 from 'widgets/Widget37'
import Widget38 from 'widgets/Widget38'
import Widget39 from 'widgets/Widget39'
import Widget40 from 'widgets/Widget40'
import Widget41 from 'widgets/Widget41'

import PriceTableHover from 'components/basic_components/PriceTableHover'

import { makeStyles } from '@material-ui/core/styles'
import HoverContext from 'contexts/HoverContext'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },

  hover: {
    position: 'absolute',
    top: 100,
    right: 100,
  },
}))

const PageSeven = () => {
  const { setPageTitle } = useContext(PageContext)

  const [zoom, setZoom] = useState(1)
  const windowSize = useWindowSize()
  const matches = useMediaQuery('(min-width:600px)')

  const classes = useStyles()

  const DefaultPageSize = {
    PageWidth: 1225,
    PageHeight: 880,
  }

  const { hoverIndex, hoverType } = useContext(HoverContext)

  useEffect(() => {
    setPageTitle('Cost of Risk')
    const zoomWidthLevel = (windowSize.width - 48) / DefaultPageSize.PageWidth
    const zoomHeightLevel = (windowSize.height - 48 - (matches ? 60 : 48)) / DefaultPageSize.PageHeight
    setZoom(Math.min(zoomWidthLevel, zoomHeightLevel))
  }, [])

  useEffect(() => {
    const zoomWidthLevel = (windowSize.width - 48) / DefaultPageSize.PageWidth
    const zoomHeightLevel = (windowSize.height - 48 - (matches ? 60 : 48)) / DefaultPageSize.PageHeight
    setZoom(Math.min(zoomWidthLevel, zoomHeightLevel))
  }, [windowSize, matches])

  const getPos = () => {
    let pos = {
      x: 0,
      y: 0,
    }

    if (hoverIndex !== 'Not on') pos.x = hoverIndex * 47 + 542
    if (hoverType === 'Impairment charge (£m)') pos.y = 67
    if (hoverType === 'Cost of Risk') pos.y = 120

    return pos
  }

  return (
    <Grid
      className={classes.root}
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
        <Widget37 width={604} topic={'widget-13-1'} />

        <Grid container direction="row" justify="space-between" alignItems="stretch">
          <Widget38 width={248} height={325} />
          <Widget39 width={340} height={325} />
        </Grid>

        <Widget40 width={604} height={257} strokeWidth={0.1} />
      </Grid>
      <Grid container justify="flex-start" direction="column" alignItems="flex-start" style={{ width: 580 }}>
        <Widget41 width={565} height={280} topic={'topic-41'} />
        <Widget29
          titleFontSize={14.5}
          width={570}
          height={510}
          mainHeight={15}
          topOffset={25}
          style={{ marginTop: 0, paddingRight: 0 }}
          topic={'widget-29-3'}
          cellColumnCount={24}
          cellRowCount={24}
          titleWidth={135}
          eachRightCell={20}
          eachLeftCell={10}
        />
      </Grid>

      <div
        className={classes.hover}
        style={{
          top: getPos().y,
          left: getPos().x,
          position: 'absolute',
        }}
      >
        <PriceTableHover />
      </div>
    </Grid>
  )
}

export default PageSeven
