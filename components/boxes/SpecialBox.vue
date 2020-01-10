<template>
  <content-card transparent row wrap>
    <template v-slot:content>
      <div v-for="(s,i) in streamArray" :key="i" class="special-card--container">
        <video-container :url="s" />
      </div>
    </template>
  </content-card>
</template>

<script>
import ContentCard from '../ContentCard'
import VideoContainer from '../VideoContainer'
import BoxMixin from './BoxMixin'
export default {
  name: 'SpecialBox',
  components: { VideoContainer, ContentCard },
  mixins: [BoxMixin]
}
</script>

<style lang="less" scoped>
  @import "../../assets/stylesheets/variables";
.special-card--container {
  flex: 1;
  background: @medium-blue;
  margin: .2vw;
  width: 33%;
  max-width: 33%;
  height: 32%;
  min-height: 32%;
  &:first-child {
    width: 99.2%;
    min-width: 99.2%;
    max-width: 100%;
    height: 65%;
    min-height: 65%;
  }
}
</style>
