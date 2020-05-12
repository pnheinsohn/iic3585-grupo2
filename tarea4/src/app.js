//create an empty array on startup
let currentPokemon;
let searchHistory = [];
const API_BASE = 'https://pokeapi.co/api/v2';
const API_POKEMON = `${API_BASE}/pokemon`;
const getPokemonImage = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
const HISTORY_STORAGE_KEY = 'HISTORY_KEY';

/**
 * generate a Pokémon tag
 */
function buildPokemonMarkup(pokemon) {
    currentPokemon = pokemon;
    const main_pokemon = document.querySelector('#main_pokemon');
    const pokemon_item = document.createElement('div');
    const pokemon_stats = document.createElement('table');

    main_pokemon.innerHTML = '';

    pokemon_item.addEventListener('click', addToWishlist);
    pokemon_item.className = 'pokemon_item';
    pokemon_item.innerHTML =
        `<img class="pokemon_image" src=${getPokemonImage(pokemon.id)} />
        <h6 class="pokemon_name">${pokemon.name}</h6>`;

    pokemon_stats.innerHTML =
        `<tr>
            <td><span><strong>Hp:</strong> ${pokemon.stats[5].base_stat}</span></td>
            <td><span><strong>Atk:</strong> ${pokemon.stats[4].base_stat}</span></td>
            <td><span><strong>Def:</strong> ${pokemon.stats[3].base_stat}</span></td>
        </tr>
        <tr>
            <td><span><strong>Speed:</strong> ${pokemon.stats[0].base_stat}</span></td>
            <td><span><strong>Special Atk:</strong> ${pokemon.stats[2].base_stat}</span></td>
            <td><span><strong>Special Def:</strong> ${pokemon.stats[1].base_stat}</span></td>
        </tr>`;

    main_pokemon.appendChild(pokemon_item);
    main_pokemon.appendChild(pokemon_stats);
}

/**
 * generate all searched Pokémon imgs
 */
function buildPokemonHistory() {
    const history = document.querySelector('#history');
    history.innerHTML = '';
    searchHistory.forEach((pokemon, index) => {
        const pokemon_item = document.createElement("div");
        pokemon_item.addEventListener("click", function() {
            buildPokemonMarkup(searchHistory[index]);
            updateHistory(searchHistory[index]);
        });
        pokemon_item.innerHTML +=
            `<div class="pokemon_item">
                <img class="pokemon_image" src=${getPokemonImage(pokemon.id)} />
                <h6 class="pokemon_name">${pokemon.name}</h6>
            </div>`;
        history.appendChild(pokemon_item);
    });
    return;
}

/**
 * Adds to wishlist
 */
function addToWishlist() {
    console.log(currentPokemon);
}

/**
 * Moves an element of an array to a specific index
 */
function move(input, from, to) {
    while (from < 0) {
        from += input.length;
    }
    while (to < 0) {
        to += input.length;
    }
    if (to >= input.length) {
        let k = to - input.length;
        while ((k--) + 1) {
            input.push(undefined);
        }
    }
    input.splice(to, 0, input.splice(from, 1)[0]);
   return input;
}

/**
 * add an pokemon to the history and updates display
 */
function updateHistory(pokemon) {
    let prevIndex = -1;
    searchHistory.forEach((pkmn, index) => {
        if (_.isEqual(pkmn, pokemon)) {
            prevIndex = index;
        }
    });

    if (prevIndex != -1) {
        searchHistory = move(searchHistory, prevIndex, 0);
    } else {
        searchHistory.unshift(pokemon);
    }
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(searchHistory));
    buildPokemonHistory();
}

/**
 * loadAnpokemon from the internet and place it on a target element
 */
async function onSearchClickAsync() {
    let pokemonId = document.querySelector("#search_input").value;
    try {
        const response = await fetch(`${API_POKEMON}/${pokemonId}`);
        if (!response.ok) {
            return;
        }
        let pokemon = await response.json();
        pokemon.name = pokemon.forms[0].name[0].toUpperCase() + pokemon.forms[0].name.slice(1);
        buildPokemonMarkup(pokemon);
        updateHistory(pokemon);
    } catch (err) {
        console.error(`error ${err}`);
    }
}

/**
 * The history is serialized as a JSON array. We use JSON.parse to convert is to a Javascript array
 */
function getLocalHistory() {
    return JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY))
}

async function onLoadAsync() {
    // Load the history from cache
    let history = getLocalHistory();
    if (history !== null) {
        // Set the searchHistory array and update the display
        searchHistory = history;
        searchHistory.forEach(updateHistory);
    }

    // Install the service worker
    if ('serviceWorker' in navigator) {
        try {
            let serviceWorker = await navigator.serviceWorker.register('/sw.js')
            console.log(`Service worker registered ${serviceWorker}`)
        } catch (err) {
            console.error(`Failed to register service worker: ${err}`)
        }
    }
}
