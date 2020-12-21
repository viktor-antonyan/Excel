import {$} from '@/core/Dom'
import {createToolbar} from '@/components/toolbar/createToolbar'
import {ExcelStateComponents} from '@core/ExcelStateComponents'
import {defaultStyles} from '@/constants'

export class Toolbar extends ExcelStateComponents {
  static className = 'excel__toolbar'
  constructor(root,options) {
    super(root,{
      name: 'toolbar',
      listener: ['click'],
      subscribers: ['currentStyle'],
      ...options
    });
  }
  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  ToHtml() {
    return this.template
  }
  storeChanged(changes) {
    this.setState(changes.currentStyle)
  }

  onClick(event) {
    const $target = $(event.target)
    if($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle',value)

      const key = Object.keys(value)[0]
      this.setState({[key]: value[key]})
      // console.log(this.state)
    }
  }
}
