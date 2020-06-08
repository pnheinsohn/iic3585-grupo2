<template>
  <nav>
    <ul>
    <h1 class="menu-label">Menu</h1>
    
      <router-link
        class="link-label"
        to="/">Home</router-link>
      <p class="menu-label">Collections</p>
      <li v-bind:key="collection.id" v-for="collection in collections.slice().reverse()">
          <router-link
            @click="changeShownAlbums(collection.id)"
            :to="{
              name: 'collection',
              params: { id: collection.id }
            }"
            class="link-label"
            
          >
          <span v-on:click="changeShownAlbums(collection.id)">
            {{ collection.name }}
          </span>
          </router-link>
      </li>
    </ul>
    
    
  </nav>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "NavBar",
  components: {
    
  },
  methods: {
    ...mapActions(["changeShownAlbums"]),
  },
  props: ["collections"],
}


</script>

<style scoped>
  .menu-label {
    color: black;
    text-decoration: none;
  }
  .link-label {
    color: #b52e31;
    text-decoration: none;
  }
</style>