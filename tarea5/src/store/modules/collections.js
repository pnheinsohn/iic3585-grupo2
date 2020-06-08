import axios from 'axios';
import albums from './albums';

const localCollectionsURL = "http://localhost:3000/playlists";

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
        if (albums.state.shownCollectionId == collection.id) {
            albums.state.shownAlbums = albums.state.albums
                .filter(album => collection.albumIds.includes(album.id));
        } 
    },
    async addCollection( { commit }, name ) {
        const newCollection = {
            name: name,
            albumIds: [],
        }
        const res = await axios.post(localCollectionsURL, newCollection);
        commit('newCollection', res.data);
    }
    
};

const mutations = {
    setCollections: (state, collections) => (state.collections = collections),
    newCollection: (state, collection) => state.collections.unshift(collection),
};



export default {
    state,
    getters,
    actions,
    mutations
};