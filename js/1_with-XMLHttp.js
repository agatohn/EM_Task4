import API from './api-service-XML.js';
import getRefs from './get-refs.js';

const refs = getRefs();

refs.fetchBtn.addEventListener('click', onFetch);
refs.sortByWeightBtn.addEventListener('click', sortByWeight);
refs.sortByHeightBtn.addEventListener('click', sortByHeight);
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

async function onFetch() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `${BASE_URL}?limit=10`);
  xhr.responseType = 'json';
  xhr.send();
  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`, true);
    } else {
      const responce = xhr.response;
      storeFullPokemonData(responce.results);
    }
  };
}

function storeFullPokemonData(results) {
  let collectedData = [];
  let counter = 0;
  results.forEach(item => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${BASE_URL}/${item.name}`);
    xhr.responseType = 'json';
    xhr.send();
    console.log('after send');
    xhr.onload = function () {
      console.log('onload', [...collectedData]);
      counter += 1;
      if (xhr.status != 200) {
        console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`, false);
      } else if (xhr.readyState == 4 && xhr.status == 200) {
        const responce = xhr.response;
        collectedData.push({
          name: responce.name,
          weight: responce.weight,
          height: responce.height,
          id: responce.id,
        });
      }
      console.log('counter', counter);
      if (counter === results.length) {
        console.log('if', [...collectedData]);

        savePokemonData(collectedData);
      }
    };
  });
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
