export class Emitter {
  constructor() {
    this.listeners = {}
  }
  emit(event,...arg) {
    this.listeners[event].forEach(listener=>{
      return listener(...arg)
    })
  }
  subscribe(event,fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
          this.listeners[event].filter(listener=>listener !== fn)
    }
  }
}
