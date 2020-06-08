import axios from 'axios';

const localCollectionsURL = "http://localhost:3000/playlists";
/* const localAlbumsURL = "http://localhost:3000/albums"; */

const state = {
    collections: [],
};

const getters = {
    allCollections: state => state.collections,
    
};
  
const actions = {
    async fetchCollections({ commit }) {
        const response = await axios.get(localCollectionsURL);
        commit('setCollections', response.data);
    },
    async addAlbumToCollection( _, { event, album, collection }) {
        if (event.target.checked) {
            collection.albumIds.push(album.id)
        }
        else {
            collection.albumIds = collection.albumIds.filter(id => id != album.id);
        }
        await axios.patch(localCollectionsURL + '/' + collection.id, {
            albumIds: collection.albumIds,
        });
    },
    
};

const mutations = {
    setCollections: (state, collections) => (state.collections = collections),
    newCollection: (state, collection) => state.collections.unshift(collection),
    setCollectionsAlbums: (state, collection) => {
        console.log(state)
        console.log(collection)
    }
};



export default {
    state,
    getters,
    actions,
    mutations
};