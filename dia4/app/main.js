import './style.css'

import * as api from './src/api'

import { renderOneTd, renderTable } from './src/cars'

window.addEventListener('load', () => load())

function load(){
  api.GET()
    .then((response) => response.ok && response.json())
    .then((data) => {
      console.log(data)
      if(data.length === 0) {
        renderOneTd()
        return
      }
      return data.forEach(car => renderTable(car))
    })
    .catch((error) => alert(error.message))
}
