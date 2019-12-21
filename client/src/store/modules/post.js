import axios from 'axios';
import alert from './alert';

const state = {
  postState: {
    posts: [],
    loading: true,
    error: {}
  }
};

const getters = { myPost: state => state.postState };

const actions = {
  // Get all posts
  async getPosts({ commit }) {
    try {
      const res = await axios.get('/api/posts');
      commit('GET_POSTS', res.data);
    } catch (error) {
      commit('POST_ERROR', {
        msg: error.response.statusText,
        status: error.response.status
      });
    }
  },

  // Add like
  async addLike({ commit }, postId) {
    try {
      const res = await axios.put(`/api/posts/like/${postId}`);
      commit('UPDATE_LIKES', { postId, likes: res.data });
    } catch (error) {
      commit('POST_ERROR', {
        msg: error.response.statusText,
        status: error.response.status
      });
    }
  },

  // Remove like
  async removeLike({ commit }, postId) {
    try {
      const res = await axios.put(`api/posts/unlike/${postId}`);
      commit('UPDATE_LIKES', { postId, likes: res.data });
    } catch (error) {
      if (error.response.data.msg) console.log(error.response.data.msg);
      commit('POST_ERROR', {
        msg: error.response.statusText,
        status: error.response.status
      });
    }
  },

  // Delete post
  async deletePost({ commit }, postId) {
    try {
      const res = await axios.delete(`api/posts/${postId}`);
      commit('DELETE_POST', postId);
      alert.actions.setAlert(
        { commit },
        { msg: res.data.msg, type: 'success' }
      );
    } catch (error) {
      if (error.response.data.msg) console.log(error.response.data.msg);
      commit('POST_ERROR', {
        msg: error.response.statusText,
        status: error.response.status
      });
    }
  }
};

const mutations = {
  GET_POSTS: (state, posts) => {
    state.postState.loading = false;
    state.postState.posts = posts;
  },
  UPDATE_LIKES: (state, newLikeInfo) => {
    state.postState.posts = state.postState.posts.map(post =>
      post._id !== newLikeInfo.postId
        ? post
        : { ...post, likes: newLikeInfo.likes }
    );
  },
  DELETE_POST: (state, postId) => {
    state.postState.posts = state.postState.posts.filter(
      post => post._id !== postId
    );
  },
  POST_ERROR: (state, errorInfo) => {
    state.postState.loading = false;
    state.postState.error = errorInfo;
  }
};

export default { state, getters, actions, mutations };
