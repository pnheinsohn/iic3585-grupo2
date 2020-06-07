import Vuex from 'vuex';
import Vue from 'vue';
import albums from './modules/albums';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    albums
  }
});
