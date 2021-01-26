<template>
  <v-list-item>
    <v-checkbox v-model="completed"></v-checkbox>
    <div class="task-item" @click="openDialog()">
      <span>{{ description }}</span>
      <v-spacer></v-spacer>
      <v-chip v-if="taskIsOverdue()">{{ date | capitalize }}</v-chip>
    </div>
  </v-list-item>
</template>

<script>
import * as dateHelper from '../services/dateHelper.js'

export default {
  props: {
    todoProp: {
      completed: Boolean,
      date: String,
      description: String,
      id: String,
      projectId: String
    }
  },

  data() {
    return {
      SETUP_DAY:
        dateHelper.SETUP_CATEGORIES[dateHelper.SETUP_CATEGORIES.length - 1],
      dates: dateHelper.SETUP_CATEGORIES,
      projects: ['Проект 1', 'Проект 2'],
      dialog: false,
      description: this.todoProp.description || '',
      completed: this.todoProp.completed || false,
      date: this.todoProp.date || null,
      projectId: this.todoProp.projectId || '',

      testDate: dateHelper.SETUP_CATEGORIES[0],
      testProj: 'Проект 1'
    }
  },

  methods: {
    taskIsOverdue() {
      return this.date && this.date < Date.now()
    },
    openDialog() {
      this.$store.commit('App/setDialog', {
        date: this.date,
        description: this.description,
        projectId: this.projectId
      })
    }
  },

  filters: {
    capitalize: function(date) {
      if (!date) return ''

      var today = new Date().getTime()
      return Math.ceil((today - date) / (1000 * 3600 * 24))
    }
  },

  watch: {
    testDate(val) {
      if (dateHelper.dayCategoryToDate(val) !== null) {
        this.date = dateHelper.dayCategoryToDate(val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.task-item {
  display: flex;
  width: 100%;
  align-items: center;
}
</style>
