
<template>
  <content-card row transparent wrap>
    <template v-slot:content>
      <content-card v-for="(s,i) in streamArray" :rows="rows === 9 ? 3 : 4" :key="i">
        <template v-slot:content>
          <video-container ref="video" :url="s" />
        </template>
      </content-card>
    </template>
  </content-card>
</template>

<script>
import ContentCard from '../ContentCard'
import VideoContainer from '../VideoContainer'
import BoxMixin from './BoxMixin'

export default {
  name: 'NineGridBox',
  components: { VideoContainer, ContentCard },
  mixins: [BoxMixin],
  props: {
    rows: {
      type: [Boolean, Number],
      default: 4
    }
  },
  computed: {
    streamArray () {
      if (this.liveStreamArray.length < this.rows) {
        const arr = [...this.liveStreamArray]
        for (let i = 0; i < this.rows - this.liveStreamArray.length; i++) {
          arr.push('')
        }
        return arr
      }
      return this.liveStreamArray
    }

  },
  methods: {
    onClickVideo () {
      console.log('clicked')
    }
  }
}
</script>

<style scoped>

</style>
