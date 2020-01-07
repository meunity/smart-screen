<template>
  <div class="video-container">
    <!--    <video :src="videoSrc" autoplay playsinline loop muted />-->
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
  video {
    position: absolute;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
