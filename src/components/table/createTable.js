const charCode ={
  A: 65,
  Z: 90
}
const createCell = (val = '') =>{
  return`
    <div class="cell" contenteditable>${val}</div>
    `
}
const createCol = el =>{
  return`
       <div class="columns">${el}</div>
    `
}
const createRow = (index,content) => {
  return`
    <div class="row">
       <div class="row_info">${index ? index : ''}</div>
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
