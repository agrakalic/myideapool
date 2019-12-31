<template>
  <div class="page">
    <div class="page__content">

      <h2 class="page__title page__title--ideas">My Ideas</h2>

      <button class="button--blank idea__button--new" @click="addNewIdea">
        <img class="" src="/assets/img/btn_addanidea.png"
          srcset="/assets/img/btn_addanidea.png 1x, /assets/img/btn_addanidea@2x.png 2x"
          alt="add an idea"
        />
        <span class="visually-hidden">Add New Idea</span>
      </button>

      <div class="page__body">

        <div class="ideas-wrapper" v-if="ideas.length > 0">
          <table class="ideas">
            <thead>
              <tr>
                <th class="idea__content">&nbsp;</th>
                <th class="idea__score">Impact</th>
                <th class="idea__score">Ease</th>
                <th class="idea__score">Confidence</th>
                <th class="idea__avg">Avg.</th>
                <th class="idea__actions">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <idea v-for="idea in ideas" :idea="idea" :key="idea.id"
                @onCancel="onCancel"
                @onSave="onSave"
              />
            <tbody>
          </table>
        </div>

        <div v-else>
          <div class="ideas__intro">
            <img class="" src="/assets/img/bulb.png"
              srcset="/assets/img/bulb.png 1x, /assets/img/bulb@2x.png 2x"
              alt="bulb"
            />
            Got Ideas?
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import config from '/js/config'
import Idea from '/js/components/pages/Idea'

export default {

  name: 'Ideas',

  data () {
    return {

      page: 1,
      newIdeaAdded: false

    }
  },

  components: {

    'idea': Idea

  },

  computed: {

    token () {
      return this.$store.state.auth.accessToken;
    },

    ideas () {
      return this.$store.state.ideas.ideas;
    }

  },

  mounted () {

    (this.token) ?
      this.$store.dispatch('ideas/getList', this.page)
      :
      this.$router.push(config.pages.login.path);

  },

  methods: {

    addNewIdea: function () {

      if (!this.newIdeaAdded) {

        this.newIdeaAdded = true;
        this.ideas.unshift({
          id: new Date().valueOf(),
          content: '',
          impact: 10,
          ease: 10,
          confidence: 10
        });

      }

    },

    onCancel: function () {

      if (this.newIdeaAdded) {

        this.ideas.shift();
        this.newIdeaAdded = false;

      }

    },

    onSave: function () {

      if (this.newIdeaAdded) {

        this.newIdeaAdded = false;

      }

    }

  }

}

</script>
