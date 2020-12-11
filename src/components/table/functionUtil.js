import {range} from '@core/util';
import {rowcount, rowLen} from '@/components/table/createTable';

export function shouldTable(event) {
  return event.target.dataset.resize
}
export function isCell(event) {
  return event.target.dataset.type === 'cell'
}
export function matrix($target,$current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const col = range(current.col, target.col);
  const row = range(current.row, target.row);

  return col.reduce((acc,col)=>{
    row.forEach(row=>acc.push(`${row}:${col}`))
    return acc
  },[])
}

export function next(key,{row,col}) {
  const rowCount = rowcount
  const colLen = rowLen
  const minValue = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = row ++ >= rowCount-1 ? rowCount-1 : row ++
      break;
    case 'Tab':
    case 'ArrowRight':
      col = col++ >= colLen-1 ? colLen-1 : col++
      break;
    case 'ArrowUp':
      row = row-- <= minValue ? minValue : row--
      break;
    case 'ArrowLeft':
      col = col-- <= minValue ? minValue : col--
  }
  return `[data-id="${row}:${col}"]`
}

