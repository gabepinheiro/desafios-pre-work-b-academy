const form = document.querySelector('[data-js="cars-form"]')
const table = document.querySelector('[data-js="tbody-cars"]')

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

form.addEventListener('submit', e => {
  e.preventDefault()

  clearFields(e)

})

const setAttribute = (attribute, value) => (element) => {
   element.setAttribute(attribute, value)
   return element
}

export function renderTable(data){
  if(data.length === 0) {
    const tr = document.createElement('tr')

    const tdWithColspan = setAttribute('colspan', 5)
    tr.appendChild(tdWithColspan(createText("Nenhum carro encontrado.")))

    table.appendChild(tr)

    return
  }
  // const getElement = getFormElement(e)

  // const elements = [
  //   {type: 'image', value: getElement('image').value},
  //   {type: 'text', value: getElement('brand-model').value},
  //   {type: 'text', value: getElement('year').value},
  //   {type: 'text', value: getElement('plate').value},
  //   {type: 'color', value: getElement('color').value}
  // ]

  // const tr = document.createElement('tr')
  // // elements.forEach(element => {
  // //   const td = elementTypes[element.type](element.value)
  // //   tr.appendChild(td)
  // // })

  // table.appendChild(tr)
}

function clearFields(e) {
  e.target.reset()
  getFormElement(e)('image').focus()
}
