const pokemonName = document.getElementById('pokemon-name');
const pokemonNumber = document.getElementById('pokemon-number');
const pokemonImage = document.getElementById('pokemon-image');

const form = document.getElementById('form');
const pokemonInput = document.getElementById('pokemon-input');

const buttonPrev = document.getElementById('btn-prev');
const buttonNext = document.getElementById('btn-next');

let searchPokemon = 1;

const fetchPokemon = async pokemon => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
  const data = await APIResponse.json()
  
  return data;
  }
}

const renderPokemon = async pokemon => {
  pokemonNumber.innerHTML = '';
  pokemonName.innerHTML = 'Loading...';
  pokemonImage.style.display = 'none';

  const data = await fetchPokemon(pokemon);

  if (data) {
  const {name, id, sprites} = data;

  const image = sprites['versions']['generation-v']['black-white']['animated']['front_default'];

  pokemonName.innerHTML = name;
  pokemonNumber.innerHTML = id;
  pokemonImage.style.display = 'block';
  pokemonImage.src = image;
  pokemonInput.value = '';

  searchPokemon = id;

  const audio = new Audio(`./cries/${id}.ogg`);
  audio.volume = 0.1;
  audio.play();

  } else
    pokemonName.innerHTML = 'Not found :(';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(pokemonInput.value.toLowerCase());
});

buttonPrev.addEventListener('click', (event) => {
  if (searchPokemon > 1) {    
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', (event) => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);