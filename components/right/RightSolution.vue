<template>
  <content-card :cols="8" top-border row wrap>
    <template v-slot:title>
      <chart-title>
        <template v-slot:chartTitle>
          <span class="baojingchuli">报警处理</span>
        </template>
        <template v-slot:chartActions>
          <span class="action-content">查看全部</span>
        </template>
      </chart-title>
    </template>
    <template v-slot:content>
      <div style="flex: 1;width: 100%;position: relative;">
        <div style="position: absolute;width: 100%;height: 100%">
          <swiper :options="swiperOptions">
            <swiper-slide v-for="(s,i) in slidedArr" :key="'slides'+i" style="height: 100%">
              <div class="swiper--container">
                <alert-card
                  v-for="(a,j) in s"
                  :key="'arr'+i+j"
                  :status="a.status"
                  :title="a.location"
                  :snapshot="a.snapshot"
                  :finished="a.finished"
                  :alert-word="a.word"
                />
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </template>
  </content-card>
</template>

<script>
import ContentCard from '../ContentCard'
import ChartTitle from '../ChartTitle'
import AlertCard from '../AlertCard'

export default {
  name: 'RightSolution',
  components: { AlertCard, ChartTitle, ContentCard },
  props: {
    alertList: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    swiperOptions: {
      clickable: true
    },
    slideNumber: 6
  }),
  computed: {
    slidedArr () {
      const slideLength = Math.ceil(this.alertList.length / this.slideNumber)
      const slideArr = []
      for (let i = 0; i < slideLength; i++) {
        slideArr.push(this.alertList.slice(i * this.slideNumber, i * this.slideNumber + this.slideNumber))
      }
      return slideArr
    }
  },
  methods: {
    onClickAlert (eventId) {
      if (!eventId) { return }
      this.axios({
        method: 'get',
        url: `/analysis/event/${eventId}`
      }).then(({ status, data }) => {
        if (status === 200) {
          this.$emit('onClickAlertCard', data)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less">
  @import "../../assets/stylesheets/variables";
  .action-content {
    line-height: 1;
  }

  .swiper-container {
    height: 100%;
  }

  .swiper--container {
    flex: 1;
    flex-direction: row;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
    margin-bottom: auto;
    flex-wrap: wrap;
    width: 100%;
    min-height: 100%;
    height: 100%;
  }
  .baojingchuli {
    color: @pink;

    &::before {
      background: @pink;
      color: @pink;
      content: '..';
      margin-right: 10px;
    }
  }
</style>
