import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import NotFound from '../../routes/NotFound'

import routes from '../../routes/routes'

/*
 * The application top level route.
 */
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

/**
 * Wrap <Router> and use this everywhere instead. Then when sub routes are added to any route it'll work.
 * Function and description copied from React Router docs.
 *
 * This will render parent route(s) and selected children together.
 *
 * @param route
 * @returns {JSX}
 */
export const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes} />
  )} />
)

/**
 * A replacement for this.props.children functionality in react-router pre-version 4.
 *
 * @param parentProps - the props from the calling component
 * @param subRouteParentRoute - the route path of the calling component
 * @returns {object} - the sub-route component, not found component, or void if input route is the current location
 */
export const children = (parentProps, subRouteParentRoute) => {
  console.log(`${subRouteParentRoute} props`, parentProps)

  // if the caller is a sub-route and it's route matches the current location there is no child to render
  if (subRouteParentRoute !== '/' && subRouteParentRoute === parentProps.location.pathname) {
    return
  }

  // retrieve sub-route from the current location
  let subRoute = _getSubRoute(parentProps, subRouteParentRoute)

  // use the sub-routes if there are any, otherwise the top level routes
  const routes = parentProps.subRoutes ? parentProps.subRoutes : parentProps.routes

  // return the component assigned to the route, if found
  const route = routes.find((element) => {
    if (element.path === subRoute) {
      return element.component
    }
  })

  // initialize the return component with the matching route or not found
  const Children = route ? route.component : NotFound

  // load sub-routes if they exist
  let subRoutes = []
  if (route && route.routes) {
    subRoutes = route.routes
  }

  return <Children subRoutes={subRoutes} {...parentProps} />
}

/**
 * Get the sub-route from the current location in the context of the parent.
 *
 * TBD - the sub-route search in the location URL may be simplified with a String.indexOf(). I did it this way to avoid
 *       matching within a segment and capturing the special meaning of the / delimeters.
 *
 * @param parentProps - the props from the calling component
 * @param subRouteParentRoute - the route path of the calling component
 * @returns {string} - the sub-route portion of the location
 * @private
 */
const _getSubRoute = (parentProps, subRouteParentRoute) => {
  // initialize the top level route, the caller's route
  let subRoute = subRouteParentRoute

  // if this is not the top level route ('/', Home), resolve the sub-route and children
  if (subRoute !== parentProps.location.pathname) {
    // assume the route is not found until detecting otherwise
    subRoute = '/notFound'

    // split up the current location's route segments
    const locationRouteSegments = parentProps.location.pathname.split('/')

    // count the route segments, it could be an immediate sub-route [2] or a deeper nested one [2+]
    const locationLen = locationRouteSegments.length

    if (locationLen === 2) {
      // a first level sub-route is the last segment
      subRoute = `/${locationRouteSegments[locationLen - 1]}`
    } else if (locationLen > 2) {
      // the route is deeper, split up the input top level route
      const parentRouteSegments = subRouteParentRoute.split('/')

      // for each segment of the current location
      for (let i = 0; i < locationLen; i++) {
        // check of the location segment matches the sub-route's highest level parent
        if (parentRouteSegments[1] === locationRouteSegments[i]) {
          // blank matching route segments indicate an immediate sub-route, otherwise it is deeper
          if (parentRouteSegments[1] === '') {
            subRoute = `/${locationRouteSegments[i + 1]}`
          } else {
            subRoute = `/${locationRouteSegments[i]}/${locationRouteSegments[i + 1]}`
            // add on the rest of the path segments
            for (let remainingIdx = i + 2; remainingIdx < locationLen; remainingIdx++) {
              subRoute += `/${locationRouteSegments[remainingIdx]}`
            }
          }
          break
        }
      }
    }
  }
  return subRoute
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root
