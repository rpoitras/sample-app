import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import reactLogo from 'assets/react.png'
import springLogo from 'assets/springLogo.png'

var style = {
  imagesDiv: {
    paddingLeft: '22px'
  },
  reactImg: {
    width: '200px',
    height: '200px',
    padding: '10px 40px 10px 0'
  },
  springImg: {
    width: '160px',
    height: '160px',
    padding: '10px 0 35px 40px'
  }
}

class Home extends Component {
  render () {
    return (
      <div className='column-container'>
        <h1>Sample App</h1>
        <div style={style.imagesDiv}>
          <span>
            <img
              src={reactLogo}
              alt='React'
              style={style.reactImg}
            />
            <img
              id='home-springImg'
              src={springLogo}
              alt='Spring'
              style={style.springImg}
            />
          </span>
        </div>
        <div className='row-container'>
          <Link to='/about'>
            <RaisedButton
              id='home-aboutButton'
              label='About' />
          </Link>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  muiTheme: PropTypes.object
}

export default Home
