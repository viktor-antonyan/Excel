import {storage} from '@core/utils'

function toHtml(key) {
  const model = storage(key)
  const id = key.split(':')[1]
  return`
    <li class="db__record">
      <a href="#excel/${id}">${model.title}</a>
      <strong>
        ${new Date(model.openedDate).toLocaleDateString()}
        ${new Date(model.openedDate).toLocaleTimeString()}
      </strong>
    </li>
    `
}

function getAllKey() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if(key.startsWith('excel')) {
      keys.push(key)
    }
    continue
  }
  return keys
}


export function createRecordsTable() {
  const keys = getAllKey()
  // console.log('keys',keys)
  if(!keys.length) {
    return `<p>we haven't created any tables yet</p>`
  }
  return`   
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
   ${keys.map(toHtml).join('')}
    </ul>
   `
}
