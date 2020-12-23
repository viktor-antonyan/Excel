import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {changeTitle} from '@/redux/actions'
import {defaultTitle} from '@/constants'
import {debounce} from '@core/utils'
import {ActiveRoute} from '@/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input','click'],
      ...options,
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input type="text" class="input" value="${title}" />

      <div>

        <div class="button" data-button = 'delete'>
          <i class="material-icons" data-button = 'delete'>delete</i>
        </div>

        <div class="button" data-button = 'exit'>
          <i class="material-icons" data-button = 'exit'>exit_to_app</i>
        </div>

      </div>
    `
  }
  onClick(event) {
    const $target = $(event.target)
    const button = $target.data.button 
    if(button === 'exit') {
      ActiveRoute.navigate('')
    }else if(button === 'delete') {
      const confirmMessage = confirm('do you really want to delete the table?')
      if(confirmMessage) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`)
        ActiveRoute.navigate('')
      }
    }
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
}
