import axios from 'axios';
import collections from './collections';

const localMainURL = "http://localhost:3000/albums";
const localCollectionsURL = "http://localhost:3000/playlists";


const state = {
    albums: [],
    shownAlbums: [],
    shownCollectionId: 0,
};

const getters = {
    allAlbums: state => state.albums,
    shownAlbums: state => state.shownAlbums,
    shownCollectionId: state => state.shownCollectionId
  };
  
const actions = {
    async fetchAlbums({ commit }) {
        const response = await axios.get(localMainURL);
        commit('setAlbums', response.data);
    },
    async changeShownAlbums({ commit }, collectionId) {
      const collection = collections.state.collections
        .filter(collection => collection.id == collectionId)[0];
      const albums = state.albums
        .filter(album => collection.albumIds.includes(album.id));
      commit('setShownAlbums', albums);
      commit('setShownCollectionId', collectionId);
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
    async removeFromCollection({ commit }, albumId) {
        const collection = collections.state.collections
            .filter(collection => collection.id == state.shownCollectionId)[0];
        collection.albumIds = collection.albumIds
            .filter(id => id != albumId);
        await axios.patch(localCollectionsURL + '/' + collection.id, {
            albumIds: collection.albumIds,
        });
        const album = state.albums
            .filter(album => album.id == albumId)[0];
        album.collections = album.collections
            .filter(id => id != collection.id);
        commit('removeFromShownAlbums', albumId);
    },
    async resetShownCollection({ commit }, collectionId) {
      commit('setShownCollectionId', collectionId);
    }
    
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
  setShownAlbums: (state, albums) => {
    state.shownAlbums = albums;
  },
  removeFromShownAlbums: (state, albumId) => {
    state.shownAlbums = state.shownAlbums
      .filter(album => album.id != albumId);
  },
  setShownCollectionId: (state, collectionId) => {
    state.shownCollectionId = collectionId;
  },

};


export default {
    state,
    getters,
    actions,
    mutations
};