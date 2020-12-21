import {
  APPLY_STYLE,
  CHANGE_TEXT,
  CHANGE_TITLE,
  CURRENT_STYLE,
  TABLE_RESIZE
} from '@/redux/consts'

export function tableResize(data) {
  return{
    type: TABLE_RESIZE,
    data
  }
}

export function changeTableText(data) {
  return{
    type: CHANGE_TEXT,
    data
  }
}

export function currentStyle(data) {
  return{
    type: CURRENT_STYLE,
    data
  }
}

export function applyStyles(data) {
  return{
    type: APPLY_STYLE,
    data
  }
}
export function changeTitle(title) {
  return{
    type: CHANGE_TITLE,
    title
  }
}
