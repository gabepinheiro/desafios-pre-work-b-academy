const $FormCars = document.querySelector('[data-js="cars"]')

let cars = []

const formField = e => name => e.target.elements[name].value

$FormCars.addEventListener('submit', e => {
  e.preventDefault()

  const getFieldValue = formField(e)

  const car = {
    image: getFieldValue('car-image'),
    'marca-modelo': getFieldValue('marca-modelo'),
    ano: getFieldValue('ano'),
    placa: getFieldValue('placa'),
    cor: getFieldValue('cor')
  }

  cars = [...cars, car]

  renderCars()

  clearFields(e.currentTarget)

  console.log(cars)
})

function renderCars(){
  const $Tbody = document.querySelector('[data-js="table-cars"] tbody')

  $Tbody.innerHTML = ''

  cars.forEach(car => {
    const tr = document.createElement('tr')

    const tdImage = document.createElement('td')
    const img = document.createElement('img')
    img.src = car.image
    img.className = 'td-img'
    tdImage.appendChild(img)
    tr.appendChild(tdImage)

    const tdMarcaModelo = document.createElement('td')
    tdMarcaModelo.textContent = car['marca-modelo']
    tr.appendChild(tdMarcaModelo)

    const tdAno = document.createElement('td')
    tdAno.textContent = car.ano
    tr.appendChild(tdAno)

    const tdPlaca = document.createElement('td')
    tdPlaca.textContent = car.placa
    tr.appendChild(tdPlaca)

    const tdCor = document.createElement('td')
    tdCor.textContent = car.cor
    tr.appendChild(tdCor)

    $Tbody.appendChild(tr)
  })

}

function clearFields(form) {
  Array.from(form.elements).forEach(field => field.value = '')
  form.elements['car-image'].focus()
}
