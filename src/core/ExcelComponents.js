import {DomListener} from '@core/DomListener'

export class ExcelComponents extends DomListener {
  constructor(root,options={}) {
    super(root,options.listener);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribers = options.subscribers || []
    this.unsubscribers = []
    this.store = options.store
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
  $dispatch(action) {
    this.store.dispatch(action)
  }
  storeChanged() {}

  isWatching(key) {
    return this.subscribers.includes(key)
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
