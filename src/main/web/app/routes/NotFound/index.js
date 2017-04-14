import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'

const goBack = (e) => {
  e.preventDefault()
  return browserHistory.goBack()
}

class NotFound extends Component {
  render () {
    return (
      <div className='column-container'>
        <h4>Page Not Found</h4>
        <p><a href='#' onClick={goBack}>&larr; Back</a></p>
      </div>
    )
  }
}

NotFound.propTypes = {
  muiTheme: PropTypes.object
}

export default NotFound
