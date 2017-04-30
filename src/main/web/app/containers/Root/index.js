import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import NotFound from '../../routes/NotFound'

import routes from '../../routes/routes'

export const children = (clientProps, childParentRoute) => {
  console.log(`${childParentRoute} props`, clientProps)

  let baseRoute = childParentRoute
  if (baseRoute !== clientProps.location.pathname) {
    baseRoute = '/notFound'
    const pathRoutePoints = clientProps.location.pathname.split('/')
    const len = pathRoutePoints.length
    if (len === 2) {
      baseRoute = `/${pathRoutePoints[len - 1]}`
    } else if (len > 2) {
      const parent = childParentRoute.split('/')
      for (let i = 0; i < len; i++) {
        if (parent[1] === pathRoutePoints[i]) {
          baseRoute = parent[1] === ''
              ? `/${pathRoutePoints[i + 1]}` : `/${pathRoutePoints[i]}/${pathRoutePoints[i + 1]}`
          break
        }
      }
    }
  }
  const routes = clientProps.childRoutes ? clientProps.childRoutes : clientProps.routes
  const route = routes.find((element) => {
    if (element.path === baseRoute) {
      return element.component
    }
  })

  const Children = route ? route.component : NotFound
  let childRoutes = []
  if (route && route.routes) {
    childRoutes = route.routes
  }
  return <Children childRoutes={childRoutes} {...clientProps} />
}

const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes} />
  )} />
)

class Root extends Component {
  render () {
    return (
      <Provider store={this.props.store}>
        <BrowserRouter basename='/sample-app' history={this.props.history}>
          <div>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root
