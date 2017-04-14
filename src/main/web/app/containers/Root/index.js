import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

import routes from '../../routes/routes'

class Root extends Component {
  render () {
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history} routes={routes} />
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root
