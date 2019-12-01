import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import alert from './modules/alert';
import profile from './modules/profile';

// Load Vuex
Vue.use(Vuex);

// Create Store
const myStore = new Vuex.Store({
  modules: {
    myAuth: auth,
    myAlert: alert,
    myProfile: profile
  }
});

export default myStore;
