<template>
  <tr class="idea" ref="ideaRow">

      <td class="idea__content">
        <span v-if="edit">
          <input type="text"
            v-model="idea.content"
            v-focus
          >
        </span>
        <span v-else>
          {{idea.content}}
        </span>
      </td>

      <td class="idea__score" data-title="Impact">
        <span v-if="edit">
          <select v-model="idea.impact">
            <option v-for="n in scoreNumbers">{{n}}</option>
          </select>
        </span>
        <span v-else>
          {{idea.impact}}
        </span>
      </td>

      <td class="idea__score" data-title="Ease">
        <span v-if="edit">
          <select v-model="idea.ease">
            <option v-for="n in scoreNumbers">{{n}}</option>
          </select>
        </span>
        <span v-else>
          {{idea.ease}}
        </span>
      </td>

      <td class="idea__score" data-title="Confidence">
        <span v-if="edit">
          <select v-model="idea.confidence">
            <option v-for="n in scoreNumbers">{{n}}</option>
          </select>
        </span>
        <span v-else>
          {{idea.confidence}}
        </span>
      </td>

      <td class="idea__avg" data-title="Average"><span>{{avg}}</span></div>

      <td class="idea__actions">
        <span v-if="edit">
          <button class="button--blank idea__button--save" @click="saveIdea">
            <img class="" src="/assets/img/Confirm_V.png"
              srcset="/assets/img/Confirm_V.png 1x, /assets/img/Confirm_V@2x.png 2x"
              alt="save"
            />
            <span class="visually-hidden">Save Idea</span>
          </button>
          <button class="button--blank idea__button--cancel" @click="cancelEditIdea">
            <img class="" src="/assets/img/Cancel_X.png"
              srcset="/assets/img/Cancel_X.png 1x, /assets/img/Cancel_X@2x.png 2x"
              alt="cancel"
            />
            <span class="visually-hidden">Cancel</span>
          </button>
        </span>
        <span v-else>
          <button class="button--blank idea__button--edit" @click="editIdea">
            <img class="" src="/assets/img/pen.png"
              srcset="/assets/img/pen.png 1x, /assets/img/pen@2x.png 2x"
              alt="edit"
            />
            <span class="visually-hidden">Save Idea</span>
          </button>
          <button class="button--blank idea__button--remove" @click="removeIdea">
            <img class="" src="/assets/img/bin.png"
              srcset="/assets/img/bin.png 1x, /assets/img/bin@2x.png 2x"
              alt="remove"
            />
            <span class="visually-hidden">Cancel</span>
          </button>
        </span>
      </td>

  </tr>
</template>

<script>

import config from '/js/config'

const focus = {
  inserted (el) {
    el.focus();
  }
}

export default {

  name: 'Idea',

  data () {
    return {

      edit: false,
      isNewIdea: false,
      scoreNumbers: [10,9,8,7,6,5,4,3,2,1],
      beforeEdit: '',
      fade: false

    }
  },

  directives: {

    focus

  },

  props: [

    'idea'

  ],

  computed: {

    ideas () {
      return this.$store.state.ideas.ideas;
    },

    avg () {
      return Math.round( ((parseInt(this.idea.impact) + parseInt(this.idea.ease) + parseInt(this.idea.confidence)) / 3) * 10 ) / 10;
    }

  },

  mounted () {

    if (this.idea.id.toString().length === 13) {
      this.edit = true;
      this.isNewIdea = true;
      this.idea.content = '';
      this.fadeIn();
    }

  },

  methods: {

    editIdea: function () {

      if (!this.isNewIdea) {
        this.beforeEdit = this.idea.content;
        this.edit = true;
      }

    },

    cancelEditIdea: function () {

      const self = this;

      if (!this.isNewIdea) {
        this.idea.content = this.beforeEdit;
        this.edit = false;
      } else {
        this.$refs.ideaRow.classList.add('fade');
        setTimeout(function(){
          self.$emit('onCancel');
        },350);
      }

    },

    saveIdea: function () {

      if (this.validate()) {
        if (!this.isNewIdea) {
          this.$store.dispatch('ideas/updateIdea', this.idea);
          this.edit = false;
        } else {
          this.$store.dispatch('ideas/saveNewIdea', this.idea);
          this.$emit('onSave');
        }
      }

    },

    removeIdea: function () {

      const self = this;

      this.$store.dispatch('confirm/open',function(){

        if (self.ideas.length === 1) {
          self.$store.dispatch('ideas/removeIdea', self.idea);
        } else {
          self.$refs.ideaRow.classList.add('fade');
          setTimeout(function(){
            self.$store.dispatch('ideas/removeIdea', self.idea);
          },350);
        }

      });

    },

    validate: function () {
      return this.idea.content !== '';
    },

    fadeIn: function () {

      const self = this;

      this.$refs.ideaRow.classList.add('fade');
      setTimeout(function(){
        self.$refs.ideaRow.classList.remove('fade');
      },10);

    }

  }

}

</script>
