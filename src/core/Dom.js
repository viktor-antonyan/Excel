class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
    ?document.querySelector(selector)
        :selector
  }
  html(html) {
    if(typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.innerHTML.trim()
  }
  text(text) {
    if(typeof text !== 'undefined') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }
  attr(name,value) {
    if(value) {
      this.$el.setAttribute(name,value)
      return this
    }
    this.$el.getAttribute(value)
  }
  clear() {
    this.$el.innerHTML = ''
    return this
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }
  on(eventName,callback) {
    this.$el.addEventListener(eventName,callback)
  }
  off(eventName,callback) {
    this.$el.removeEventListener(eventName,callback)
  }
  get data() {
    return this.$el.dataset
  }
  closest(selector) {
    return $(this.$el.closest(selector))
  }
  coords() {
    return this.$el.getBoundingClientRect()
  }
  getSelectorAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  find(selector) {
    return $(this.$el.querySelector(selector))
  }
  css(styles={}) {
    Object.keys(styles)
        .forEach(key=>this.$el.style[key] = styles[key])
  }
  getStyles(styles = []) {
    return styles.reduce((res,style)=>{
      res[style] = this.$el.style[style]
      return res
    },{})
  }
  focus() {
    this.$el.focus()
    return this
  }
  addClass(className) {
    this.$el.classList.add(className)
    return this
  }
  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }
  id(parse) {
    if(parse) {
      const parseId = this.id().split(':')
      return {
        row: +parseId[0],
        col: +parseId[1]
      }
    }
    return this.data.id
  }
}

export function $(selector) {
  return new Dom(selector)
}
$.create = (element,className = '') =>{
  const $el = document.createElement(element)
  if(className) {
    $el.classList.add(className)
  }
  return $($el)
}
