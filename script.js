// Constantes
const baseURL = '/Pokemons.json';
const pokemonList = document.getElementById('pokemon-list');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');
const searchInput = document.getElementById('search');

// Obtener la lista de pokemones desde el JSON
async function getPokemons() {
  try {
    const response = await fetch(baseURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Mostrar la lista de pokemones en tarjetas
function showPokemonList(pokemons) {
  pokemonList.innerHTML = '';
  pokemons.forEach((pokemon) => {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    card.textContent = `${pokemon.name} (${pokemon.type.join(', ')})`;
    card.addEventListener('click', () => {
      showModal(pokemon);
    });
    pokemonList.appendChild(card);
  });
}

// Mostrar el modal con la información detallada del pokemon
function showModal(pokemon) {
  modalContent.innerHTML = `
    <h2>${pokemon.name}</h2>
    <p>Type: ${pokemon.type.join(', ')}</p>
    <p>Weight: ${pokemon.weight}</p>
  `;
  modal.style.display = 'block';
}

// Cerrar el modal al hacer clic en el botón de cierre
modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Filtrar pokemones por nombre
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );
  showPokemonList(filteredPokemons);
});

// Cargar la lista de pokemones y mostrarla al cargar la página
let pokemons = [];
getPokemons().then((data) => {
  pokemons = data;
  showPokemonList(pokemons);
});