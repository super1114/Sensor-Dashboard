import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { pageRoutes } from 'constants/common'

export const PrivateRoute = ({ component: Component, pages, user = null, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!pages || !pages.length || pages.map(page => pageRoutes[page]).indexOf(rest.path) < 0) {
        return <Redirect to={{ pathname: '/' }} />
      }

      // authorised so return component
      return <Component user={user} {...props} />
    }}
  />
)
