//create an empty array on startup
let searchHistory = [];
const API_BASE = 'https://pokeapi.co/api/v2';
const API_POKEMON = `${API_BASE}/pokemon`;
const getPokemonImage = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
const HISTORY_STORAGE_KEY = 'HISTORY_KEY';

/**
 * generate a Pokemon tag
 */
function buildPokemonMarkup(pokemon) {
    return `<div class="pokemon_item"><img class="pokemon_image" src=${getPokemonImage(pokemon.id)} />
        <h2 class="pokemon_name">${pokemon.forms[0].name}</h2>
        <p class="pokemon_description">${pokemon.weight}</p></div>`;
}

function buildPokemonHistory() {
    let history = '';
    searchHistory.forEach(pokemon => {
        history += `<div class="pokemon_item"><img class="pokemon_image" src=${getPokemonImage(pokemon.id)} />
        <h2 class="pokemon_name">${pokemon.forms[0].name}</h2>
        <p class="pokemon_description">${pokemon.weight}</p></div>`;
    });
    return history
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
    updatePokemonHistoryTag();
}

/**
 * Update DOM
 */
function updatePokemonHistoryTag() {
    document.querySelector('#history').innerHTML = buildPokemonHistory();
}

/**
 * loadAnpokemon from the internet and place it on a target element
 */
async function onSearchClickAsync() {
    let targetElementId = '#main_pokemon';
    let pokemonId = document.querySelector("#search_input").value;
    try {
        const response = await fetch(`${API_POKEMON}/${pokemonId}`);
        if (!response.ok) {
            return;
        }
        let pokemon = await response.json();
        console.log("pokemon", pokemon);
        document.querySelector(targetElementId).innerHTML = buildPokemonMarkup(pokemon);

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
    let history = getLocalHistory()
    if (history !== null) {
        // Set the searchHistory array and update the display
        searchHistory = history
        searchHistory.forEach(() => updatePokemonHistoryTag())
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
