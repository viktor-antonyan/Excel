import {$} from '@core/Dom'
import {ExcelComponents} from '@core/ExcelComponents'
import {createTable} from '@/components/table/createTable'
import {tableResize} from '@/components/table/tableResize'
import {isCell, shouldTable, matrix, next} from './functionUtil'
import {TableSelection} from '@/components/table/TableSelection'
import * as actions from '@/redux/actions'
import {changeTableText} from '@/redux/actions'
import {defaultStyles} from '@/constants'
import {parse} from '@/core/parse'

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
    return createTable(20,this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init();
    const cell = this.root.find('[data-id="0:0"]')
    this.selectCell(cell)

    this.$on('formula:input',text=>{
      this.selection.current
          .attr('data-value',text)
          .text(parse(text))
      this.changeText(text)
    })

    this.$on('formula:done',()=>{
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle',value=>{
      this.selection.toolbarStyle(value)
      //
      this.$dispatch(actions.applyStyles({
        value,
        ids: this.selection.selectIds()
      }))
    })
  }
  selectCell(cell) {
    this.selection.select(cell)
    this.$emit('table:select',cell)
    const styles = cell.getStyles(Object.keys(defaultStyles))
    // console.log('stylesDispatch',styles)
    this.$dispatch(actions.currentStyle(styles))
  }
  async colResize(event) {
    try{
      const data = await tableResize(this.root, event)
      this.$dispatch(actions.tableResize(data))
    }catch (e) {
      console.warn(e.message)
    }
  }
  onMousedown(event) {
    if(shouldTable(event)) {
      this.colResize(event)
    } else if(isCell(event)) {
      const $target = $(event.target)
      if(event.shiftKey) {
        const blocks = matrix($target,this.selection.current)
            .map(id=>this.root.find(`[data-id="${id}"]`))

        this.selection.selectGroup(blocks)
      }else {
        this.selectCell($target)
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
  changeText(value) {
    this.$dispatch(changeTableText({
      id: this.selection.current.id(),
      value
    }))
  }
  onInput(event) {
    this.changeText($(event.target).text())
  }
}
