import React from 'react'
import { Switch, Route } from 'react-router-dom'

import About from './About'
import Home from './Home'
import NotFound from './NotFound'
import NestedRoute from './NestedRoute'

export default () => (
  <Switch>
    <Route path='/about' component={About} />
    <Route path='/nestedRoute' component={NestedRoute} />
    <Route path='/' exact component={Home} />
    <Route component={NotFound} />
  </Switch>
)
