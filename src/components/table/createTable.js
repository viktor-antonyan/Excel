const charCode ={
  A: 65,
  Z: 90
}
const createCell = (val = '',col) =>{
  return`
    <div class="cell" contenteditable data-col=${col}>${val}</div>
    `
}
const createCol = (el,index) =>{
  return`
       <div class="columns" data-type='resizer' data-col=${index}>
         ${el}
       <div class="col-resize" data-resize='col'></div>
       </div>
    `
}
const createRow = (index,content) => {
  const RowResize = index
      ? `<div class='row-resize' data-resize='row'></div>`
      : ''
  return`
    <div class="row" data-type='resizer'>
       <div class="row_info">${index ? index : ''}
       ${RowResize}
       </div>
       <div class="row_data">${content}</div>
    </div>
`
}
const colValue = rowLen =>{
  return new Array(rowLen)
      .fill('')
      .map((_,index)=>String.fromCharCode(charCode.A + index))
      .map(createCol)
      .join('')
}

export function createTable(rowCount = 15) {
  const rowLen = charCode.Z - charCode.A + 1
  const row = []

  row.push(createRow(null,colValue(rowLen)))

  for (let i = 0; i < rowCount; i++) {
    const cells = new Array(rowLen)
        .fill('')
        .map(createCell)
        .join('')
    row.push(createRow(i + 1,cells))
  }

  return row.join('')
}
