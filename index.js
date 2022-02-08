import API from './js/api-service.js';
import getRefs from './js/get-refs.js';

const refs = getRefs();

refs.fetchBtn.addEventListener('click', onFetch);
// contacts: JSON.parse(localStorage.getItem('contacts')) || [],
// localStorage.setItem('contacts', JSON.stringify([...contacts]));

async function onFetch() {
  // e.preventDefault();
  API.fetchTenPokemons()
    .then(getEachPokemonData)
    .then(savePokemonData)
    .catch(onFetchError);
}

async function getEachPokemonData({ results }) {
  let array = new Array();
  await results.map(pokemon =>
    API.fetchPokemon(pokemon.name).then(pokemon =>
      array.push(
        { ...pokemon },
        // {
        // name: pokemon.name,
        // weight: pokemon.weight,
        // height: pokemon.height,
        // }
      ),
    ),
  );
  // console.log(array);
  return array;
}

async function savePokemonData(data) {
  console.dir(data);
  localStorage.setItem('pokemons', await JSON.stringify([...data]));
}

function onFetchError(error) {
  alert('No pokemons!');
}

// const asyncLocalStorage = {
//   setItem: async function (key, value) {
//     await null;
//     return localStorage.setItem(key, value);
//   },
//   getItem: async function (key) {
//     await null;
//     return localStorage.getItem(key);
//   },
// };
// console.log(
//   JSON.stringify([
//     { name: 'bulbasaur', weight: 69, height: 7 },
//     { name: 'charmander', weight: 85, height: 6 },
//     { name: 'venusaur', weight: 1000, height: 20 },
//     { name: 'charizard', weight: 905, height: 17 },
//     { name: 'ivysaur', weight: 130, height: 10 },
//     { name: 'squirtle', weight: 90, height: 5 },
//     { name: 'charmeleon', weight: 190, height: 11 },
//     { name: 'wartortle', weight: 225, height: 10 },
//     { name: 'blastoise', weight: 855, height: 16 },
//     { name: 'caterpie', weight: 29, height: 3 },
//   ]),
// );
