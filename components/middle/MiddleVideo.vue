<template>
  <content-card :cols="8" @click.native="onClick" over-border transparent>
    <template v-slot:content>
      <regular-box v-if="boxTypeIndex === 0" :live-stream-array="resArray" :rows="4" />
      <nine-grid-box v-if="boxTypeIndex === 1" :live-stream-array="resArray" :rows="9" />
      <special-box v-if="boxTypeIndex === 2" :live-stream-array="resArray" />
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
    cp: {
      type: Number,
      default: 0
    },
    liveStream: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    resArray () {
      if (this.processedArr.length <= this.cp) {
        return []
      }
      return this.processedArr[this.cp]
    },
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
        // 这里只对rtsp协议做了处理
        switch (ele.protocol) {
          case 'rtsp':
            return profile.url
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
  mounted () {
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
