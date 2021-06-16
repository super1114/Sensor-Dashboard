import React, { useEffect, useContext } from 'react'

import Grid from '@material-ui/core/Grid'

import PageContext from 'contexts/PageContext'

import Widget8 from 'widgets/Widget8'
import Widget5 from 'widgets/Widget5'
import Widget7 from 'widgets/Widget7'

const PageTwo = () => {
  const { setPageTitle } = useContext(PageContext)

  useEffect(() => {
    setPageTitle('Page Two')
  }, [])

  return (
    <>
      <Grid container direction="column" justify="flex-start" alignItems="flex-start">
        <Widget8 />
        <Widget5 />
        <Widget7 />
      </Grid>
    </>
  )
}

export default PageTwo
