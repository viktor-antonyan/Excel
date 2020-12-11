import {$} from '@core/Dom';
import {ExcelComponents} from '@core/ExcelComponents'
import {createTable} from '@/components/table/createTable';
import {tableResize} from '@/components/table/tableResize';
import {isCell, shouldTable, matrix, next} from './functionUtil';
import {TableSelection} from '@/components/table/TableSelection';

export class Table extends ExcelComponents {
  static className = 'excel__table'

  constructor(root,options) {
    super(root,{
      name: 'table',
      listener: ['mousedown','keydown','input'],
      ...options
    })
  }

  ToHtml() {
    return createTable(20)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init();
    const cell = this.root.find('[data-id="0:0"]')
    this.selectCell(cell)


    this.$on('formula:input',text=>{
      this.selection.current.text(text)
    })

    this.$on('formula:done',()=>{
      this.selection.current.focus()
    })
  }
  selectCell(cell) {
    this.selection.select(cell)
    this.$emit('table:select',cell)
  }

  onMousedown(event) {
    if(shouldTable(event)) {
      tableResize(this.root, event)
    } else if(isCell(event)) {
      const $target = $(event.target)
      if(event.shiftKey) {
        const blocks = matrix($target,this.selection.current)
            .map(id=>this.root.find(`[data-id="${id}"]`))

        this.selection.selectGroup(blocks)
      }else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(event) {
    const keys=[
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight'
    ]
    const {key} = event
    if(keys.includes(key) && ! event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true);
      const $next = this.root.find(next(key,id))
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.$emit('table:input',$(event.target))
  }
}
