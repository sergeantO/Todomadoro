<template>
  <div style="min-height: 100vh">
    <v-navigation-drawer app v-model="drawer" temporary>
      <Drawer />
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title><b>ToDo</b>modoro</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="openOverlay">
        <v-icon>mdi-timer-sand</v-icon>
        <p class="ma-0" v-if="isStartedLayout">{{ currtime }}</p>
      </v-btn>
      <v-btn text to="/about">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-tabs v-model="tab" center-active show-arrows grow>
        <v-tab>Задачи</v-tab>
        <v-tab v-if="isAvailableNotes">Заметки</v-tab>
        <v-tab v-if="isAvailableMilestones">Этапы</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <TodoList :todosProp="todos" />
        </v-tab-item>
        <v-tab-item v-if="isAvailableNotes">
          NoteList
        </v-tab-item>
        <v-tab-item v-if="isAvailableMilestones">
          milestones
        </v-tab-item>
      </v-tabs-items>
    </v-main>

    <TodoDialog />


    <Overlay />


    <v-btn color="primary" fixed bottom right fab @click="addNewTask()">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import Drawer from '@/components/drawer/Drawer.vue'
import TodoList from '@/components/TodoList.vue'
import TodoDialog from '@/components/TodoDialog'
import Overlay from '@/components/Overlay'

export default {
  name: 'Home',

  components: {
    Drawer,
    TodoList,
    TodoDialog,
    Overlay
  },

  data: () => ({
    drawer: false,
    tab: 0,
    overlay: false
  }),

  created() {
    this.$store.dispatch('App/init')
  },

  methods: {
    ...mapMutations({ openOverlay: 'Overlay/open' }),
    addNewTask() {
      this.$store.commit('App/setDialog', {
        date: null,
        description: '',
        projectId: 'root'
      })
    }
  },

  computed: {
    projects() {
      return this.$store.getters['App/projects']
    },
    todos() {
      return this.$store.getters['App/tasks']
    },
    selectedProject() {
      return this.$store.getters['App/selectedProjectId']
    },
    isAvailableNotes() {
      return this.selectedProject !== null
    },
    isAvailableMilestones() {
      return (
        this.selectedProject !== null &&
        this.selectedProject !== this.rootProjectId
      )
    },
    rootProjectId() {
      return this.$store.getters['App/rootProjectId']
    },
    ...mapGetters({
      currtime: 'Overlay/currtime',
      isStartedLayout: 'Overlay/isStarted'
    })
    // milestones() {
    //   if (typeof this.selectedProject === 'string') {
    //     return this.apiData.milestones.filter(
    //       task => task.projectId === this.selectedProject
    //     )
    //   }

    //   return []
    // },
    // notes() {
    //   if (this.selectedProject === false) {
    //     return this.apiData.notes.filter(
    //       task => task.projectId === this.apiData.id
    //     )
    //   } else if (typeof this.selectedProject === 'string') {
    //     return this.apiData.notes.filter(
    //       task => task.projectId === this.selectedProject
    //     )
    //   }

    //   return []
    // },
  },

  watch: {
    selectedProject() {
      if (this.tab > 1) {
        this.tab = 0
      }
    }
  }
}
</script>
