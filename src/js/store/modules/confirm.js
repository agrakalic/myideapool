import config from '/js/config'

const confirm = {

  namespaced: true,

  state: {

    active: false,
    title: config.content.confirm.title,
    text: config.content.confirm.text,
    callback: null

  },

  actions: {

    open ({ dispatch, commit }, callback) {
      commit('open',callback);
    },

    confirm ({ dispatch, commit }) {
      commit('confirm');
    },

    cancel ({ dispatch, commit }) {
      commit('cancel');
    }

  },

  mutations: {

    open (state,callback) {
      state.active = true;
      state.callback = callback;
    },

    confirm (state) {
      state.callback();
      state.active = false;
      state.callback = null;
    },

    cancel (state) {
      state.active = false;
      state.callback = null;
    }

  }

}

export default confirm
