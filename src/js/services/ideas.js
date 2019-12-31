import config from '/js/config'
import store from '/js/store'
import axios from 'axios'

const ideasService = {

  getList: function (page) {

    const url = config.api.endpoint + config.api.routes.ideas;
    const params = {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': store.state.auth.accessToken
      },
      page: page
    }
    return axios
      .get(url,params)
      .then(
        response => {
          return response.data
        },
        reject => {
        }
      )
      .catch(
        error => {
          return Promise.reject(error);
        }
      );
  },

  updateIdea: function (idea) {

    const url = config.api.endpoint + config.api.routes.ideas + '/' + idea.id;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': store.state.auth.accessToken
      }
    }
    const data = {
        content: idea.content,
        impact: idea.impact,
        ease: idea.ease,
        confidence: idea.confidence
    }
    return axios
      .put(url,data,headers)
      .then(
        response => {
          return response.data
        }
      )
      .catch(
        error => {
          return Promise.reject(error);
        }
      );
  },

  saveNewIdea: function (idea) {

    const url = config.api.endpoint + config.api.routes.ideas;
    const data = {
      content: idea.content,
      impact: idea.impact,
      ease: idea.ease,
      confidence: idea.confidence
    }
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': store.state.auth.accessToken
      }
    }
    return axios
      .post(url,data,headers)
      .then(
        response => {
          return response.data
        }
      )
      .catch(
        error => {
          return Promise.reject(error);
        }
      );
  },

  removeIdea: function (idea) {

    const url = config.api.endpoint + config.api.routes.ideas + '/' + idea.id;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': store.state.auth.accessToken
      }
    }
    return axios
      .delete(url,headers)
      .then(
        response => {
          return response.data
        }
      )
      .catch(
        error => {
          return Promise.reject(error);
        }
      );
  }

};

export default ideasService
