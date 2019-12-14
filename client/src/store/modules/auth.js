import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import alert from './alert';
import router from '../../router';
import uuid from 'uuid';

const state = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

const getters = {
  userToken: state => state.token,
  userIsAuthenticated: state => state.isAuthenticated,
  userLoading: state => state.loading,
  userInfo: state => state.user
};

const actions = {
  // Load user
  async loadUser({ commit }) {
    // Check localStorage for token
    if (localStorage.token) setAuthToken(localStorage.token);

    try {
      const res = await axios.get('/api/auth');

      commit('USER_LOADED', res.data);
    } catch (error) {
      commit('AUTH_ERROR');
    }
  },

  // Register user
  async registerUser({ commit }, userData) {
    try {
      const res = await axios.post('/api/users', userData);

      commit('REGISTER_SUCCESS', res.data);
      actions.loadUser({ commit });

      // Redirect because successful
      router.push('/dashboard');
    } catch (error) {
      const errors = error.response.data.errors;
      errors.forEach(error => {
        alert.actions.setAlert(
          { commit },
          { id: uuid.v4(), msg: error.msg, type: 'danger' }
        );
      });
      commit('REGISTER_FAIL');
    }
  },

  // Login user
  async loginUser({ commit }, userData) {
    try {
      const res = await axios.post('/api/auth', userData);

      commit('LOGIN_SUCCESS', res.data);

      actions.loadUser({ commit });

      // Redirect because successful
      router.push('/dashboard');
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors)
        errors.forEach(error =>
          alert.actions.setAlert(
            { commit },
            { id: uuid.v4(), msg: error.msg, type: 'danger' }
          )
        );

      commit('LOGIN_FAIL');
    }
  },

  // Logout and clear profile
  logoutUser({ commit }) {
    commit('CLEAR_PROFILE');
    commit('LOGOUT');

    // Redirect because successful
    router.push('/login');
  }
};

const mutations = {
  USER_LOADED: (state, userInfo) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = userInfo;
  },
  REGISTER_SUCCESS: (state, userInfo) => {
    localStorage.setItem('token', userInfo.token);
    state.token = userInfo.token;
    state.isAuthenticated = true;
    state.loading = false;
  },
  LOGIN_SUCCESS: (state, userInfo) => {
    localStorage.setItem('token', userInfo.token);
    state.token = userInfo.token;
    state.isAuthenticated = true;
    state.loading = false;
  },
  REGISTER_FAIL: state => {
    localStorage.removeItem('token');
    state.token = null;
    state.isAuthenticated = false;
    state.loading = false;
  },
  AUTH_ERROR: state => {
    localStorage.removeItem('token');
    state.token = null;
    state.isAuthenticated = false;
    state.loading = false;
  },
  LOGIN_FAIL: state => {
    localStorage.removeItem('token');
    state.token = null;
    state.isAuthenticated = false;
    state.loading = false;
  },
  LOGOUT: state => {
    localStorage.removeItem('token');
    state.token = null;
    state.isAuthenticated = false;
    state.loading = false;
  },
  ACCOUNT_DELETED: state => {
    localStorage.removeItem('token');
    state.token = null;
    state.isAuthenticated = false;
    state.loading = false;
  }
};

export default { state, getters, actions, mutations };
