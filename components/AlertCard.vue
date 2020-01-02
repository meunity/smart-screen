<template>
  <div :class="{'canHover': status === 1,'canNotHover': status !== 1}" @click.capture="getSituation" class="alert-card">
    <div :class="{'normal-color': finished,'alert-color': !finished}" class="alert-card--container">
      <div class="alert-title">
        <span :class="{'alert-word--color': !finished}" style="text-overflow: ellipsis">{{ title }}</span>
        <span v-if="finished" style="margin-right: .4vw">
          <svg
            t="1577345161526"
            class="icon"
            viewBox="0 0 1026 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3083"
            width="16"
            height="16"
          ><path
            d="M1017.445992 445.970359a507.865243 507.865243 0 0 0-29.459378-115.312192 515.671713 515.671713 0 0 0-33.987825-71.151681 31.87659 31.87659 0 0 0-55.245004 31.799076 449.562518 449.562518 0 0 1 29.757195 62.282454 443.944797 443.944797 0 0 1 25.755028 100.782406A451.661514 451.661514 0 0 1 958.215139 514.039841c0 246.045578-200.169562 446.215139-446.215139 446.215139S65.784861 760.085418 65.784861 514.039841 265.954422 67.824701 512 67.824701a445.752096 445.752096 0 0 1 222.654725 59.449116 31.87659 31.87659 0 1 0 31.87251-55.216446A509.756175 509.756175 0 0 0 512 4.079681C230.812048 4.079681 2.039841 232.851888 2.039841 514.039841s228.772207 509.960159 509.960159 509.960159 509.960159-228.772207 509.960159-509.960159a517.578964 517.578964 0 0 0-4.514167-68.069482zM680.694821 395.888191L448.25498 628.332112l-104.949801-104.953881a31.86843 31.86843 0 1 0-45.080478 45.068239l127.49004 127.49004a31.858231 31.858231 0 0 0 45.068239 0l254.98008-254.98008a31.86843 31.86843 0 0 0-45.068239-45.068239z"
            fill="#6eff68"
            p-id="3084"
          /></svg>

        </span>
      </div>
      <div :class="{'inner-alert': !finished,'inner-normal': finished}" class="alert-content">
        <div class="alert-word">
          {{ alertWord }}
        </div>
        <div class="alert-image">
          <img :src="snapshot" alt="">
        </div>
        <div class="alert-actions">
          <span>{{ time }}</span>
          <span v-if="!finished" :class="{'canHover': status !== 1,'canNotHover': status === 1}" :style="{'opacity': status === 1 ? 0.5:1}" @click.capture.stop="solveAlert">{{ alertStatus }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertCard',
  props: {
    eventId: {
      type: Number,
      default: 0
    },
    finished: {
      type: Boolean,
      default: false
    },
    title: {
      type: [Boolean, String],
      default: ''
    },
    alertWord: {
      type: String,
      default: ''
    },
    snapshot: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: '08:12:44'
    },
    status: {
      type: [Boolean, Number],
      default: 2
    }
  },
  data: () => ({}),
  computed: {
    alertStatus () {
      switch (this.status) {
        case 1:
          return '处理中...'
        case 2:
        default:
          return '处理'
      }
    }
  },
  methods: {
    getSituation () {
      if (this.status === 1) {
        this.$emit('getSituation', this.eventId)
      }
    },
    solveAlert () {
      if (this.eventId === undefined) { return }
      this.$emit('onSolveAlert', this.eventId)
    }
  }
}
</script>
