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
    </object>
  </div>
</template>

<script>
export default {
  name: 'VideoContainer',
  mounted () {
    if (process.browser) {
      const mrl = 'rtsp://192.168.100.22:8554/vlc'
      const vlc = this.$refs.vlc
      const options = ['--rtsp-tcp']
      const id = vlc.playlist.add(mrl, 'monitor', options)
      vlc.playlist.playItem(id)
    }
  },
  beforeDestroy () {
    this.$refs.vlc.playlist.stop()
    this.$refs.vlc.playlist.clear()
    this.$refs.vlc.$destroy(true)
    this.$refs.vlc.parentNode.removeChild(this.$refs.vlc)
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

  object {
    z-index: -100;
  }
}
</style>
