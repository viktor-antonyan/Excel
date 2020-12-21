import {storage} from '@core/util'
import {defaultTitle, defaultStyles} from '@/constants'

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  styleState: {},
  currentText: '',
  title: defaultTitle,
  currentStyle: defaultStyles
}
const normalize = state=>({
  ...state,
  currentText: '',
  currentStyle: defaultStyles
})
export const initialState =
    storage('excel_state')
        ? normalize(storage('excel_state'))
        : defaultState
