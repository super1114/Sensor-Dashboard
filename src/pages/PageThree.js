import React, { useContext, useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import PageContext from 'contexts/PageContext'
import useWindowSize from 'hooks/useWindowSize'

import DashboardCard from 'components/basic_components/DashboardCard'

import Widget11 from 'widgets/Widget11'
import Widget12 from 'widgets/Widget12'
import Widget13 from 'widgets/Widget13'
import Widget14 from 'widgets/Widget14'
import Widget15 from 'widgets/Widget15'
import Widget16 from 'widgets/Widget16'
import Widget17 from 'widgets/Widget17'
import Widget18 from 'widgets/Widget18'

import { CardMode, DefaultPageSize } from 'constants/common'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: '#fff',
    fontSize: 20,
  },
  body: {
    display: 'flex',
  },
}))

const PageThree = () => {
  const classes = useStyles()
  const { setPageTitle } = useContext(PageContext)
  const [zoom, setZoom] = useState(1)
  const windowSize = useWindowSize()
  const matches = useMediaQuery('(min-width:600px)')

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

  return (
    <>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        style={{
          width: 2230,
          position: 'absolute',
          transform: `translateX(-50%) scale(${zoom})`,
          left: '50%',
          transformOrigin: 'top',
        }}
      >
        <Grid container wrap="nowrap" justify="flex-start" alignItems="stretch">
          <DashboardCard mode={CardMode.auto} style={{ padding: 10, flexDirection: 'column', width: 'unset' }}>
            <div className={classes.root}>
              <div className={classes.title}>Business Strategy</div>
              <div className={classes.body}>
                <Widget11 />
                <Widget12 />
              </div>
            </div>
          </DashboardCard>
          <Widget13 />
          <Widget14 />
        </Grid>
        <Grid container wrap="nowrap" justify="flex-start" alignItems="stretch">
          <Widget15 />
          <Widget16 />
        </Grid>
        <Grid container wrap="nowrap" alignItems="stretch">
          <Widget17 style={{ width: 565 }} />
          <Widget17 topic="widget-17-2" style={{ width: 920 }} />
          <Widget18 style={{ width: 660 }} />
        </Grid>
      </Grid>
    </>
  )
}

export default PageThree
