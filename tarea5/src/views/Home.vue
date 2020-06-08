<template>
  <div id="app">
    <Albums v-bind:albums="allAlbums" v-on:remove-album="removeAlbum" />
    <AddAlbum v-on:add-album="addAlbum" />
  </div>
</template>

<script>
import Albums from '../components/Albums';
import AddAlbum from '../components/AddAlbum';
import {
  mapGetters,
  mapActions,
} from 'vuex';


export default {
  name: 'Home',
  components: {
    Albums,
    AddAlbum
  },
  async created() {
    try {
      /* const res = await axios.get(localMainURL);
      this.albums = res.data; */
      if (!this.allAlbums.length) {
        this.fetchAlbums();
      }
    } catch(error) {
      console.error(error);
    }
  },
  computed: mapGetters(["allAlbums"]),
  methods: {
    ...mapActions(["fetchAlbums", "addAlbum", "removeAlbum"]),
  }
}
</script>

<style>
</style>