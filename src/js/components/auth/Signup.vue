<template>
  <div class="page">
    <div class="page__content page__content--narrow">
      <h1 class="page__form-title">Sign up</h1>
      <div class="page__body">

          <p v-if="combinedErrorMessage" class="message message--error">{{combinedErrorMessage}}</p>

          <form @submit="onSubmit">
            <fieldset>
              <div class="form__group">
                  <label for="registerEmail">Name</label>
                  <input type="text" v-model="name" id="registerName" placeholder="Name" />
              </div>
              <div class="form__group">
                  <label for="registerEmail">Email</label>
                  <input type="text" v-model="email" id="registerEmail" placeholder="Email" />
              </div>
              <div class="form__group">
                <label for="registerPassword">Password</label>
                <input type="password" v-model="password" placeholder="Password" data-pattern='' />
              </div>
            </fieldset>

            <div class="form__actions">
              <button type="submit">Sign up</button>
              <p>Already have an account? <router-link :to="{ name: 'Login', params: {} }">Log in</router-link></p>
            </div>
          </form>

      </div>
    </div>
  </div>
</template>

<script>

import validationMessage from '/js/helpers/validationMessage'

export default {

  name: 'Signup',

  data () {
    return {

      name: '',
      email:'',
      password:'',
      errorMessage: ''

    }
  },

  computed: {

    combinedErrorMessage () {
      return (this.$store.state.auth.errorMessage) ? this.$store.state.auth.errorMessage : this.errorMessage;
    }

  },

  mounted () {

    this.errorMessage = '';
    this.$store.commit('auth/resetErrorMessage');

  },

  methods: {

    onValidate: function () {

      return validationMessage([
        [ this.name ],
        [ this.email, 'email' ],
        [ this.password, 'password']
      ]);

    },

    onSubmit: function(e) {

      e.preventDefault();

      this.errorMessage = '';
      this.$store.commit('auth/resetErrorMessage');

      let validationMessage = this.onValidate();

      if (validationMessage === '') {
        this.$store.dispatch('auth/signup', { name: this.name, email: this.email, password: this.password });
      } else {
        this.errorMessage = validationMessage;
      }

    }

  }
}

</script>
