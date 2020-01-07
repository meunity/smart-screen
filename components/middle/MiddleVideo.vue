<template>
  <content-card :cols="8" over-border transparent>
    <template v-slot:content>
      <swiper :options="swiperOption">
        <swiper-slide v-for="(l,i) in processedArr" :key="i">
          <div style="height: 100%;display: flex;flex-wrap: wrap">
            <regular-box v-if="boxTypeIndex === 0" :rows="4" />
            <regular-box v-if="boxTypeIndex === 1" :rows="9" />
            <special-box v-if="boxTypeIndex === 2" :streams="l" />
          </div>
        </swiper-slide>
        <div slot="pagination" class="swiper-pagination swiper-pagination-blue" />
        <div slot="button-prev" class="swiper-button-prev swiper-button-blue" />
        <div slot="button-next" class="swiper-button-next swiper-button-blue" />
      </swiper>
    </template>
  </content-card>
</template>

<script>
import ContentCard from '../ContentCard'
import SpecialBox from '../boxes/SpecialBox'
import RegularBox from '../boxes/RegularBox'
export default {
  name: 'MiddleVideo',
  components: { RegularBox, SpecialBox, ContentCard },
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
      const count = Math.ceil(this.liveStream.length / slidesNumber)
      const res = []
      for (let i = 0; i < count; i++) {
        res.push(this.liveStream.slice(i * slidesNumber, i * slidesNumber + slidesNumber))
      }
      return res
    }
  }
}
</script>

<style scoped>

</style>
