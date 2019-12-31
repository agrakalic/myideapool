import config from '/js/config'
import router from '/js/router'
import authService from '/js/services/auth'

const access_token = localStorage.getItem('access_token');
const refresh_token = localStorage.getItem('refresh_token');
const state = {
  accessToken:  access_token ? access_token : null,
  refreshToken:  refresh_token ? refresh_token : null,
  errorMessage: ''
}

const auth = {

  namespaced: true,

  state: state,

  actions: {

    login ({ dispatch, commit }, { email, password }) {
      authService.login(email, password)
        .then(
          token => {
            commit('login', token);
            dispatch('user/getUser', null, { root: true });
            router.push(config.pages.ideas.path);
          },
          reject => {
            commit('setErrorMessage', reject.response.data.reason);
          }
        );
    },

    logout ({ dispatch, commit }) {
      authService.logout()
        .then(
          response => {
            commit('logout');
            commit('user/removeUser', null, { root: true });
            router.push(config.pages.login.path);
          }
        )
        .catch(
          error => {
            commit('logout');
            commit('user/removeUser', null, { root: true });
            router.push(config.pages.login.path);
          }
        );
    },

    signup ({ dispatch, commit }, { name, email, password }) {
      authService.signup(name, email, password)
        .then(
          token => {
            commit('signup', token);
            dispatch('user/getUser', null, { root: true });
            router.push(config.pages.ideas.path);
          },
          reject => {
            commit('setErrorMessage', reject.response.data.reason);
          }
        );
    },

    setAccessToken ({ dispatch, commit }, accessToken) {
      commit('setAccessToken', accessToken);
    }

  },

  mutations: {

    login (state, token) {
      state.accessToken = token.jwt;
      state.refreshToken = token.refresh_token;
    },

    logout (state) {
      state.accessToken = null;
      state.refreshToken = null;
    },

    signup (state, token) {
      state.accessToken = token.jwt;
      state.refreshToken = token.refresh_token;
    },

    setAccessToken (state, accessToken) {
      state.accessToken = accessToken;
    },

    setErrorMessage(state, message) {
      state.errorMessage = message;
    },

    resetErrorMessage(state, message) {
      state.errorMessage = '';
    }

  }

}

export default auth
