const pokemonName = document.getElementById('pokemon-name');
const pokemonNumber = document.getElementById('pokemon-number');
const pokemonImage = document.getElementById('pokemon-image');

const form = document.getElementById('form');
const pokemonInput = document.getElementById('pokemon-input');

const fetchPokemon = async pokemon => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

  const data = await APIResponse.json()
  
  return data;
}

const renderPokemon = async pokemon => {
  const {name, id, sprites} = await fetchPokemon(pokemon);

  const image = sprites['versions']['generation-v']['black-white']['animated']['front_default'];

  pokemonName.innerHTML = name;
  pokemonNumber.innerHTML = id;
  pokemonImage.src = image;
  pokemonInput.value = '';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(pokemonInput.value);
});