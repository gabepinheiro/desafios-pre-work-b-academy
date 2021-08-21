import './style.css'

import * as api from './src/api'

import { renderOneLine, renderTable } from './src/cars'

function load(){
  api.GET()
    .then((response) => response.ok && response.json())
    .then((data) => {
      console.log(data)
      if(data.length === 0) {
        renderOneLine()
        return
      }
      return data.forEach(car => renderTable(car))
    })
    .catch((error) => alert(error.message))
}

load()
