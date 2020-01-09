<template>
  <content-card :cols="8" @click.native="onClick" over-border transparent>
    <template v-slot:content>
      <div v-for="(l,i) in processedArr" :key="i" style="height: 100%;display: flex;flex-wrap: wrap">
        <regular-box v-if="boxTypeIndex === 0" :live-stream-array="l" :rows="4" />
        <nine-grid-box v-if="boxTypeIndex === 1" :live-stream-array="l" :rows="9" />
        <special-box v-if="boxTypeIndex === 2" :live-stream-array="l" />
      </div>

      <!--      <swiper :options="swiperOption">-->
      <!--        <swiper-slide v-for="(l,i) in processedArr" :key="i">-->
      <!--          <div style="height: 100%;display: flex;flex-wrap: wrap">-->
      <!--          </div>-->
      <!--        </swiper-slide>-->
      <!--        <div slot="pagination" class="swiper-pagination swiper-pagination-blue" />-->
      <!--        <div slot="button-prev" class="swiper-button-prev swiper-button-blue" />-->
      <!--        <div slot="button-next" class="swiper-button-next swiper-button-blue" />-->
      <!--      </swiper>-->
    </template>
  </content-card>
</template>

<script>
import ContentCard from '../ContentCard'
import SpecialBox from '../boxes/SpecialBox'
import RegularBox from '../boxes/RegularBox'
import NineGridBox from '../boxes/NineGridBox'
export default {
  name: 'MiddleVideo',
  components: { NineGridBox, RegularBox, SpecialBox, ContentCard },
  props: {
    boxTypeIndex: {
      type: [Boolean, Number],
      default: 0
    },
    liveStream: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    swiperOption: {
      clickable: true,
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
    processedArr () {
      let slidesNumber = 0
      switch (this.boxTypeIndex) {
        case 0:
        case 2: {
          slidesNumber = 4
          break
        }
        default: {
          slidesNumber = 9
          break
        }
      }
      const streams = this.liveStream.map((ele) => {
        const profile = JSON.parse(JSON.stringify(ele.profile))
        switch (ele.protocol) {
          case 'rtsp': return profile.url
          default: {
            break
          }
        }
        return ''
      })
      const count = Math.ceil(streams.length / slidesNumber)
      const res = []
      for (let i = 0; i < count; i++) {
        res.push(streams.slice(i * slidesNumber, i * slidesNumber + slidesNumber))
      }
      return res
    }
  },
  methods: {
    onClick () {
      console.log('clicked')
    }
  }
}
</script>

<style scoped>

</style>
