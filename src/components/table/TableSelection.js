export class TableSelection {
  constructor() {
    this.group = []
    this.current = null
  }
  select($el) {
    this.clear()
    this.group.push($el)
    $el.focus().addClass('selected')
    this.current = $el
  }
  clear() {
    this.group.forEach($el=>$el.removeClass('selected'))
    this.group = []
  }
  selectGroup(blocks = []) {
    this.clear()
    this.group = blocks
    this.group.forEach(el => el.addClass('selected'))
  }
}
