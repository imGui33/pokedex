const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_img')
const form = document.querySelector('.form')
const inputSearch = document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

// pokemon_number
// pokemon_name

let seachPokemon = 1
const fetchPokemon = async (pokemon) => {

  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  const data = await APIResponse.json()
  return data
}
const renderPokemon = async (pokemon) => {


  try {
    const data = await fetchPokemon(pokemon)
    seachPokemon = data.id
    console.log(seachPokemon)
    pokemonImage.style.display = 'block'

    pokemonName.innerHTML = data.name[0].toUpperCase() + data.name.substring(1)
    pokemonNumber.innerHTML = data.id
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']


    inputSearch.value = ''

  } catch {
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = 'Não Existe :('
    pokemonNumber.innerHTML = ''
  }
}


form.addEventListener('submit', (event) => {
  if (isNaN(inputSearch.value) == false) {
    seachPokemon = Number(inputSearch.value)
    console.log(seachPokemon)
  }



  event.preventDefault()
  renderPokemon(inputSearch.value.toLowerCase())
})
buttonPrev.addEventListener('click', () => {

  seachPokemon -= 1
  renderPokemon(seachPokemon)

})
buttonNext.addEventListener('click', () => {
  console.log(seachPokemon)
  seachPokemon += 1
  renderPokemon(seachPokemon)

})

renderPokemon(seachPokemon)