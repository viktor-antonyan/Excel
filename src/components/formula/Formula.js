import {ExcelComponents} from '@core/ExcelComponents'

export class Formula extends ExcelComponents {
  static className = 'excel__formula'
  constructor(root) {
    super(root,{
      name: 'formula',
      listener: ['input','click']
    });
  }
  ToHtml() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable="true" spellcheck="false"></div>
`;
  }
  onInput(event) {
    console.log('formula',event.target.textContent)
  }
  onClick() {
    console.log('click')
  }
}
