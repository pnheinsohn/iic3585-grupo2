<template>
  <carousel class="carousel"
    :loop="true"
    :autoplay="true"
    :autoplayTimeout="10000"
    :autoplayHoverPause="true"
    :perPage="6"
    :navigationEnabled="true"
    :speed="1500"
    :centerMode="true">
    <slide v-bind:key="album.id" v-for="album in allAlbums.slice().reverse()">
        <AlbumItem
        v-bind:album="album"
        v-on:remove-album="$emit('remove-album', album.id)"/>
    </slide>
  </carousel>
</template>

<script>
import AlbumItem from './AlbumItem.vue';
import { Carousel, Slide } from 'vue-carousel';
import { mapGetters } from 'vuex';

export default {
  name: "Albums",
  components: {
    AlbumItem,
    Carousel,
    Slide,
  },
  computed: mapGetters(["allAlbums"]),
}


</script>

<style scoped>
  .carousel {
    width: 100%;
  }


</style>