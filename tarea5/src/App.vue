<template>
  <div id="app">
    <Header />
    <div class="section columns">
      <NavBar v-bind:playlists="playlists"/>
      <main class="column">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Header from './components/layout/Header';
import NavBar from './components/NavBar.vue';


const playlistsURL = "http://localhost:3000/playlists";

export default {
  name: 'App',
  components: {
    Header,
    NavBar,
  },
  data() {
    return {
      playlists: [],
    }
  },
  async created() {
    try {
      const res = await axios.get(playlistsURL);
      this.playlists = res.data;
    } catch(error) {
      console.error(error);
    }
  },

}
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    margin-top: 0px;
  }
  @import 'bulma/bulma.sass';
  //@import '~bulma/bulma';

</style>
