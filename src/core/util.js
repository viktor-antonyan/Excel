export function CreateCallbackName(name) {
  return 'on' + name.charAt(0).toUpperCase() + name.slice(1)
}
export function range(start,end) {
  if(start>end) {
    [start,end] = [end,start]
  }
  return new Array(end-start+1)
      .fill('')
      .map((_,i)=>start+i)
}

export function storage(key,val = null) {
  if(val) {
    localStorage.setItem(key,JSON.stringify(val))
  }else {
    return JSON.parse(localStorage.getItem(key))
  }
}
export function isEqual(a,b) {
  if(typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}
export function camelCaseToDash(value) {
  return value.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}
export function toInlineStyle(val = {}) {
  return Object.keys(val)
      .map(key=>`${camelCaseToDash(key)}: ${val[key]}`)
      .join(';')
}
export function debounce(fn,ms) {
  let timeout
  return (...arg)=> {
    const later = () =>{
      clearTimeout(timeout)
      // eslint-disable-next-line
      fn.apply(this, arg)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later,ms)
  }
}
