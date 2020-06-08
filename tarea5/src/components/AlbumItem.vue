<template>
  <div class="album-card">
    <span class="xButton" @click="$emit('remove-album', album.id)">x</span>
    <h2 class="album-name">
      {{album.name}}
    </h2>
    <h4 class="album-artist">
      {{album.artist}}
    </h4>
    <div class="star-rating-container">
      <star-rating class="star-rating"
        v-bind:rating=album.score
        v-bind:increment=0.5
        v-bind:show-rating=false
        v-bind:star-size=30
        v-bind:inline=true
        @rating-selected="updateRating($event, album)">
      </star-rating>
    </div>
    <div class="album-cover-container">
      <img
        class="album-cover"
        :src=album.image
        @click="changeShowModalState(album.id)"/>
    </div>
    
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';
import axios from 'axios';
import { mapActions } from 'vuex';

const localMainURL = "http://localhost:3000/albums";

export default {
  name: "AlbumItem",
  props: ["album"],
  components: {
    StarRating
  },
  methods: {
    ...mapActions(["changeShowModalState"]),
    async updateRating(rating, album){
      await axios.patch(localMainURL + '/' + album.id, {
          score: rating,
      });
    },
  }
}
</script>

<style scoped>
  .album-card {
    background-color: black;
    padding: 10px;
    margin: 2px;
  }

  .album-name {
    flex: 2;
    height: 30px;
    color: white;
  }

  .album-artist {
    flex: 1;
    height: 20px;
    color: #1DB954;
    margin: 15px;
  }

  .album-cover {
    height: 95%;
    width: 95%;
    object-fit: cover;
    margin: 10px;
    margin-left: auto;
    margin-right: auto;

    cursor: pointer;

  }

  

  .album-cover-container {
    flex: 1;
    height: 150px;
    width: 150px;
    margin: 10px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .star-rating {
    height: 100%;
    width: 100%;
  }

  .star-rating-container {
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
  }

  .xButton {
    position: relative;
    display: flex;
    left:91%;
    top:0%;
  }
</style>