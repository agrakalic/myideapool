import config from '/js/config'
import store from '/js/store'
import axios from 'axios'

const userService = {

  getUser: function () {

    const url = config.api.endpoint + config.api.routes.currentUser;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': store.state.auth.accessToken
      }
    };
    return axios
      .get(url,headers)
      .then(response => {
        if(response) return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });

  }

};

export default userService
