import {$} from '@core/Dom';

export function tableResize(root,event) {
  const resizer = $(event.target)
  const $parent = resizer.closest('[data-type="resizer"]')
  const $parentCoords = $parent.coords()
  const dataType = resizer.data.resize
  const resizePosition = dataType === 'col'?'bottom':'right'
  let value

  resizer.css({
    opacity: 1,
    [resizePosition]: '-5000px'
  })

  document.onmousemove = e => {
    if (dataType === 'col') {
      const delta = e.pageX - $parentCoords.right
      value = $parentCoords.width + delta
      resizer.css({right: -delta + 'px'})
    }else {
      const delta = e.pageY - $parentCoords.bottom
      value = $parentCoords.height + delta
      resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = () =>{
    document.onmousemove = null
    document.onmouseup = null

    if(dataType === 'col') {
      $parent.css({width: value + 'px'})
      root.getSelectorAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px')
    }else {
      $parent.css({height: value + 'px'})
    }

    resizer.css({
      opacity: 0,
      right: 0,
      bottom: 0
    })
  }
}
