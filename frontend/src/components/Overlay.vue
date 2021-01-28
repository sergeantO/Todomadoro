<template>
  <v-overlay :opacity="0.99" :value="isOpened">
    <div class="timer">
      <div class="base-timer">
        <svg
          class="base-timer__svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g class="base-timer__circle">
            <circle
              class="base-timer__path-elapsed"
              cx="50"
              cy="50"
              r="45"
            ></circle>
            <path
              class="base-timer__path-remaining"
              id="base-timer-path-remaining"
              :stroke-dasharray="circleDasharray"
              d="M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
                "
            ></path>
          </g>
        </svg>
        <p class="base-timer__label" id="base-timer-label">
          <span> {{ currtime }}</span>
          <span class="base-timer__label__small"> / {{ alltime }}</span>
        </p>
      </div>
      <div class="infoBlock">
        <!-- <h2>{{ currTask.title }}</h2> -->
        <h3>{{ status }}</h3>
        <div class="buttons">
          <v-btn @click="startTask()">
            <v-icon>mdi-play</v-icon>
          </v-btn>
          <v-btn @click="stopTask()">
            <v-icon>mdi-stop</v-icon>
          </v-btn>
          <v-btn @click="close()">
            <v-icon>mdi-window-minimize</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </v-overlay>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      timerInterval: null,
      timeLeft: 0
    }
  },

  computed: {
    ...mapGetters({
      isOpened: 'Overlay/isOpened',
      currtime: 'Overlay/currtime',
      alltime: 'Overlay/alltime',
      status: 'Overlay/status',
      circleDasharray: 'Overlay/circleDasharray'
    })
  },

  methods: {
    ...mapMutations({
      close: 'Overlay/close',
      setStatus: 'Overlay/setStatus',
      setTimeLeft: 'Overlay/setTimeLeft',
      setTimeLimit: 'Overlay/setTimeLimit'
    }),
    startTask() {
      this.setStatus('Работаем')
      this.start(25 * 60)
        .then(() => {
          this.setStatus('Отдыхаем')
          return this.start(5 * 60)
        })
        .then(() => {
          // this.timeIsOver = true
        })
    },
    stopTask() {
      clearInterval(this.timerInterval)
      this.timerInterval = null
    },
    start(limit) {
      this.timerInterval = null
      this.timeLeft = limit
      this.setTimeLimit(limit)
      return new Promise(resolve => {
        this.timerInterval = setInterval(() => {
          this.timeLeft -= 1
          this.setTimeLeft(this.timeLeft)
          if (this.timeLeft === 0) {
            clearInterval(this.timerInterval)
            this.timerInterval = null
            resolve()
          }
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>


.timer {
  font-family: sans-serif;
  width: 95%;
  margin: 7rem auto;
}
.base-timer {
  position: relative;
  max-width: 25rem;
  max-height: 25rem;
  margin: 0 auto;
}
.base-timer__svg {
  transform: scaleX(-1);
}
.base-timer__circle {
  fill: none;
  stroke: none;
}
.base-timer__path-elapsed {
  stroke-width: 10px;
  stroke: grey;
}
.base-timer__path-remaining {
  stroke-width: 8px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  fill-rule: nonzero;
  stroke: currentColor;
  color: var(--v-primary-lighten2);
}
.base-timer__label {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 48px;
  transition: font-size 0.5s ease-out 0.1s;
}
.base-timer__label__small {
  font-size: 20px;
  color: gray;
}
@media (max-width: 195px) {
  .base-timer__label {
    font-size: 26px;
  }
}
.infoBlock {
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .buttons {
    margin-top: 15px;
    display: flex;
    background-color: var(--v-primary-lighten2);
    padding: 30px;
    justify-content: center;
    border-radius: 10px;

    button {
      margin: 10px;
    }
  }
}
</style>
