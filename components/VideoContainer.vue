<template>
  <div class="video-container">
    <object
      id="vlc"
      type="application/x-vlc-plugin"
      events="false"
      width="100%"
      height="100%"
      pluginspage="http://www.videolan.org"
      codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.0.6/npapi-vlc-2.0.6.tar.xz"
    >
      <param name="mrl" value="rtsp://192.168.100.22:8554/vlc">
      <param name="volume" value="50">
      <param name="autoplay" value="true">
      <param name="loop" value="true">
      <param name="fullscreen" value="false">
    </object>
  </div>
</template>

<script>
export default {
  name: 'VideoContainer',
  data: () => ({
    videoSrc: 'rtsp://192.168.100.22:8554/vlc'
  })
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
    z-index: -1;
  }
}
</style>
