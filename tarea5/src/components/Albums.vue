<template>
  <carousel
    ref="my-carousel"
    :loop="true"
    :autoplay="true"
    :autoplayTimeout="10000"
    :autoplayHoverPause="true"
    :perPage="6"
    :navigationEnabled="true"
    :speed="1500"
    :centerMode="true">
    <slide v-bind:key="album.id" v-for="album in allAlbums.slice().reverse()">
        <AlbumItem v-bind:album="album" v-on:remove-album="$emit('remove-album',
          album.id)"/>
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
  /* mounted() {
    this.$refs['my-carousel'].currentPage = this.$refs['my-carousel'].pageCount;
  } */
}


</script>

<style scoped>
  .holding {
    display: flex;
    width: 100%;
    background: #2c3e50;
    padding: 50px;
    box-sizing: border-box;
    flex-direction: row;
  }

  .album {
    display: flex;
    flex: 1;
    background: black;
    margin: 3px;
    flex-direction: column;
  }

  @media screen and (max-width: 768px) {
    .holding{
      flex-direction: column;
    }
  }

</style>