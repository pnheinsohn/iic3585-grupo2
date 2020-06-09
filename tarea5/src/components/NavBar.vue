<template>
  <nav>
    <ul class="whole-menu">
    <h1 class="menu-label">Menu</h1>
    
      <router-link
        :class="{
                'link-label-red': shownCollectionId != 0,
                'link-label-green': shownCollectionId == 0}"
        to="/"
        >
        <span v-on:click="resetShownCollection(0)">
              {{ "Home" }}
        </span></router-link>
      <p class="menu-label">Collections</p>
      <form @submit.prevent="addCollectionRedirect">
      <input
        class="nameInput"
        type="text"
        v-model="name"
        name="name"
        placeholder="Add Collection...">
      </form>
      <li v-bind:key="collection.id" v-for="collection in allCollections.slice().reverse()">
          <div>
            <router-link
              :to="{
                name: 'collection',
                params: { id: collection.id }
              }"
              :class="{
                'link-label-red': collection.id != shownCollectionId,
                'link-label-green': collection.id == shownCollectionId}"
            >
            <span v-on:click="changeShownAlbums(collection.id)">
              {{ collection.name }}
            </span>
            </router-link>
          </div>
      </li>
    </ul>
    
    
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "NavBar",
  data() {
    return {
      name: '',
    }
  },
  components: {
    
  },
  methods: {
    ...mapActions([
      "changeShownAlbums",
      "addCollection", 
      "resetShownCollection"
    ]),
    async addCollectionRedirect() {
      this.addCollection(this.name);
      this.name = '';
    }
  },
  computed: mapGetters([
    "shownCollectionId",
    "allCollections"
  ]),
}


</script>

<style scoped>
  .menu-label {
    color: black;
    text-decoration: none;
  }
  .link-label-red {
    color: #b52e31;
    text-decoration: none;
  }
  .link-label-green {
    color: #1DB954;;
    text-decoration: none;
  }
  .whole-menu li + li:before {
      content: ".";
      color: black;
  }
  .whole-menu {
    width: 120px;
    margin: 10px;
  }
  .nameInput {
    width: 100%;
    border-radius: 50px;
  }

</style>