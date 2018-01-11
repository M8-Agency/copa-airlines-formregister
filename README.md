# copa-airlines-formregister

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe copa-airlines-formregister here.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

```js
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
      endPoint={`${config.api}/user/register`}
      registerSuccess = { this.handleRegisterSuccess }
      registerError = { this.handleRegisterError }
      />
    </div>
  }
}
```