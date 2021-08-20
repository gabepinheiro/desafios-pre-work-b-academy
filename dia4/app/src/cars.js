import * as api from './api'

const form = document.querySelector('[data-js="cars-form"]')
const table = document.querySelector('[data-js="tbody-cars"]')
const dialog = document.querySelector('[data-js="dialog"]')

const getFormElement = e => elementName => {
  return e.target.elements[elementName]
}

const elementTypes = {
  image: createImage,
  text: createText,
  color: createColor
}

function createImage(value){
  const td = document.createElement('td')
  const img = document.createElement('img')
  img.src = value
  img.width = 100
  td.appendChild(img)

  return td
}

function createText(value){
  const td = document.createElement('td')
  td.textContent = value

  return td
}

function createColor(value){
  const td = document.createElement('td')
  const div = document.createElement('div')
  div.style.width = '100px'
  div.style.height = '100px'
  div.style.background = value
  td.appendChild(div)

  return td
}

form.addEventListener('submit',  (e) =>  {
  e.preventDefault()

  const getElement = getFormElement(e)

  const car = {
    image: getElement('image').value,
    brandModel: getElement('brand-model').value,
    year: getElement('year').value,
    plate: getElement('plate').value,
    color: getElement('color').value
  }

  api.POST(car)
    .then(async (response) => {
      if(response.ok) {
        const result = await response.json()

        dialog.className = `${dialog.className} sucess`
        dialog.textContent = result.message

        return api.GET().then((response) => response.ok && response.json())
      }

      const result = await response.json()
      throw new Error(result.message)
    })
    .then((data) => {
      table.innerHTML = ''
      data.forEach(car => renderTable(car))
      clearFields(e)
    })
    .catch(error => {
      dialog.className = `${dialog.className} error`
      dialog.textContent = error.message
    })
})

const setAttribute = (attribute, value) => (element) => {
   element.setAttribute(attribute, value)
   return element
}

export function renderOneTd(){
  const tr = document.createElement('tr')

  const tdWithColspan = setAttribute('colspan', 5)
  tr.appendChild(tdWithColspan(createText("Nenhum carro encontrado.")))

  table.appendChild(tr)
}

export function renderTable(car){

  const elements = [
    {type: 'image', value: car.image},
    {type: 'text', value: car.brandModel},
    {type: 'text', value: car.year},
    {type: 'text', value: car.plate},
    {type: 'color', value: car.color}
  ]

  const tr = document.createElement('tr')
  elements.forEach(element => {
    const td = elementTypes[element.type](element.value)
    tr.appendChild(td)
  })

  table.appendChild(tr)
}

function clearFields(e) {
  e.target.reset()
  getFormElement(e)('image').focus()
}
