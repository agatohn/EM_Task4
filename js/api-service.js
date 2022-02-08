const BASE_URL = 'https://pokeapi.co/api/v2';

function fetchPokemon(pokemonName) {
  return fetch(`${BASE_URL}/pokemon/${pokemonName}`).then(response =>
    response.json(),
  );
}

function fetchTenPokemons() {
  return fetch(`${BASE_URL}/pokemon?limit=10`).then(response =>
    response.json(),
  );
}

export default { fetchPokemon, fetchTenPokemons };
