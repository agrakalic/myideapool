<template>
  <div class="container" id="app">
    <app-panel></app-panel>
    <div class="content" role="main">
      <router-view></router-view>
    </div>
    <app-confirm></app-confirm>
  </div>

</template>

<script>

import Panel from '/js/components/template/Panel'
import Confirm from '/js/components/global/Confirm'

export default {

  name: 'App',

  components: {
    'app-panel': Panel,
    'app-confirm': Confirm
  },

  mounted () {
  }

}
</script>

<style lang="sass">
  @import '/scss/main.scss'
</style>
