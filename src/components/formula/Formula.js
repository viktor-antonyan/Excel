import {ExcelComponents} from '@core/ExcelComponents'

export class Formula extends ExcelComponents {
  static className = 'excel__formula'
  constructor(root,options) {
    super(root,{
      name: 'formula',
      listener: ['input','keydown'],
      ...options
    });
  }

  ToHtml() {
    return `
      <div class="info">fx</div>
      <div id="tInput" class="input" contenteditable="true" spellcheck="false">
      
</div>
`;
  }
  init() {
    super.init();
    this.formula = this.root.find('#tInput')

    this.$on('table:select',(next)=>{
      this.formula.text(next.text())
    })
    this.$on('table:input',(next)=>{
      this.formula.text(next.text())
    })
  }

  onInput(event) {
    const text = event.target.textContent
    this.$emit('formula:input',text)
  }
  onKeydown(event) {
    const eventKEy = ['Enter','Tab']
    if(eventKEy.includes(event.key)) {
      event.preventDefault()
      this.emitter.emit('formula:done')
    }
  }
}
