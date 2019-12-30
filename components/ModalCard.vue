<template>
    <div class="modal-card">
      <div class="fill-alert">
        <div class="modal-title">
          <div class="modal-title--big">
            一级报警
          </div>
          <div class="modal-title--small">
            <span>警情：人员聚集</span>
            <span>1号楼102室</span>
            <span>|</span>
            <span>09:35:54</span>
          </div>
        </div>
        <div class="modal-content">
          <img src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" alt="">
        </div>
        <div class="modal-actions">
          <button v-show="!solved" @click="solve">
            立即处置
          </button>
          <button v-show="solved" @click="applied">
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
          this.$destroy(true)
          this.$el.parentNode.removeChild(this.$el)
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

        }
      })
    }
  }
}
</script>

<style scoped>

</style>
