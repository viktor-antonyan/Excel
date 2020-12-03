import {ExcelComponents} from '@core/ExcelComponents'
import {createTable} from '@/components/table/createTable';

export class Table extends ExcelComponents {
  static className = 'excel__table'
  ToHtml() {
    return createTable(20)
  }
}
