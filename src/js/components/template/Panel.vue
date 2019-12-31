<template>
  <div class="panel">
    <p class="panel__logo">
      <img src="/assets/img/IdeaPool_icon.png"
        srcset="/assets/img/IdeaPool_icon.png 1x, /assets/img/IdeaPool_icon@2x.png 2x"
        alt="Idea Pool logo"
      />
    </p>
    <h1 class="panel__title">
      <span>The Idea Pool<span>
    </h1>

    <div class="panel__user" v-if="userName">

      <p v-if="avatarURL" class="panel__avatar"><img v-bind:src="avatarURL" v-bind:title="userName" /></p>
      <p v-if="userName" class="panel__name">{{userName}}</p>

      <p class="panel__actions">
        <button type="button" class="button--blank" @click="logout">Log out</button>
      </p>

    </div>

  </div>
</template>

<script>
export default {

  name: 'Panel',

  data () {
    return {}
  },

  computed: {

    token () {
      return this.$store.state.auth.accessToken;
    },

    userName () {
      return this.$store.state.user.name;
    },

    avatarURL () {
      return this.$store.state.user.avatarURL;
    }

  },

  mounted () {
    if (this.token && !this.userName) this.$store.dispatch('user/getUser');
  },

  methods: {

    logout: function() {
      this.$store.dispatch('auth/logout')
    }

  }

}

</script>
