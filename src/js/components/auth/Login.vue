<template>
  <div class="page">
    <div class="page__content page__content--narrow">
      <h1 class="page__form-title">Log in</h1>
      <div class="page__body">

          <p v-if="combinedErrorMessage" class="message message--error">{{combinedErrorMessage}}</p>

          <form @submit="onSubmit">
            <fieldset>
            <div class="form__group">
              <label for="loginEmail">Email</label>
              <input type="text" v-model="email" ref="email" id="loginEmail" placeholder="Email" title="Please provide a valid email." />
            </div>
            <div class="form__group">
              <label for="loginPassword">Password</label>
              <input type="password" v-model="password" ref="password" id="loginPassword" placeholder="Password" title="Password should contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, and 1 number" />
            </div>
            </fieldset>

            <div class="form__actions">
              <button type="submit">Log in</button>
              <p>Don't have an account? <router-link :to="{ name: 'Signup', query: {} }">Create an account</router-link></p>
            </div>
          </form>


      </div>
    </div>
  </div>
</template>

<script>

import validationMessage from '/js/helpers/validationMessage'

export default {

  name: 'Login',

  data () {
    return {

      email: '',
      password: '',
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
        this.$store.dispatch('auth/login', { email: this.email, password: this.password });
      } else {
        this.errorMessage = validationMessage;
      }

    }

  }
}

</script>
