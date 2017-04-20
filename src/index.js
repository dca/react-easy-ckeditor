const React = require('react')
const PropTypes = require('prop-types')
const scriptjs = require('scriptjs')
const debug = require('debug')('react-easy-ckeditor')

let CKEDITOR_URL = 'https://cdnjs.cloudflare.com/ajax/libs/ckeditor/4.6.2/ckeditor.js'

class EasyCKEditor extends React.Component {
  constructor (props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount () {
    scriptjs(CKEDITOR_URL, 'ckeditor')
    debug('componentWillMount: load script')
  }

  componentDidMount () {
    debug('componentDidMount: call `replace` onReady')
    let _this = this
    scriptjs.ready('ckeditor', () => {
      _this._editor = window.CKEDITOR.replace(_this.props.name)
      _this._editor.on('change', _this.onChange)
      _this._editor.on('blur', _this.onChange)
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.textHTML !== this.props.textHTML) {
      scriptjs.ready('ckeditor', () => {
        this._editor.setData(unescape(nextProps.textHTML))
      })
    }
  }

  onChange () {
    let textHTML = this._editor.getData()

    this.setState({ [this.props.name]: textHTML })
    this.props.onChange(this.props.name, textHTML)
  }

  render () {
    return (
      <textarea
        style={{display: 'none'}}
        rows='10' cols='80'
        id={this.props.name}
        name={this.props.name}
        defaultValue={unescape(this.props.textHTML)}
      />
    )
  }
}

EasyCKEditor.propTypes = {
  name: PropTypes.string,
  textHTML: PropTypes.string,
  onChange: PropTypes.func
}

EasyCKEditor.defaultProps = {
  name: Math.random().toString(),
  textHTML: '',
  onChange: (name, value) => {}
}

export default EasyCKEditor
