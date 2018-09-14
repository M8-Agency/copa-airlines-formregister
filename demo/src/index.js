import React, {Component} from 'react'
import {render} from 'react-dom'

import FormRegister from '../../src'

class Demo extends Component {
  
  handleRegisterSuccess= (data) => {
    console.log('handleRegisterSuccess', data)
  }
  
  handleRegisterError = (data) => {
    console.log('handleRegisterError', data)
  }

  handleWorking = (status) => {

  }

  render() {
    return <div>
      <h1>copa-airlines-formregister Demo</h1>
      <FormRegister 
      endPoint={`/user/register`}
      success = { this.handleRegisterSuccess }
      error = { this.handleRegisterError }
      working = { false } 
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
