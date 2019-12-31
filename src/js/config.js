const config = {

  project: {
    name: 'My Idea Pool'
  },

  // ---------------------- //

  api: {
    endpoint: 'https://small-project-api.herokuapp.com',
    routes: {
      refreshToken: '/access-tokens/refresh',
      accessTokens: '/access-tokens',
      currentUser: '/me',
      ideas: '/ideas',
      users: '/users'
    }
  },

  // ---------------------- //

  pages: {

    ideas: {
      name: 'ideas',
      path: '/ideas/',
      metatitle: 'My Ideas'
    },
    login: {
      name: 'Login',
      path: '/login/',
      metatitle: 'Log in to My Idea Pool'
    },
    signup: {
      name: 'Signup',
      path: '/signup/',
      metatitle: 'Sign up for My Idea Pool'
    }

  },

  content: {

    confirm: {
      title: 'Are you sure?',
      text: 'This idea will be permanently deleted.'
    },

    validationMessages: {
      empty: 'Please fill all the fields.',
      password: 'Password should contain at at least 8 characters, including 1 uppercase letter, 1 lowercase letter and 1 number.',
      email: 'Please provide a valid email.'
    }

  }

}

export default config
