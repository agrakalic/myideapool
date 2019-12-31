import Vue from 'vue'
import Vuex from 'vuex'

import auth from '/js/store/modules/auth'
import ideas from '/js/store/modules/ideas'
import user from '/js/store/modules/user'
import confirm from '/js/store/modules/confirm'

Vue.use(Vuex)

const store = new Vuex.Store({

  modules: {

    auth: auth,
    ideas: ideas,
    user: user,
    confirm: confirm

  }

})

export default store
