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
    
    /* async fetchCollectionsById({ commit }, collectionId) {
        const playlistRes = await axios.get(localCollectionsURL, {
            params: {
                id: collectionId,
            }
        });
        const albumIds = playlistRes.data[0].albumIds;
        this.albumIds = albumIds;
        const albumPromises = albumIds.map(async (id) => {
            return await axios.get(localAlbumsURL, {
                params: {
                    id,
                }
            });
        });
        const solvedPromises = await Promise.all(albumPromises);
        solvedPromises.forEach((res) => {
            this.albums = [...this.albums, res.data[0]];
        });
    }, */
    
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