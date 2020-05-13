//create an empty array on startup
let currentPokemon;
let searchHistory = [];
let favoritesList = [];
const API_BASE = 'https://pokeapi.co/api/v2';
const API_POKEMON = `${API_BASE}/pokemon`;
const getPokemonImage = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
const HISTORY_STORAGE_KEY = 'HISTORY_KEY';
const FAVORITES_STORAGE_KEY = 'FAVORITES_KEY';

const config = {
    apiKey: "AIzaSyB3sarzfkTFGF3HQfQBDm5lpFlLvlEceDE",
    authDomain: "pokemon-9f063.firebaseapp.com",
    databaseURL: "https://pokemon-9f063.firebaseio.com",
    projectId: "pokemon-9f063",
    storageBucket: "pokemon-9f063.appspot.com",
    messagingSenderId: "12179098135",
    appId: "1:12179098135:web:96b019881354d45bde2a52",
    measurementId: "G-D2ZGJ7NM96"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

await new Promise(r => setTimeout(r, 13000));
messaging
    .getToken()
    .then(token => {
        console.log(token);
        
        body = {
            notification: {
                title: "Nuevos Pokemones",
                body: "¡Encuentra ya a los nuevos pokemones legendarios!",
                click_action: "https://pokemon-9f063.web.app",
                icon: "https://pokemon-9f063.web.app/icons/pokeball_512.png"
            },
            to: "dnU2806x36MY2Cg63h8eQl:APA91bH8L_ekOtYKltXgZeqZegDV1wXfoAxO7mnBvFp2-r54aQOKuqw5WctBsUdA6bH_qA7prdfR9p0MIFJGEvY7vxlO_cfBk_9_f3IntecJCeR6X4jo5T4Jpa4kFZsaBTrxAvydhNi1"
        }

        const options = {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAAtXuShc:APA91bHlgb5Z33CwQpnebRBkhuspsKvrxtsN32lPoiFAdT9QG-8IHK8aLcqh-0vWIBaOyRp8HUkSJoe_u8x8oUFHUUSrghoydhZZ1sUTmAg1f7gQ_3ohTlGxAFzjjFPOaH2ASs1bAjeu'
            },
            body: JSON.stringify(body)
        }
        
        fetch("https://fcm.googleapis.com/fcm/send", options)
});


messaging
    .requestPermission()
    .then(() => {
    //message.innerHTML = "Notifications allowed";
    return messaging.getToken();
    })
    .then(token => {
    //tokenString.innerHTML = "Token Is : " + token;
    })
    .catch(err => {
    //errorMessage.innerHTML = errorMessage.innerHTML + "; " + err;
    console.log("No permission to send push", err);
    });

messaging.onMessage(payload => {
    console.log("Message received. ", payload);
    const { title, ...options } = payload;
});

/**
 * generate a Pokémon tag
 */
function buildPokemonMarkup(pokemon) {
    currentPokemon = pokemon;
    const main_pokemon = document.querySelector('#main_pokemon');
    const pokemon_item = document.createElement('div');
    const pokemon_stats = document.createElement('table');

    main_pokemon.innerHTML = '';

    pokemon_item.addEventListener('click', addToFavorites);
    pokemon_item.className = 'pokemon_item';
    pokemon_item.innerHTML =
        `<img class="pokemon_image" src=${getPokemonImage(pokemon.id)} />
        <h6 class="pokemon_name">${pokemon.name}</h6>
        <span><i>+/- favoritos</i></span>`;

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
 * generate all favorite Pokémon imgs
 */
function buildPokemonFavorites() {
    const favorites = document.querySelector('#favorites');
    favorites.innerHTML = '';
    favoritesList.forEach((pokemon, index) => {
        const pokemon_item = document.createElement("div");
        pokemon_item.addEventListener("click", function() {
            buildPokemonMarkup(favoritesList[index]);
        });
        pokemon_item.innerHTML +=
            `<div class="pokemon_item">
                <img class="pokemon_image" src=${getPokemonImage(pokemon.id)} />
                <h6 class="pokemon_name">${pokemon.name}</h6>
            </div>`;
            favorites.appendChild(pokemon_item);
    });
    return;
}


/**
 * Adds to favorites
 */
function addToFavorites() {
    let prevIndex = -1;
    favoritesList.forEach((pkmn, index) => {
        if (_.isEqual(pkmn, currentPokemon)) {
            prevIndex = index;
        }
    });

    if (prevIndex !== -1) {
        favoritesList.splice(prevIndex, 1);
    } else {
        favoritesList.unshift(currentPokemon);
    }
    updateFavorites();
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
 * add an pokemon to the history and updates display
 */
function updateFavorites() {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoritesList));
    buildPokemonFavorites();
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
function getLocalStorageItem(key) {
    return JSON.parse(localStorage.getItem(key));
}

async function onLoadAsync() {
    // Load the history from cache
    let history = getLocalStorageItem(HISTORY_STORAGE_KEY);
    if (history !== null) {
        // Set the searchHistory array and update the display
        searchHistory = history;
        searchHistory.forEach(updateHistory);
    }

    // Load the favorites from cache
    let favorites = getLocalStorageItem(FAVORITES_STORAGE_KEY);
    if (favorites !== null) {
        // Set the favoritesList array and update the display
        favoritesList = favorites;
        updateFavorites();
    }

    // Install the service worker
    if ('serviceWorker' in navigator) {
        try {
            let serviceWorker = await navigator.serviceWorker.register('../sw.js')
            console.log(`Service worker registered ${serviceWorker}`)
        } catch (err) {
            console.error(`Failed to register service worker: ${err}`)
        }
    }
}
