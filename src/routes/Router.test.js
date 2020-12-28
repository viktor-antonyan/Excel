import {Router} from './Router'
import {Page} from '../core/Page'

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'dashboard'
    return root
  }
}
class Excel extends Page {}

describe('Router:',()=>{
  let router
  let $root

  beforeEach(()=>{
    $root = document.createElement('div')
    router = new Router($root,{
      dashboard: DashboardPage,
      excel: Excel
    })
  })

  test('should be defined',()=>{
    expect(router).toBeDefined()
  })

  test('Should render dashboard page',()=>{
    router.changePageHandler()
    expect($root.innerHTML).toEqual('<div>dashboard</div>')
  })
})
