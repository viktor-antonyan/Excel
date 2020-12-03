import {DomListener} from '@core/DomListener'

export class ExcelComponents extends DomListener {
  constructor(root,options={}) {
    super(root,options.listener);
    this.name = options.name || ''
  }
  ToHtml() {
    return ''
  }
  init() {
    this.addDomListener()
  }
  destroy() {
    this.removeDomListener()
  }
}
