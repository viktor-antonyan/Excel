import {createStore} from './createStore'

const initialState = {
  count: 0
}

const reducer = (state = initialState,action) =>{
  if(action.type === 'ADD') {
    return {...state, count: state.count + 1}
  }
  return state
}

describe('createStore',()=>{
  let store
  let handler
  beforeEach(()=>{
    store = createStore(reducer,initialState)
    handler = jest.fn()
  })

  test('Should return store object',()=>{
    expect(store). toBeDefined()
    expect(store.dispatch).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.getState).toBeDefined()
  })

  test('Should return object as a state',()=>{
    expect(store.getState()).toBeInstanceOf(Object)
  })

  test('Should return default state',()=>{
    expect(store.getState()).toEqual(initialState)
  })

  test('Should change state id action exists',()=>{
    store.dispatch({type: 'ADD'})
    expect(store.getState().count).toBe(1)
  })

  test('Should not change state id action don\'t exists',()=>{
    store.dispatch({type: 'ADD_NOT'})
    expect(store.getState().count).toEqual(0)
  })

  test('Should call subscriber function',()=>{
    store.subscribe(handler)
    store.dispatch({type: 'ADD'})
    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(store.getState())
  })

  test('Should not call sub if unsubscribe',()=>{
    const sub = store.subscribe(handler)
    sub.unsubscribe()
    store.dispatch({type: 'ADD'})
    expect(handler).not.toHaveBeenCalled()
  })

  test('Should dispatch in async way', ()=>{
    return new Promise(resolve => {
      setTimeout(()=>{
        store.dispatch({type: 'ADD'})
      },300)
      setTimeout(()=>{
        expect(store.getState().count).toBe(1)
        resolve()
      },900)
    })
  })
})
