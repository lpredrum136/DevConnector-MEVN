import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '../components/layout/Landing.vue';
import Register from '../components/auth/Register.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
