<template>
  <div class="video-container">
    <object
      id="vlc"
      ref="vlc"
      type="application/x-vlc-plugin"
      events="True"
      width="100%"
      height="100%"
      pluginspage="http://www.videolan.org"
      codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.0.6/npapi-vlc-2.0.6.tar.xz"
    >
      <param name="mrl" value="">
      <param name="volume" value="50">
      <param name="autoplay" value="true">
      <param name="loop" value="true">
      <param name="controls" value="false">
      <param name="fullscreen" value="false">
      <param name="windowless" value="true">
    </object>
  </div>
</template>

<script>
export default {
  name: 'VideoContainer',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.play(this.url)
    })
  },
  beforeDestroy () {
    this.release()
  },
  methods: {
    play (url) {
      const mrl = url
      const vlc = this.$refs.vlc
      const options = ['--rtsp-tcp']
      const id = vlc.playlist.add(mrl, 'monitor', options)
      vlc.playlist.playItem(id)
    },
    release () {
      const vlc = this.$refs.vlc
      vlc.playlist.stop()
      vlc.playlist.clear()
    }
  }
}
</script>

<style lang="less" scoped>
.video-container {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  z-index: 0;
}
</style>
