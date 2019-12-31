import config from '/js/config'
import router from '/js/router'
import userService from '/js/services/user'

const user = {

  namespaced: true,

  state: {
    name: '',
    email: '',
    avatarURL: ''
  },

  actions: {

    getUser ({ dispatch, commit }) {
      userService.getUser()
        .then(
          response => {
            commit('getUser', response.data);
            if (router.currentRoute.path !== config.pages.ideas.path) router.push(config.pages.ideas.path);
          })
          .catch(
            error => {
              return Promise.reject(error);
            }
          );
    },

    removeUser ({ dispatch, commit }) {
      commit('removeUser');
    }

  },

  mutations: {

    getUser (state,data) {
      state.name = data.name;
      state.email = data.email;
      state.avatarURL = data.avatar_url;
    },

    removeUser (state) {
      state.name = '';
      state.email = '';
      state.avatarURL = '';
    }

  }

}

export default user
