import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { describe, beforeEach } from 'mocha'
import NestedRoute from './'

describe('<NestedRoute />', () => {
  let component

  beforeEach(() => {
    component = shallow(<NestedRoute match={{}} />)
  })

  it('renders', () => {
    expect(component).to.have.lengthOf(1)
  })
})
