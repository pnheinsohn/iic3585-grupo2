<template>
  <div class="holding">
    <div class="album" v-bind:key="album.id" v-for="album in albums">
        <AlbumItem v-bind:album="album" />
    </div>
  </div>
</template>

<script>
import AlbumItem from './AlbumItem.vue';

export default {
  name: "Albums",
  components: {
    AlbumItem
  },
  props: ["albums"]
}
</script>

<style scoped>
  .holding {
    display: flex;
    max-width: 100%;
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