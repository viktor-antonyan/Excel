import {DomListener} from '@core/DomListener'

export class ExcelComponents extends DomListener {
  constructor(root,options={}) {
    super(root,options.listener);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []
    this.prepare()
  }
  prepare() {
  }
  $emit(event,...arg) {
    this.emitter.emit(event,...arg)
  }
  $on(event,fn) {
    const unsubs = this.emitter.subscribe(event,fn)
    this.unsubscribers.push(unsubs)
  }
  ToHtml() {
    return ''
  }
  init() {
    this.addDomListener()
  }
  destroy() {
    this.removeDomListener()
    this.unsubscribers.forEach(unsubs=>unsubs())
  }
}
