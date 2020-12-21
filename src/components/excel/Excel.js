import {$} from '@core/Dom'
import {Emitter} from '@core/Emitter';
import {StoreSubscribers} from '@core/storeSubscribers';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
    this.store = options.store
    this.storeSubscribe = new StoreSubscribers(this.store)
    this.emitter = new Emitter()
  }
  getRoot() {
    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }
    const $root = $.create('div','excel')
    this.components = this.components.map(Component=>{
      const $el = $.create('div',Component.className)
      const component = new Component($el,componentOptions)

      if(component.name) {
        window['c'+component.name] = component
      }

      $el.html(component.ToHtml())
      $root.append($el)
      return component
    })
    return $root
  }
  render() {
    this.$el.append(this.getRoot())
    this.storeSubscribe.subscribeComponents(this.components)
    this.components.forEach(component=>component.init())
  }
  destroy() {
    this.storeSubscribe.unSubscribeFromComponents()
    this.components.forEach(component=>component.destroy())
  }
}
