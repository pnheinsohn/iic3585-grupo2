<template>
  <div id="app">
    <AddAlbum v-on:add-album="addAlbum" />
    <Albums v-bind:albums="albums" />
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
      albumName: ''
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
    async addAlbum() {
      console.log('addAlbum...');
      const res = await axios.post(localMainURL, { name: this.albumName });
      //this.albums = [...this.albums, res.data];
      console.log(res);
      this.albums = [...this.albums];
      this.albumName = '';
    }
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