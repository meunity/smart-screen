<template>
  <div class="alert-card">
    <div :class="{'normal-color': finished,'alert-color': !finished}" class="alert-card--container">
      <div class="alert-title">
        <span :class="{'alert-word--color': !finished}">{{ title }}</span>
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
          ><path d="M1017.445992 445.970359a507.865243 507.865243 0 0 0-29.459378-115.312192 515.671713 515.671713 0 0 0-33.987825-71.151681 31.87659 31.87659 0 0 0-55.245004 31.799076 449.562518 449.562518 0 0 1 29.757195 62.282454 443.944797 443.944797 0 0 1 25.755028 100.782406A451.661514 451.661514 0 0 1 958.215139 514.039841c0 246.045578-200.169562 446.215139-446.215139 446.215139S65.784861 760.085418 65.784861 514.039841 265.954422 67.824701 512 67.824701a445.752096 445.752096 0 0 1 222.654725 59.449116 31.87659 31.87659 0 1 0 31.87251-55.216446A509.756175 509.756175 0 0 0 512 4.079681C230.812048 4.079681 2.039841 232.851888 2.039841 514.039841s228.772207 509.960159 509.960159 509.960159 509.960159-228.772207 509.960159-509.960159a517.578964 517.578964 0 0 0-4.514167-68.069482zM680.694821 395.888191L448.25498 628.332112l-104.949801-104.953881a31.86843 31.86843 0 1 0-45.080478 45.068239l127.49004 127.49004a31.858231 31.858231 0 0 0 45.068239 0l254.98008-254.98008a31.86843 31.86843 0 0 0-45.068239-45.068239z" fill="#6eff68" p-id="3084" /></svg>

        </span>
      </div>
      <div :class="{'inner-alert': !finished,'inner-normal': finished}" class="alert-content">
        <div class="alert-word">
          {{ alertWord }}
        </div>
        <div class="alert-image">
          <img :src="alertImage" alt="">
        </div>
        <div class="alert-actions">
          <span>{{ time }}</span>
          <span :style="{'opacity': status === 1 ? 0.5 : 1}">{{ alertStatus }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertCard',
  props: {
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
    alertImage: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: '08:12:44'
    },
    status: {
      type: Number,
      default: 0
    }
  },
  computed: {
    alertStatus () {
      switch (this.status) {
        case 1: return '处理中...'
        case 2: return '处理'
        default: return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../assets/stylesheets/variables";
.alert-card {
  width: 50%;
  min-width: 50%;
  height: 33%;
  flex: 0 1 auto;
  display: flex;

  .make-border(@border-color) {
    background: linear-gradient(225deg, transparent 5px,@border-color 6px , transparent 1px),
    linear-gradient(to right,@border-color 0px,transparent 1px) left no-repeat,
    linear-gradient(to top,@border-color 0px, transparent 1px) bottom no-repeat,
      linear-gradient(to bottom,transparent 0px,@border-color 1px,transparent 1px) -8px top no-repeat,
    linear-gradient(to left,transparent 0px, @border-color 1px,transparent 1px) right 8px no-repeat;

  }
  &--container {
    display: flex;
    flex-direction: column;
    margin: .4vw;
    width: 100%;
  }
  .alert-color {
    .make-border(@pink)
  }
  .normal-color {
    .make-border(@sky-blue)
  }
}
  .inner-alert {
    background: @pink;
  }
  .inner-normal {
    background: @sky-blue;
  }
  .alert-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: .3vw;
  }
  .alert-title {
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: space-between;
    font-size: .9vw;
    padding-left: .3vw;
    padding-top: .2vw;
    align-items: center;

  }
  .alert-word--color {
    color: @pink;
  }
  .alert-image {
    flex: 1;
    background: @deep-blue;
    margin: 0 .6vw;
  }
  .alert-word {
    padding: .3vw;
  }
  .alert-actions {
    margin-top: auto;
    width: 100%;
    padding: .3vw;
    display: flex;
    justify-content: space-between;
  }

</style>
