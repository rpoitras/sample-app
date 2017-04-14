import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import {red500, yellow500, blue500} from 'material-ui/styles/colors'

const styles = {
  iconStyles: {
    marginRight: '24px'
  }
}

class PageOne extends Component {
  render () {
    return (
      <div className='column-container'>
        <h2>Page One</h2>
        <FlatButton label='A Button' />
        <br />
        <br />
        <h3>Google Icon Fonts</h3>
        <div className='row-container'>
          <FontIcon className='material-icons' style={styles.iconStyles}>home</FontIcon>
          <FontIcon className='material-icons' style={styles.iconStyles} color={red500}>flight_takeoff</FontIcon>
          <FontIcon className='material-icons' style={styles.iconStyles} color={yellow500}>cloud_download</FontIcon>
          <FontIcon className='material-icons' style={styles.iconStyles} color={blue500}>videogame_asset</FontIcon>
        </div>
      </div>
    )
  }
}

PageOne.propTypes = {
  muiTheme: PropTypes.object
}

export default PageOne
