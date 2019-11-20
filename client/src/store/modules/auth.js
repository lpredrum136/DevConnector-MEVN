import axios from 'axios';

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
  // Register user
  async registerUser({ commit }, userData) {
    console.log('action received');
    try {
      const res = await axios.post('/api/users', userData);

      commit('registerSuccess', res.data);
    } catch (error) {
      const errors = error.response.data.errors;
      console.log(errors);
    }
  }
};

const mutations = {
  registerSuccess: (state, userInfo) => {
    localStorage.setItem('token', userInfo.token);
    state.isAuthenticated = true;
    state.loading = false;
  }
};

export default { state, getters, actions, mutations };
