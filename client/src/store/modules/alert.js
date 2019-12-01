const state = [];

const getters = { userAlerts: state => state };

const actions = {
  setAlert({ commit }, alertInfo) {
    commit('RECEIVE_ALERT', alertInfo);

    setTimeout(() => {
      commit('REMOVE_ALERT', alertInfo);
    }, 5000);
  }
};

const mutations = {
  RECEIVE_ALERT: (state, alertInfo) => {
    state.unshift(alertInfo);
  },
  REMOVE_ALERT: (state, alertInfo) => {
    const removeIndex = state.findIndex(alert => alert.id == alertInfo.id);
    state.splice(removeIndex, 1);
  }
};

export default { state, getters, actions, mutations };
