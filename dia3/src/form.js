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
