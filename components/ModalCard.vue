<template>
  <div class="modal-card">
    <div class="fill-alert">
      <div class="modal-title">
        <div class="modal-title--big">
          一级报警
        </div>
        <div class="modal-title--small">
          <span>警情：{{ alertWord }}</span>
          <span>{{ location }}</span>
          <span>|</span>
          <span>{{ timeStr }}</span>
        </div>
      </div>
      <div v-if="status !== 1" class="modal-content">
        <img :src="snapshot" alt="">
      </div>
      <div v-if="status === 1" class="modal-guide">
        <div class="modal-guide--image">
          <img :src="snapshot" alt="">
        </div>
        <div class="modal-guide--content">
          <span style="display: block">处理预案：</span>
          <span>{{ guideLine }}</span>
        </div>
      </div>
      <div class="modal-actions">
        <button v-show="status !== 1" :class="{'canHover': !solved}" @click="solve">
          立即处置
        </button>
        <button v-show="status === 1" :class="{'canHover': !finished,'cannotHover': finished}" @click="applied">
          已应用
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalCard',
  props: {
    eventId: {
      type: Number,
      default: 0
    },
    alertWord: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    timeStr: {
      type: String,
      default: ''
    },
    snapshot: {
      type: String,
      default: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg'
    },
    guideLine: {
      type: String,
      default: ''
    },
    status: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    solved: false,
    finished: false
  }),
  watch: {
    finished: {
      handler (val, old) {
        if (val === old) { return }
        if (val === true) {
          this.$emit('onFinished', this.eventId)
          // this.$destroy(true)
          // this.$el.parentNode.removeChild(this.$el)
        }
      }
    },
    solved: {
      handler (val, old) {
        if (val === old) { return }
        if (val === true) {
          this.$emit('onSolving', this.eventId)
        }
      }
    }
  },
  methods: {
    applied () {
      this.axios({
        method: 'PUT',
        url: `/analysis/event/${this.eventId}/finish-react`,
        data: {
          inspect: '处理完毕'
        }
      }).then(({ status, data }) => {
        if (status === 200) {
          this.finished = true
        }
      }).catch((err) => {
        if (err.response && err.response.status === 404) {

        }
      })
    },
    solve () {
      this.axios({
        method: 'PUT',
        url: `/analysis/event/${this.eventId}/start-react`
      }).then(({ status, data }) => {
        if (status === 200) {
          this.solved = true
        }
      }).catch((err) => {
        if (err.response && err.response.status === 404) {
          console.log(err)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
