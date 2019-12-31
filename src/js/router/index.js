import Vue from 'vue'
import VueRouter from 'vue-router'
import config from '/js/config'
import store from '/js/store'
import Ideas from '/js/components/pages/Ideas'
import Login from '/js/components/auth/Login'
import Signup from '/js/components/auth/Signup'

Vue.use(VueRouter)

const router = new VueRouter({

  mode: 'history',

  routes: [
    {
      name: 'Ideas',
      path: config.pages.ideas.path,
      component: Ideas,
      meta: {
        title: config.pages.ideas.metatitle
      }
    },
    {
      name: 'Login',
      path: config.pages.login.path,
      component: Login,
      meta: {
        title: config.pages.login.metatitle
      }
    },
    {
      name: 'Signup',
      path: config.pages.signup.path,
      component: Signup,
      meta: {
        title: config.pages.signup.metatitle
      }
    },
    { path: '*', redirect: config.pages.ideas.path }
  ],

  scrollBehavior (to, from, savedPosition) {

    return { x: 0, y: 0 }

  },

});


router.beforeEach((to, from, next) => {

  document.title = to.meta.title;
  next();

});

export default router;
