<template>
  <content-card row transparent wrap>
    <template v-slot:content>
      <content-card v-for="(s,i) in streamArray" :rows="4" :key="i">
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
  name: 'RegularBox',
  components: { VideoContainer, ContentCard },
  mixins: [BoxMixin],
  methods: {
    onClickVideo () {
      console.log('clicked')
    }
  }
}
</script>

<style scoped>

</style>
