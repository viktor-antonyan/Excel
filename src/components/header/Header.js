import {$} from '@/core/Dom'
import {ExcelComponents} from '@core/ExcelComponents'
import {changeTitle} from '@/redux/actions'
import {defaultTitle} from '@/constants'

export class Header extends ExcelComponents {
    static className = 'excel__header'
    constructor(root,options) {
      super(root,{
        name: 'header',
        listener: ['input'],
        ...options
      });
    }

    ToHtml() {
      const title = this.store.getState().title || defaultTitle
      return `
        <input type="text" class="input" value="${title}"/>
            <div>
                <div class="button">
                    <i class="material-icons">delete</i>
                </div>
                <div class="button">
                    <i class="material-icons">exit_to_app</i>
                </div>
            </div>`
    }
    onInput(event) {
      const $target = $(event.target)
      this.$dispatch(changeTitle($target.text()))
    }
}
