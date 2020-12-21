import {toInlineStyle} from '@core/util'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

const DEFAULTWIDTH = '120'
const DEFAULTHEIGHT = '24'
const charCode ={
  A: 65,
  Z: 90
}
const getWidth = (state,index) =>{
  return (state[index] || DEFAULTWIDTH) + 'px'
}
const getHeight = (state,index) =>{
  return (state[index] || DEFAULTHEIGHT) + 'px'
}
const createCell = (state,row) =>{
  return function(_,col) {
    const width = getWidth(state.colState,col)
    const id = `${row}:${col}`
    const value = state.dataState[id]
    const styles = toInlineStyle({...defaultStyles,...state.styleState[id]})
    return`
    <div class="cell" contenteditable 
    data-col="${col}"
    data-type = "cell"
    data-id = "${id}"
    data-value = "${value || ''}"
    style="${styles}; width: ${width}"
    >
    ${parse(value) || ''}
    </div>
    `
  }
}
const createCol = (el,index,state) =>{
  const width = getWidth(state,index)
  return`
       <div class="columns" 
       data-type='resizer' 
       data-col=${index}
       style="width: ${width}"
       >
         ${el}
       <div class="col-resize" data-resize='col'></div>
       </div>
    `
}
const createRow = (index,content,state) => {
  const RowResize = index
      ? `<div class='row-resize' data-resize='row'></div>`
      : ''
  const height = getHeight(state,index)
  return`
    <div class="row" 
    data-type='resizer' 
    data-row="${index}" 
    style="height: ${height}"
    >
       <div class="row_info">${index ? index : ''}
       ${RowResize}
       </div>
       <div class="row_data">${content}</div>
    </div>
`
}

export let rowcount
export let rowLen

export function createTable(rowCount = 15,state={}) {
  rowcount = rowCount
  rowLen = charCode.Z - charCode.A + 1
  const row = []

  const colValue = rowLen =>{
    return new Array(rowLen)
        .fill('')
        .map((_,index)=>String.fromCharCode(charCode.A + index))
        .map((el,index)=> createCol(el,index,state.colState))
        .join('')
  }
  row.push(createRow(null,colValue(rowLen),{}))

  for (let i = 0; i < rowCount; i++) {
    const cells = new Array(rowLen)
        .fill('')
        .map(createCell(state,i))
        .join('')

    row.push(createRow(i + 1,cells,state.rowState))
  }

  return row.join('')
}
