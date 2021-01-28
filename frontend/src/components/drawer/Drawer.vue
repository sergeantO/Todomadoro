<template>
  <v-list nav dense>
    <Avatar />

    <v-divider></v-divider>

    <v-list-item-group color="primary" @change="selectDate">
      <v-list-item class="p36" v-for="(dg, i) in dateGroups" :key="i">
        <v-list-item-title>{{ dg }}</v-list-item-title>
      </v-list-item>
    </v-list-item-group>

    <v-divider></v-divider>

    <div style="display: flex; align-items: center; padding-left: 36px;">
      <h4>Проекты</h4>
      <v-spacer></v-spacer>
      <v-btn text color="secondary" @click="addProject()">
        <v-icon color="primary">mdi-plus</v-icon>
      </v-btn>
    </div>

    <v-treeview
      class="tree"
      dense
      :items="projects"
      item-children="projects"
      activatable
      expand-icon="mdi-chevron-down"
      @update:active="selectProject"
      color="primary"
    ></v-treeview>
  </v-list>
</template>

<script>
import Avatar from './Avatar.vue'
import * as dateHelper from '../../services/dateHelper'

export default {
  components: {
    Avatar
  },

  data() {
    return {
      dateGroups: dateHelper.DAY_CATEGORIES
    }
  },

  methods: {
    selectProject(val) {
      let selectedProjectId = val[0]

      if (selectedProjectId == undefined) {
        this.$store.commit('App/setSelectedProjectId', null)
      } else {
        this.$store.commit('App/setSelectedProjectId', selectedProjectId)
      }
    },
    selectDate(val) {
      if (val == undefined) {
        this.$store.commit('App/setSelectedDateCategory', null)
      } else {
        this.$store.commit('App/setSelectedDateCategory', this.dateGroups[val])
      }
    },
    addProject() {
      console.log('+')
    }
  },

  computed: {
    projects() {
      return this.$store.getters['App/projects']
    },
    rootProjectId() {
      return this.$store.getters['App/rootProjectId']
    }
  }
}
</script>

<style>
.tree {
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1rem;
}
.p36 {
  padding-left: 38px !important;
}
</style>
