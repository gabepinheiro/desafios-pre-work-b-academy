import './style.css'

import * as api from './src/api'

import { renderTable } from './src/cars'

window.addEventListener('load', () => load())

async function load(){
  try {
    const response = await api.GET()
    const data = await response.json()

    renderTable(data)

  } catch (error) {
    alert(error)
  }
}
