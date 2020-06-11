import Vuex from 'vuex';
import Vue from 'vue';
import albums from './modules/albums';
import modal from './modules/modal';
import collections from './modules/collections';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    albums,
    modal,
    collections,
  }
});
