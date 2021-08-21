import './style.css'

import * as api from './src/api'

import { renderOneLine, renderTable } from './src/cars'

async function load(){
  const result = await api.GET()

  if(result.error) {
    alert(result.message)
    return
  }

  if(result.length === 0) {
    renderOneLine()
    return
  }
  result.forEach(car => renderTable(car))
}

load()
