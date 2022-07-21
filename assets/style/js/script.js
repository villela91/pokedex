const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonTypes = document.querySelector('.pokemon__type');
const pokemonTypes2 = document.querySelector('.pokemon__type2');
const pokemonDescription = document.querySelector('.pokemon_description');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonInfo = document.querySelector('.btn-info');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }

}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  pokemonTypes.innerHTML= '';
  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonTypes.innerHTML= data.types[0].type.name;
    let type2 = ""
    try{type2 =  data.types[1].type.name;}
    catch(p){
      type2 = ''
    }
    pokemonTypes2.innerHTML= type2;
    
    pokemonImage.src = data['sprites']['other']['official-artwork']['front_default'];
   

    input.value = '';

    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});



async function description(){
  pokemonImage.style.display = 'none';
    const APIDes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber.innerText}`);
    const dataDes = await APIDes.json();
    pokemonDescription.innerText = dataDes.flavor_text_entries[7].flavor_text;  
console.log(dataDes)
}
renderPokemon(searchPokemon);