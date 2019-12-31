import Vue from 'vue'
import App from '/js/App'
import router from '/js/router'
import store from '/js/store'

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
