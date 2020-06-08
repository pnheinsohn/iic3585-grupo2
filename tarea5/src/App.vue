<template>
  <div id="app">
    <Header />
    <div class="section columns">
      <NavBar v-bind:collections="allCollections"/>
      <main class="column">
        <router-view />
      </main>
    </div>

    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showModalId"
        @click="changeShowModalState(false)">
      </div>
    </transition>

    <transition name="fade" appear>
      <div class="addToPlaylistModal" v-if="showModalId">
        <h1>Add To Collections</h1>
        <div
          class="collection-line"
          v-bind:key="collection.id"
          v-for="collection in allCollections.slice().reverse()"
        >
          <label for="checkbox">
            {{ modalAlbum.collections }}
          </label>
          <input
            type="checkbox"
            id="checkbox"
            :value="collection.id"
            v-model="modalAlbum.collections"
            @change="addAlbumToCollection({
              album: modalAlbum,
              collection:collection,
              event: $event,
            })">
          <p>{{ collection.name }}</p>
        </div>
      </div>
    </transition>
    
  </div>
</template>

<script>
import Header from './components/layout/Header';
import NavBar from './components/NavBar.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
    NavBar,
  },
  data() {
    return {
      albumInCollections: [],
    }
  },
  methods: {
    ...mapActions([
      "changeShowModalState",
      "fetchCollections",
      "fetchAlbums",
      "addAlbumToCollection"
    ]),
    
  },
  computed: mapGetters([
    "showModalId",
    "allCollections",
    "albumInCollection",
    "modalAlbum",
    "allAlbums"
  ]),
  async created() {
    try {
      this.fetchCollections();
      if (!this.allAlbums.length) {
        this.fetchAlbums();
      }
      
    } catch(error) {
      console.error(error);
    }
  },

}
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    margin-top: 0px;
  }
  @import 'bulma/bulma.sass';
  //@import '~bulma/bulma';

  .collection-line {
    display: flex;
  }

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 98;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .addToPlaylistModal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    
    width: 30%;
    max-width: 400px;
    background-color: #FFF;
    border-radius: 16px;
    
    padding: 25px;
  }

  .addToPlaylistModal h1 {
    color: #b52e31;;
  }

  .addToPlaylistModal p {
    color: black;
    padding: 5px;;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

</style>
