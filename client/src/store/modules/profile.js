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

  // Get all profiles
  async getProfiles({ commit }) {
    commit('CLEAR_PROFILE');
    try {
      const res = await axios.get('/api/profile');
      commit('GET_PROFILES', res.data);
    } catch (error) {
      commit('PROFILE_ERROR', {
        msg: error.response.statusText,
        status: error.response.status
      });
    }
  },

  // Get profile by ID
  async getProfileById({ commit }, userId) {
    try {
      const res = await axios.get(`/api/profile/user/${userId}`);

      commit('GET_PROFILE', res.data);
    } catch (error) {
      alert.actions.setAlert(
        { commit },
        { msg: error.response.data.msg, type: 'danger' }
      );

      commit('PROFILE_ERROR', {
        msg: error.response.statusText,
        status: error.response.status
      });
    }
  },

  // Get Github repos
  async getGitHubRepos({ commit }, username) {
    try {
      const res = await axios.get(`/api/profile/github/${username}`);

      commit('GET_REPOS', res.data);
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
  },

  // Add Experience
  async addExperience({ commit }, experienceData) {
    try {
      const res = await axios.put('/api/profile/experience', experienceData);

      commit('UPDATE_PROFILE', res.data);

      alert.actions.setAlert(
        { commit },
        { msg: 'Experience Added', type: 'success' }
      );

      router.push('/dashboard');
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
  },

  // Add Education
  async addEducation({ commit }, educationData) {
    try {
      const res = await axios.put('/api/profile/education', educationData);

      commit('UPDATE_PROFILE', res.data);

      alert.actions.setAlert(
        { commit },
        { msg: 'Education Added', type: 'success' }
      );

      router.push('/dashboard');
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
  },

  // Delete experience
  async deleteExperience({ commit }, id) {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);

      commit('UPDATE_PROFILE', res.data);

      alert.actions.setAlert(
        { commit },
        { msg: 'Experience Removed', type: 'success' }
      );
    } catch (error) {
      commit('PROFILE_ERROR', {
        msg: error.response.statusText,
        status: error.response.data
      });
    }
  },

  // Delete experience
  async deleteEducation({ commit }, id) {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);

      commit('UPDATE_PROFILE', res.data);

      alert.actions.setAlert(
        { commit },
        { msg: 'Education Removed', type: 'success' }
      );
    } catch (error) {
      commit('PROFILE_ERROR', {
        msg: error.response.statusText,
        status: error.response.data
      });
    }
  },

  // Delete account and profile
  async deleteAccount({ commit }) {
    if (window.confirm('Are you sure? This action cannot be reverted')) {
      try {
        await axios.delete('/api/profile');

        commit('CLEAR_PROFILE');
        commit('ACCOUNT_DELETED');

        router.push('/login');
      } catch (error) {
        commit('PROFILE_ERROR', {
          msg: error.response.statusText,
          status: error.response.status
        });
      }
    }
  }
};

const mutations = {
  GET_PROFILE: (state, profileInfo) => {
    state.profile = profileInfo;
    state.loading = false;
  },
  GET_PROFILES: (state, profilesInfo) => {
    state.profiles = profilesInfo;
    state.loading = false;
  },
  UPDATE_PROFILE: (state, profileInfo) => {
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
  },
  GET_REPOS: (state, githubInfo) => {
    state.repos = githubInfo;
    state.loading = false;
  }
};

export default { state, getters, actions, mutations };
