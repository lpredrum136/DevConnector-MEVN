import axios from 'axios';
import alert from './alert';

const state = {
  postState: {
    posts: [],
    post: null,
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

  // Get post by id
  async getPostById({ commit }, postId) {
    try {
      const res = await axios.get(`/api/posts/${postId}`);
      commit('GET_POST_BY_ID', res.data);
    } catch (error) {
      if (error.response.data.msg)
        alert.actions.setAlert(
          { commit },
          { msg: error.response.data.msg, type: 'warning' }
        );

      commit('POST_ERROR', {
        msg: error.response.data.statusText,
        status: error.response.data.status
      });
    }
  },

  // Create/Add Post
  async addPost({ commit }, formData) {
    try {
      const res = await axios.post('/api/posts', formData);
      commit('ADD_POST', res.data);
      alert.actions.setAlert(
        { commit },
        { msg: 'Post added', type: 'success' }
      );
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors)
        errors.forEach(error =>
          alert.actions.setAlert({ commit }, { msg: error.msg, type: 'danger' })
        );

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

  // Add comment
  async addComment({ commit }, formData) {
    try {
      const { text, postId } = formData;
      const res = await axios.post(`/api/posts/comment/${postId}`, { text });
      commit('ADD_COMMENT', res.data);
      alert.actions.setAlert(
        { commit },
        { msg: 'Comment added', type: 'success' }
      );
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors)
        errors.forEach(error =>
          alert.actions.setAlert({ commit }, { msg: error.msg, type: 'danger' })
        );

      commit('POST_ERROR', {
        msg: error.response.statusText,
        status: error.response.status
      });
    }
  },

  // Delete comment
  async deleteComment({ commit }, formData) {
    try {
      const { postId, commentId } = formData;
      const res = await axios.delete(
        `/api/posts/comment/${postId}/${commentId}`
      );
      commit('DELETE_COMMENT', res.data);
      alert.actions.setAlert(
        { commit },
        { msg: 'Comment removed', type: 'success' }
      );
    } catch (error) {
      if (error.response.data.msg)
        alert.actions.setAlert(
          { commit },
          { msg: error.response.data.msg, type: 'danger' }
        );

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
    state.postState.posts = posts;
    state.postState.loading = false;
  },
  GET_POST_BY_ID: (state, post) => {
    state.postState.post = post;
    state.postState.loading = false;
  },
  ADD_POST: (state, post) => {
    state.postState.posts.unshift(post);
  },
  UPDATE_LIKES: (state, newLikeInfo) => {
    state.postState.posts = state.postState.posts.map(post =>
      post._id !== newLikeInfo.postId
        ? post
        : { ...post, likes: newLikeInfo.likes }
    );
  },
  ADD_COMMENT: (state, comments) => {
    state.postState.post.comments = comments;
  },
  DELETE_COMMENT: (state, comments) => {
    state.postState.post.comments = comments;
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
