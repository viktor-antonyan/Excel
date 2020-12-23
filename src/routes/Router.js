import {$} from '@core/dom'
import {ActiveRoute} from '@/routes/ActiveRoute'

export class Router {
  constructor(selector,routes) {
    if(!selector) {
      throw new Error('selector is not provided in router')
    }
    this.$placeholder = $(selector)
    this.routers = routes

    this.page = null

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }
  init() {
    window.addEventListener('hashchange',this.changePageHandler)
    this.changePageHandler()
  }
  changePageHandler() {
    if(this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear()

    const Page = ActiveRoute.path.includes('excel')?
    this.routers.excel:
    this.routers.dashboard

    this.page = new Page(ActiveRoute.param)
    this.$placeholder.append(this.page.getRoot())
    this.page.afterRender()
  }
  destroy() {
    window.removeEventListener('hashchange',this.changePageHandler)
  }
}
