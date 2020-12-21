import {ExcelComponents} from '@core/ExcelComponents'

export class Header extends ExcelComponents {
    static className = 'excel__header'
    constructor(root,options) {
      super(root,{
        name: 'header',
        ...options
      });
    }

    ToHtml() {
      return `
        <input type="text" class="input" value="new table"/>
            <div>
                <div class="button">
                    <i class="material-icons">delete</i>
                </div>
                <div class="button">
                    <i class="material-icons">exit_to_app</i>
                </div>
            </div>`
    }
}
