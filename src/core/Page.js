export class Page {
  constructor(param) {
    this.param = param
  }
  getRoot() {
    throw new Error('method getRoot should be implemented ')
  }
  afterRender() {}
  destroy() {}
}
