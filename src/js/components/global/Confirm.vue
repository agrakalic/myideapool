<template>
  <transition name="fade">
    <div class="confirm" v-if="active">
        <div class="confirm__content">

          <h3 class="confirm__title">{{title}}</h3>
          <p class="confirm__text">{{text}}</p>

          <p class="confirm__actions">
            <button type="button" class="button--blank" v-on:click="onCancel">Cancel</button>
            <button type="button" class="button--blank" v-on:click="onConfirm">Ok</button>
          </p>

        </div>
    </div>
  </transition>
</template>

<script>

export default {

  name: 'Confirm',

  data () {
    return {

      title: this.$store.state.confirm.title,
      text: this.$store.state.confirm.text

    }
  },

  computed: {

    active () {
      return this.$store.state.confirm.active;
    }

  },

  methods: {

    onConfirm: function () {
      this.$store.dispatch('confirm/confirm');
    },

    onCancel: function () {
      this.$store.dispatch('confirm/cancel');
    }

  }
}

</script>
