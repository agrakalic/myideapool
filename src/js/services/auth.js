import config from '/js/config'
import router from '/js/router'
import store from '/js/store'
import axios from 'axios'

const authService = {

    login: function (email, password) {

      const url = config.api.endpoint + config.api.routes.accessTokens;
      const data = {
        email: email,
        password: password
      };
      const headers = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      return axios
        .post(url,data,headers)
        .then(
          response => {
            const token = response.data
            if (token.jwt) {
              localStorage.setItem('access_token', token.jwt);
              localStorage.setItem('refresh_token', token.refresh_token);
            }
            return token;
          },
          reject => {
            return Promise.reject(reject);
          }
        );
    },

    logout: function () {

      const url = config.api.endpoint + config.api.routes.accessTokens;
      const params = {
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': store.state.auth.accessToken
        },
        data: {
          'refresh_token': store.state.auth.refreshToken
        }
      };
      return axios
        .delete(url,params)
        .then(
          response => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
          }
        )
        .catch(
          error => {
            return Promise.reject(error);
          }
        );
    },

    signup: function (name, email, password) {

      const url = config.api.endpoint + config.api.routes.users;
      const params = {
        headers: {
          'Content-Type': 'application/json'
        },
        name: name,
        email: email,
        password: password
      }
      return axios
        .post(url,params)
        .then(
          response => {
            const token = response.data
            if (token.jwt) {
              localStorage.setItem('access_token', token.jwt);
              localStorage.setItem('refresh_token', token.refresh_token);
            }
            return token;
          },
          reject => {
            return Promise.reject(reject);
          }
        );
    },

    refreshToken: function () {

      const url = config.api.endpoint + config.api.routes.refreshToken;
      const data = {
        'refresh_token': store.state.auth.refreshToken
      };
      const headers = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      return axios
        .post(url,data,headers)
        .then(
          response => {
            return response;
          },
          error => {
            return Promise.reject(error);
          }
        )
        .catch(
          error => {
            return Promise.reject(error);
          }
        );

    }

};

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {

    const originalRequest = error.config;
    const refreshTokenUrl = config.api.endpoint + config.api.routes.refreshToken;

    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    if (error.config.url === refreshTokenUrl && error.response.reason === 'you can not pass!') {
      return Promise.reject(error);
    }

    return authService.refreshToken()
      .then(
        token => {
          const jwt = token.data.jwt;
          store.dispatch('auth/setAccessToken', jwt);
          localStorage.setItem('access_token', jwt);
          originalRequest.headers['X-Access-Token'] = jwt;
          return axios(originalRequest);
        },
        error => {
          store.commit('auth/logout', null, { root: true })
          router.push(config.pages.login.path);
        }
      )
      .catch(
        error => {
          store.commit('auth/logout', null, { root: true })
          router.push(config.pages.login.path);
        }
      );
});

export default authService
