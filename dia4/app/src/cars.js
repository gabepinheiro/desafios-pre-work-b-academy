import * as api from './api'

const form = document.querySelector('[data-js="cars-form"]')
const table = document.querySelector('[data-js="tbody-cars"]')
const dialog = document.querySelector('[data-js="dialog"]')

const getFormElement = e => elementName => {
  return e.target.elements[elementName]
}

const createAttribute = (attribute, value) => (element) => {
  element.setAttribute(attribute, value)
  return element
}

const elementTypes = {
  image: createImage,
  text: createText,
  color: createColor,
  button: createButton
}

function createButton(value){
  const td = document.createElement('td')
  const btn = document.createElement('button')

  btn.addEventListener('click', deleteCar)

  btn.textContent = 'Delete'
  const btnWithAttributeValue = createAttribute('value', value)
  td.appendChild(btnWithAttributeValue(btn))

  return td
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

async function deleteCar(e) {
  const car = {
    plate: e.currentTarget.value
  }

  const result = await api.DELETE(car)

  if(result.error) {
    dialog.className = 'dialog error'
    dialog.textContent = error.message
    return
  }

  dialog.className = 'dialog success'
  dialog.textContent = result.message

  const resultNewCars = await api.GET()

  table.innerHTML = ''

  resultNewCars.length === 0
      ? renderOneLine()
      : resultNewCars.forEach(car => renderTable(car))
}

form.addEventListener('submit',  async (e) =>  {
  e.preventDefault()

  const getElement = getFormElement(e)

  const car = {
    image: getElement('image').value,
    brandModel: getElement('brand-model').value,
    year: getElement('year').value,
    plate: getElement('plate').value,
    color: getElement('color').value
  }

  const result = await api.POST(car)

  if(result.error) {
    dialog.className = 'dialog error'
    dialog.textContent = result.message
    return
  }

  dialog.className = 'dialog success'
  dialog.textContent = result.message

  const resultNewCars = await api.GET()

  table.innerHTML = ''
  resultNewCars.forEach(car => renderTable(car))

  clearFields(e)
})

export function renderOneLine(){
  const tr = document.createElement('tr')

  const tdWithColspan = createAttribute('colspan', 6)
  tr.appendChild(tdWithColspan(createText("Nenhum carro encontrado.")))

  table.appendChild(tr)
}

export function renderTable(car){

  const elements = [
    {type: 'image', value: car.image},
    {type: 'text', value: car.brandModel},
    {type: 'text', value: car.year},
    {type: 'text', value: car.plate},
    {type: 'color', value: car.color},
    {type: 'button', value: car.plate}
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
