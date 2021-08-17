import './style.css'

const $App = document.querySelector('[data-js=app]')
const $Link = document.querySelector('[data-js=link]')

$App.innerHTML = `
  <h1>B. Academy</h1>
  <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`

$Link.addEventListener('click', (event) => {
  event.preventDefault()

  $App.classList.toggle('isHidden')
})
