<template>
  <div>
    <form @submit.prevent="addAlbum">
      <input type="text" v-model="title" name="name" placeholder="Album Name...">
      <input type="submit" value="Submit" class="btn">
    </form>
  </div>
</template>


<script>
const localMainURL = "http://localhost:3000/albums";
import axios from 'axios';

export default {
  name: "AddAlbum",
  data() {
    return {
      title: ''
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

<style scoped>
  form {
    display: flex;
  }

  input[type="text"] {
    flex: 10;
    padding: 5px;
  }

  input[type="submit"] {
    flex: 2;
  }
</style>