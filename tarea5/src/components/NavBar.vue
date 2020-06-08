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
            :to="{
              name: 'collection',
              params: { id: collection.id }
            }"
            class="link-label"> {{ collection.name }}
          </router-link>
      </li>
    </ul>
    
    
  </nav>
</template>

<script>

export default {
  name: "NavBar",
  components: {
    
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