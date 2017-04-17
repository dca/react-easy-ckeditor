import React from 'react'
import {render} from 'react-dom'

import EasyCKEditor from '../../src'

class Demo extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (name, textHTML) {
    this.setState({ [name]: textHTML })
  }

  render () {
    return (
      <div>
        <h1>react-easy-ckeditor Demo</h1>
        <EasyCKEditor
          name='desc'
          textHTML='<h1>Hello</h1>World'
          onChange={this.onChange}
        />
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
