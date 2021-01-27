import * as dateHelper from '@/services/dateHelper'
import $api from '@/services/api/apiClient'

export default {
  namespaced: true,

  state: {
    isOpenedDialog: false,
    dialogData: {
      date: '',
      description: '',
      projectId: ''
    },

    projects: [],
    rootProjectId: '',
    tasks: [],
    milestones: [],
    notes: [],

    selectedDayCategory: null,
    selectedProjectId: null
  },

  getters: {
    isOpenedDialog: state =>
      !!state.dialogData.date ||
      !!state.dialogData.description ||
      !!state.dialogData.projectId,

    dialogData: state => state.dialogData,
    projects: state => state.projects,
    rootProjectId: state => state.projects[0]?.id,
    tasks(state) {
      let filteredProjects = []

      if (typeof state.selectedProjectId === 'string') {
        filteredProjects = state.tasks.filter(
          task => task.projectId === state.selectedProjectId
        )
      } else {
        filteredProjects = state.tasks
      }

      filteredProjects = filteredProjects.filter(task =>
        dateHelper.filterByCategory(state.selectedDayCategory, task.date)
      )

      return filteredProjects
    },
    selectedProjectId: state => state.selectedProjectId
  },

  mutations: {
    setDialog(state, dialogData = {}) {
      state.dialogData = dialogData
    },
    setProjects(state, projects) {
      state.projects = projects
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    setSelectedProjectId(state, selectedProjectId) {
      state.selectedProjectId = selectedProjectId
    },
    setSelectedDateCategory(state, selectedDayCategory) {
      state.selectedDayCategory = selectedDayCategory
    }
  },

  actions: {
    /**
     * Эта хуйня нужна только для адекватной разработки фронта с liveReload'ом
     * просто импортирую json-чик на dev моде
     */
    init(context) {
      let dataFetcher
      if (process.env.NODE_ENV === 'production') {
        dataFetcher = $api.getFakeInitData({ args: { userId: 'me' } })
      } else {
        dataFetcher = import('../../../../backend/services/data.json')
      }

      dataFetcher.then(data => {
        let projects = data.projects || []
        projects = [
          { id: data.id, name: 'Без проекта', projects: [] },
          ...projects
        ]
        let tasks = data.tasks || []
        context.commit('setProjects', projects)
        context.commit('setTasks', tasks)
      })
    }
  }
}
