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

