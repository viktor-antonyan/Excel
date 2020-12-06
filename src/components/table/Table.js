import {ExcelComponents} from '@core/ExcelComponents'
import {createTable} from '@/components/table/createTable';
import {tableResize} from '@/components/table/tableResize';
import {shouldTable} from '@/components/table/functionUtil';

export class Table extends ExcelComponents {
  static className = 'excel__table'

  constructor(root) {
    super(root, {
      name: 'table',
      listener: ['mousedown']
    })
  }

  ToHtml() {
    return createTable(20)
  }

  onMousedown(event) {
    if(shouldTable(event)) {
      tableResize(this.root,event)
    }
  }
}

