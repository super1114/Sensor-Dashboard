import React, { useEffect, useContext } from 'react'

import Grid from '@material-ui/core/Grid'

import PageContext from 'contexts/PageContext'

import Widget3 from 'widgets/Widget3'
import Widget4 from 'widgets/Widget4'
import Widget9 from 'widgets/Widget9'
import Widget6 from 'widgets/Widget6'
import Widget2 from 'widgets/Widget2'

const PageOne = () => {
  const { setPageTitle } = useContext(PageContext)

  useEffect(() => {
    setPageTitle('Page One')
  }, [])

  return (
    <>
      <Grid container direction="column" justify="flex-start" alignItems="flex-start">
        <Widget4 />
        <Widget3 />
        <Widget9 />
        <Widget6 />
        <Widget2 />
      </Grid>
    </>
  )
}

export default PageOne
