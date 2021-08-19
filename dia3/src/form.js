const $Form = document.querySelector('[data-js="form"]')
const $InputName = document.querySelector('[data-js="name"]')

const filterWords = word => {
  return word === "de" || word === "da" || word === "do" || word === "dos"
}

const capitalizeName = (name) => {
  return name.map(word =>  {
    if (!filterWords(word)) {
      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
    }

    return word
  }).join(' ')
}

$InputName.addEventListener('input', e => {
  e.target.value = capitalizeName(e.target.value.toLowerCase().split(' '))
})

const renderSelect = () => {
  const divSelect = document.createElement('div')

  const select = document.createElement('select')
  select.setAttribute('multiple', '')
  select.setAttribute('data-js', 'colors-select')

  select.addEventListener('change', renderColorsSelect)

  const colors = ['blue', 'green', 'red', 'black', 'yellow']
  colors.forEach((color) => {
    const option = document.createElement('option')
    option.setAttribute('value', color)
    option.textContent = color

    select.appendChild(option)
  })

  divSelect.appendChild(select)

  $Form.appendChild(divSelect)
}


const renderColorsSelect = (e) => {
  let container = document.querySelector('[data-js="container-colors"]')

  if(!!container){
    container.innerHTML = ''
  } else {
    container = document.createElement('div')
    container.setAttribute('data-js', 'container-colors')
    container.className = 'container-colors'
  }

  const $ColorsSelect = document.querySelector('[data-js="colors-select"]')

  Array.from($ColorsSelect.selectedOptions).forEach(el => {
    const boxColor = document.createElement('div')
    boxColor.className = `box-color ${el.value}`

    container.appendChild(boxColor)
  })

  $Form.appendChild(container)
}

renderSelect()
