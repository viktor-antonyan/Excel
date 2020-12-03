import {CreateCallbackName} from '@core/util'

export class DomListener {
  constructor(root,listener=[]) {
    if(!root) {
      throw new Error('root is not a define')
    }
    this.root = root
    this.listener = listener
  }
  addDomListener() {
    this.listener.forEach(listener=>{
      const callback = CreateCallbackName(listener)
      if(!this[callback]) {
        throw new Error(
            `${callback} is not implemented in ${this.name}`
        )
      }
      this[callback] = this[callback].bind(this)
      this.root.on(listener, this[callback])
    })
  }
  removeDomListener() {
    this.listener.forEach(listener=>{
      const callback = CreateCallbackName(listener)
      this.root.remove(listener, this[callback])
    })
  }
}
