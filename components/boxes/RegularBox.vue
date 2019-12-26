<template>
  <content-card row transparent wrap>
    <template v-slot:content>
      <content-card v-for="i in rows" :rows="rows === 9 ? 3 : 4" :key="i">
        <template v-slot:content>
          <video-container />
        </template>
      </content-card>
    </template>
  </content-card>
</template>

<script>
import ContentCard from '../ContentCard'
import VideoContainer from '../VideoContainer'
export default {
  name: 'RegularBox',
  components: { VideoContainer, ContentCard },
  props: {
    rows: {
      type: [Boolean, Number],
      default: 4
    }
  }
}
</script>

<style scoped>

</style>
