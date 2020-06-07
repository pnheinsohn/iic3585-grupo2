<template>
  <nav>
    <ul>
    <h1 class="menu-label">Menu</h1>
    
      <router-link
        class="link-label"
        to="/">Home</router-link>
      <p class="menu-label">Playlists</p>
      <li v-bind:key="playlist.id" v-for="playlist in playlists.slice().reverse()">
          <router-link
            :to="{
              name: 'playlist',
              params: { id: playlist.id }
            }"
            class="link-label"> {{ playlist.name }}
          </router-link>
      </li>
    </ul>
    
    
  </nav>
</template>

<script>
//import PlaylistItem from './PlaylistItem.vue';

export default {
  name: "NavBar",
  components: {
    //PlaylistItem,
  },
  props: ["playlists"],
}


</script>

<style scoped>
  .menu-label {
    color: black;
  }
  .link-label {
    color: black;
    text-decoration: none;
  }
</style>