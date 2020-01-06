<template>
  <div v-show="!closed" class="modal">
    <swiper :options="swiperOption">
      <swiper-slide v-for="c in currentList" :key="c.eventId">
        <modal-card
          :event-id="c.eventId"
          :alert-word="c.word"
          :location="c.location"
          :time-str="c.timeStr"
          :snapshot="c.snapshot"
          :status="c.status"
          :guide-line="c.reactGuideline"
          @onFinished="onFinished"
          @onSolving="onSolving"
        />
      </swiper-slide>
      <div slot="button-next" v-if="currentId === undefined" class="swiper-button-next swiper-button-white" />
      <div slot="button-prev" v-if="currentId === undefined" class="swiper-button-prev swiper-button-white" />
      <div slot="pagination" v-if="currentId === undefined" class="swiper-pagination" />
    </swiper>
    <div @click="hideModal" class="close-icon">
      <span>返回</span>
    </div>
  </div>
</template>

<script>
import ModalCard from './ModalCard'
export default {
  name: 'ModalContainer',
  components: { ModalCard },
  props: {
    alertList: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    closeModal: false,
    currentId: undefined,
    swiperOption: {
      effect: 'slide',
      centeredSlides: true,
      setWrapperSize: true,
      slidesPerView: 3,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination'
      }
    }
  }),
  computed: {
    currentList () {
      return this.currentId === undefined ? this.alertList.filter(ele => !ele.finished && !ele.lastSolved) : this.alertList.filter(ele => !ele.finished && ele.eventId === this.currentId)
    },
    closed () {
      return this.closeModal === true || this.currentList.length === 0
    }
  },
  watch: {
    /**
     * 监视closed变量，一旦应用并关闭modal后重置eventId
     */
    closed: {
      handler (val, old) {
        if (val) {
          this.currentId = undefined
        }
      }
    }
  },
  methods: {
    onSolving (eventId) {
      if (eventId === undefined) { return }
      this.$emit('onSolvingAlert', eventId)
    },
    onFinished (eventId) {
      if (eventId === undefined) { return }
      this.$emit('onFinishAlert', eventId)
    },
    hideModal () {
      this.currentId = undefined
      this.closeModal = true
    },
    showModal (eventId) {
      if (eventId !== undefined) {
        this.currentId = eventId
      }
      this.closeModal = false
    }
  }
}
</script>

<style lang="less" scoped>
.close-icon {
  position: absolute;
  top: 1vw;
  left: 1vw;
  color: white;
  line-height: 1;
  vertical-align: middle;
  font-size: 1vw;
  padding: .5vw;
  border: 1px solid white;
  z-index: 1000;

  > span {
    display: table-cell;
    line-height: 1;
    vertical-align: middle;

  }

  &:hover {
    cursor: pointer;

  }
}
</style>
