import config from '/js/config'
import router from '/js/router'
import ideasService from '/js/services/ideas'

const ideas = {

  namespaced: true,

  state: {

    ideas: []

  },

  actions: {

    getList ({ dispatch, commit }, page){

      ideasService.getList(page)
        .then(
          response => {
            commit('setList', response);
          },
          reject => {}
        );
    },

    updateIdea ({ dispatch, commit }, idea){

      ideasService.updateIdea(idea)
        .then(
          response => {
            commit('updateIdea', response);
          },
          reject => {}
        );
    },

    saveNewIdea ({ dispatch, commit }, idea){

      ideasService.saveNewIdea(idea)
        .then(
          response => {
            commit('saveNewIdea', response);
          },
          reject => {}
        );
    },

    removeIdea ({ dispatch, commit }, idea){

      ideasService.removeIdea(idea)
        .then(
          response => {
            commit('removeIdea', idea);
          },
          reject => {}
        );
    }


  },

  mutations: {

    setList (state, ideas) {
      state.ideas = ideas;
    },

    updateIdea (state, idea) {
      state.ideas[idea.id] = idea;
    },

    saveNewIdea (state, idea) {
      state.ideas.shift();
      state.ideas.unshift(idea);
    },

    removeIdea (state, idea) {
      state.ideas = state.ideas.filter(x => x.id !== idea.id);
    }

  }

}

export default ideas
