class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
    ?document.querySelector(selector)
        :selector
  }
  html(html) {
    typeof html === 'string'
    ? this.$el.innerHTML = html
        :this.$el.innerHTML
    return this
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
  remove(eventName,callback) {
    this.$el.removeEventListener(eventName,callback)
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
