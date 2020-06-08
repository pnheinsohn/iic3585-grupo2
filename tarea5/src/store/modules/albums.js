import axios from 'axios';
import collections from './collections';

const localMainURL = "http://localhost:3000/albums";

const state = {
    albums: [],
};

const getters = {
    allAlbums: state => state.albums,
    
  };
  
const actions = {
    async fetchAlbums({ commit }) {
        const response = await axios.get(localMainURL);
        commit('setAlbums', response.data);
    },
    async addAlbum({ commit }, albumData) {

        const getRes = await axios.get(localMainURL, {
          params: {
            mbid: albumData.mbid,
          }
        });
        if (getRes.data.length) {
          console.log("Álbum ya existe");
        }
        else {
          const newAlbum = {
            mbid: albumData.mbid,
            name: albumData.name,
            artist: albumData.artist,
            reviews: [],
            score: 0,
            image: albumData.image[2]['#text'],
          }
          const res = await axios.post(localMainURL, newAlbum);
          res.data.collections = []
          commit('newAlbum', res.data);
        }
        
    },
    async removeAlbum({ commit }, albumId) {
        await axios.delete(localMainURL + '/' + albumId);
        commit('removeAlbum', albumId);
    },
    
};

const mutations = {
  setAlbums: (state, albums) => {
    albums.forEach((album) => {
      album.collections = []
      collections.state.collections.forEach((collection) => {
        if (collection.albumIds.includes(album.id)) {
          album.collections.push(collection.id);
        }
      });
    });
    state.albums = albums;
  },
  newAlbum: (state, album) => state.albums = [...state.albums, album],
  removeAlbum: (state, id) =>
  (state.albums = state.albums.filter(album => album.id !== id)),
  
};


export default {
    state,
    getters,
    actions,
    mutations
};