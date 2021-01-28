let formattingTime = time => {
  let min = Math.floor(time / 60)
  let sec = time % 60
  min = min < 10 ? '0' + min : min
  sec = sec < 10 ? '0' + sec : sec
  return `${min}:${sec}`
}
export default {
  namespaced: true,
  state: {
    isOpened: false,
    isStarted: false,
    timeLeft: 10 * 60 + 15,
    TIME_LIMIT: 25 * 60,
    FULL_DASH_ARRAY: 283,
    status: 'Работаем'
  },

  getters: {
    isOpened: state => state.isOpened,
    isStarted: state => state.isStarted,
    currtime: state => formattingTime(state.timeLeft),
    alltime: state => formattingTime(state.TIME_LIMIT),
    status: state => state.status,
    circleDasharray(state) {
      let rawTimeFraction = state.timeLeft / state.TIME_LIMIT
      let timeFraction =
        rawTimeFraction - (1 / state.TIME_LIMIT) * (1 - rawTimeFraction)
      return `${(timeFraction * state.FULL_DASH_ARRAY).toFixed(0)} 283`
    }
  },

  mutations: {
    open(state) {
      state.isOpened = true
    },
    close(state) {
      state.isOpened = false
    },
    setStatus(state, status) {
      state.status = status
    },
    setTimeLeft(state, timeLeft) {
      state.timeLeft = timeLeft
    },
    setTimeLimit(state, timeLimit) {
      state.TIME_LIMIT = timeLimit
      state.isStarted = true
    }
  },

  actions: {}
}
