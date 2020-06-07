<template>
  <div id="app">
    <AddAlbum v-on:add-album="addAlbum" />
    <Albums v-bind:albums="albums" v-on:remove-album="removeAlbum" />
  </div>
</template>

<script>
import axios from 'axios';
import Albums from '../components/Albums';
import AddAlbum from '../components/AddAlbum';

const localMainURL = "http://localhost:3000/albums";

export default {
  name: 'Home',
  components: {
    Albums,
    AddAlbum
  },
  data() {
    return {
      albums: [],
    }
  },
  async created() {
    try {
      const res = await axios.get(localMainURL);
      this.albums = res.data;
    } catch(error) {
      console.error(error);
    }
  },
  methods: {
    async addAlbum(albumData) {

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
        this.albums = [...this.albums, res.data];
      }
    },
    async removeAlbum(albumId) {
      await axios.delete(localMainURL + '/' + albumId);
      this.albums = this.albums.filter(album => album.id !== albumId);
    },
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    margin-top: 60px;
  }
</style>