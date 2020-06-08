<template>
    <carousel class="carousel"
        :loop="true"
        :autoplay="true"
        :autoplayTimeout="10000"
        :autoplayHoverPause="true"
        :perPage="7"
        :navigationEnabled="true"
        :speed="1500"
        :centerMode="true">
        <slide
            v-bind:key="album.id"
            v-for="album in shownAlbums.slice().reverse()">
            <AlbumItem
                v-bind:album="album"
                v-on:remove-album="removeFromCollection"/>
        </slide>
    </carousel>
</template>

<script>
import AlbumItem from './AlbumItem.vue';
import { Carousel, Slide } from 'vue-carousel';
import { mapGetters, mapActions } from 'vuex';


export default {
    name: 'CollectionItem',
    components: {
        AlbumItem,
        Carousel,
        Slide,
    },
    computed: mapGetters([
    "shownAlbums",
    "allAlbums"
    ]),
    async created() {
        try {
            if (!this.allAlbums.length) {
            await this.fetchAlbums();
            this.changeShownAlbums(this.$route.params.id);
        }
        } catch(error) {
            console.error(error);
        }
    },
    methods: {
        ...mapActions([
        "fetchAlbums",
        "changeShownAlbums",
        "removeFromCollection"
        ]),
    }
}
</script>

<style>
.carousel {
    width: 100%;
  }
</style>