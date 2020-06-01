<template>
  <div>
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
        v-bind:inline=true>
      </star-rating>
    </div>
    <div class="album-cover-container">
      <img class="album-cover" :src=album.image />
    </div>
    
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';

export default {
  name: "AlbumItem",
  props: ["album"],
  components: {
    StarRating
  }
}
</script>

<style scoped>
  .album-name {
    flex: 2;
    height: 50px;
    color: black;
  }

  .album-artist {
    flex: 1;
    height: 20px;
    color: #1DB954;
  }

  .album-cover {
    height: 95%;
    width: 95%;
    object-fit: cover;
    margin: 10px;
    margin-left: auto;
    margin-right: auto;
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
</style>