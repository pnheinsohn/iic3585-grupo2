<template>
    <form @submit.prevent="addAlbum">
      <input type="text" v-model="name" name="name" placeholder="Album...">
      <input type="text" v-model="artist" name="artist" placeholder="Artist...">
      <input type="submit" value="Search" class="btn">
    </form>
</template>


<script>
import axios from 'axios';

const apiMainURL = "http://ws.audioscrobbler.com/2.0";

export default {
  name: "AddAlbum",
  data() {
    return {
      name: '',
      artist: '',
    }
  },
  methods: {
    async addAlbum() {
      const reqParams = {
        method: 'album.getInfo',
        api_key: '6081f1c822d7ebd50f51a34cc9000bd6',
        album: this.name,
        artist: this.artist,
        format: 'json',
      }
      const res = await axios.get(apiMainURL, {
        params: reqParams
      });
      // Send up to parent
      this.$emit('add-album', res.data.album);

      this.name = '';
      this.artist = '';
    },
  }
}
</script>

<style scoped>
  form {
    display: flex;
    padding: 0px;
  }

  input[type="text"] {
    flex: 10;
    padding: 5px;
  }

  input[type="submit"] {
    flex: 2;
  }
</style>