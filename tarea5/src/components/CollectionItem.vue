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
        <slide v-bind:key="album.id" v-for="album in shownAlbums.slice().reverse()">
            <AlbumItem v-bind:album="album" v-on:remove-album="removeAlbum"/>
        </slide>
    </carousel>
</template>

<script>
import axios from 'axios';
import AlbumItem from './AlbumItem.vue';
import { Carousel, Slide } from 'vue-carousel';
import { mapGetters, mapActions } from 'vuex';

/* const localAlbumsURL = "http://localhost:3000/albums"; */
const playlistsURL = "http://localhost:3000/playlists";

export default {
    name: 'CollectionItem',
    components: {
        AlbumItem,
        Carousel,
        Slide,
    },
    data() {
        return {
            name: '',
            albums: [],
            albumIds: [],
        }
    },
    computed: mapGetters([
    "shownAlbums",
    "allAlbums"
    ]),
    async created() {
        try {
            /* const playlistRes = await axios.get(playlistsURL, {
                params: {
                    id: this.$route.params.id,
                }
            });
            const albumIds = playlistRes.data[0].albumIds;
            this.albumIds = albumIds;
            const albumPromises = albumIds.map(async (id) => {
                return await axios.get(localAlbumsURL, {
                    params: {
                        id,
                    }
                });
            });
            const solvedPromises = await Promise.all(albumPromises);
            solvedPromises.forEach((res) => {
                this.albums = [...this.albums, res.data[0]];
            }); */
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
        "changeShownAlbums"
        ]),
        async removeAlbum(albumId) {
            this.albums = this.albums.filter((album) => album.id !== albumId);
            this.albumIds = this.albumIds.filter((id) => id !== albumId);
            console.log(this.$route.params.id)
            await axios.patch(playlistsURL + '/' + this.$route.params.id, {
                albumIds: this.albumIds,
            });
        },
    }
}
</script>

<style>
</style>