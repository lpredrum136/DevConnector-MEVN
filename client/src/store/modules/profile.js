import axios from 'axios';
import router from '../../router';
import alert from './alert';

const state = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

const getters = {
  userProfile: state => state.profile,
  allProfiles: state => state.profiles,
  allRepos: state => state.repos,
  userProfileLoading: state => state.loading,
  userError: state => state.error
};

const actions = {
  // Get current user's profile
  async getCurrentProfile({ commit }) {
    try {
      const res = await axios.get('/api/profile/me');

      commit('GET_PROFILE', res.data);
    } catch (error) {
      commit('PROFILE_ERROR', {
        msg: error.response.statusText,
        status: error.response.status
      });
    }
  },

  // Create or update profile
  async createProfile({ commit }, { userData, isEdit }) {
    try {
      const res = await axios.post('/api/profile', userData);

      commit('GET_PROFILE', res.data);
      alert.actions.setAlert(
        { commit },
        { msg: isEdit ? 'Profile updated' : 'Profile created', type: 'success' }
      );

      if (!isEdit) router.push('/dashboard');
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors)
        errors.forEach(error =>
          alert.actions.setAlert({ commit }, { msg: error.msg, type: 'danger' })
        );

      commit('PROFILE_ERROR', {
        msg: error.response.statusText,
        status: error.response.status
      });
    }
  }
};

const mutations = {
  GET_PROFILE: (state, profileInfo) => {
    state.profile = profileInfo;
    state.loading = false;
  },
  PROFILE_ERROR: (state, errorInfo) => {
    state.error = errorInfo;
    state.loading = false;
  },
  CLEAR_PROFILE: state => {
    state.profile = null;
    state.repos = [];
    state.loading = false;
  }
};

export default { state, getters, actions, mutations };
