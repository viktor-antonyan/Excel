import {
  APPLY_STYLE,
  CHANGE_TEXT,
  CHANGE_TITLE,
  CURRENT_STYLE,
  TABLE_RESIZE
} from '@/redux/consts';

export function rootReducer(state,action) {
  let field
  let res
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.dataType === 'col'?'colState':'rowState'
      return {...state, [field]: value(state,field,action)}
    case CHANGE_TEXT:
      field = 'dataState'
      return {...state,
        currentText: action.data.value,
        [field]: value(state,field,action)
      }
    case CURRENT_STYLE:
      return {...state,currentStyle: action.data}
    case APPLY_STYLE:
      field = 'styleState'
      res = state[field] || {}
      action.data.ids.forEach(id=>{
        res[id] = {...res[id],...action.data.value}
      })
      return {
        ...state,
        [field]: res,
        currentStyle: {...state.currentStyle, ...action.data.value}
      }
    case CHANGE_TITLE:
      return {...state,title: action.title}
    default: return state
  }
}

function value(state,field,action) {
  const res = state[field] || {}
  res[action.data.id] = action.data.value
  return res
}
