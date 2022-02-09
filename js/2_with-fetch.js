import API from './api-service.js';
import getRefs from './get-refs.js';

const refs = getRefs();

refs.fetchBtn.addEventListener('click', onFetch);
refs.sortByWeightBtn.addEventListener('click', sortByWeight);
refs.sortByHeightBtn.addEventListener('click', sortByHeight);

async function onFetch() {
  API.fetchTenPokemons().then(getEachPokemonData).catch(onFetchError);
}

function getEachPokemonData({ results }) {
  const promises = results.map(pokemon =>
    API.fetchPokemon(pokemon.name).then(pokemon => ({
      name: pokemon.name,
      weight: pokemon.weight,
      height: pokemon.height,
      id: pokemon.id,
    })),
  );
  Promise.all(promises).then(savePokemonData);
}

function LSGet(name) {
  return JSON.parse(localStorage.getItem(name));
}

function SSSet(name, data) {
  sessionStorage.setItem(name, JSON.stringify([...data]));
}

function savePokemonData(data) {
  localStorage.setItem('pokemons', JSON.stringify([...data]));
}

function sortByWeight() {
  const pokemons = LSGet('pokemons') || [];
  const sortedByWeight = pokemons.sort((a, b) => b.weight - a.weight);
  SSSet('pokemons', sortedByWeight);
  console.log(sortedByWeight);
}

function sortByHeight() {
  const pokemons = LSGet('pokemons') || [];
  const sortedByHeight = pokemons.sort((a, b) => b.height - a.height);
  SSSet('pokemons', sortedByHeight);
  console.log(sortedByHeight);
}

function onFetchError(error) {
  alert('No pokemons!');
}
