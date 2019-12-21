import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '../components/layout/Landing.vue';
import Register from '../components/auth/Register.vue';
import Login from '../components/auth/Login.vue';
import Dashboard from '../components/dashboard/Dashboard.vue';
import CreateProfile from '../components/profile-forms/CreateProfile.vue';
import EditProfile from '../components/profile-forms/EditProfile.vue';
import AddExperience from '../components/profile-forms/AddExperience.vue';
import AddEducation from '../components/profile-forms/AddEducation.vue';
import Profiles from '../components/profiles/Profiles.vue';
import Profile from '../components/profile/Profile.vue';
import Posts from '../components/posts/Posts.vue';
import Post from '../components/post/Post.vue';
import myStore from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) next('/dashboard');
      else next();
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) next('/dashboard');
      else next();
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) next('/dashboard');
      else next();
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    /* CACH 1
    
    beforeEnter: async (to, from, next) => {
      await myStore.dispatch('loadUser');
      if (myStore.state.myAuth.isAuthenticated) next('/login');
      else next();
    }*/

    /* CACH 2 nhanh hon vi da luu trong localStorage */
    beforeEnter: (to, from, next) => {
      if (!localStorage.token) next('/login');
      else next();
    }
    /* CACH 3 xem trong file Register.vue, them await vao this.registerUser, nhung nhu vay k chinh duoc neu user go vao address bar manually */
  },
  {
    path: '/create-profile',
    name: 'CreateProfile',
    component: CreateProfile,
    beforeEnter: (to, from, next) => {
      if (!localStorage.token) next('/login');
      else next();
    }
  },
  {
    path: '/edit-profile',
    name: 'EditProfile',
    component: EditProfile,
    beforeEnter: (to, from, next) => {
      if (!localStorage.token) next('/login');
      else next();
    }
  },
  {
    path: '/add-experience',
    name: 'AddExperience',
    component: AddExperience,
    beforeEnter: (to, from, next) => {
      if (!localStorage.token) next('/login');
      else next();
    }
  },
  {
    path: '/add-education',
    name: 'AddEducation',
    component: AddEducation,
    beforeEnter: (to, from, next) => {
      if (!localStorage.token) next('/login');
      else next();
    }
  },
  {
    path: '/profiles',
    name: 'Profiles',
    component: Profiles
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
    beforeEnter: (to, from, next) => {
      if (!localStorage.token) next('/login');
      else next();
    }
  },
  {
    path: '/posts/:postId',
    name: 'Post',
    component: Post,
    beforeEnter: (to, from, next) => {
      if (!localStorage.token) next('/login');
      else next();
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

/* router.beforeEach((to, from, next) => {
  myStore.dispatch('loadUser');
  if (to.fullPath === '/register') {
    if (myStore.state.myAuth.isAuthenticated) {
      next('/login');
    }
  }
  next();
}); */

export default router;
