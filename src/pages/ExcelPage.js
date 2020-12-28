import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/store/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {storage, debounce} from '@core/utils'
import {storageInitialState} from '@/redux/initialState'
import {Page} from '@core/Page'

export class ExcelPage extends Page {
  getRoot() {
    // console.log(this.param)
    const StorageName = param => {
      return `excel:${param || Date.now().toString()}`
    }

    const state = storage(StorageName(this.param))
    const store = createStore(rootReducer, storageInitialState(state))

    const stateListener = debounce(state => {
      // console.log('App State: ', state)
      storage(StorageName(this.param), state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }
  afterRender() {
    this.excel.init()
  }
  destroy() {
    this.excel.destroy()
  }
}
