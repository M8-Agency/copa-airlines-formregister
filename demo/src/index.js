import React, {Component} from 'react'
import {render} from 'react-dom'

import FormRegister from '../../src'

class Demo extends Component {
  
  handleRegisterSuccess = (response) => {
    console.log(response.data)
  }

  handleRegisterError = (error, data) => {
    console.log(error, data)
  }

  render() {
    return <div>
      <h1>copa-airlines-formregister Demo</h1>
      <FormRegister 
      endPoint={`/user/register`}
      registerSuccess = { this.handleRegisterSuccess }
      registerError = { this.handleRegisterError }
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
