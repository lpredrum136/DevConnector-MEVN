import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';

// Load Vuex
Vue.use(Vuex);

// Create Store
const myStore = new Vuex.Store({
  modules: {
    myAuth: auth
  }
});

export default myStore;
