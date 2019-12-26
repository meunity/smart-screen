<template>
  <div class="video-container">
    <video autoplay playsinline loop muted>
      <source :src="videoSrc">
    </video>
  </div>
</template>

<script>
export default {
  name: 'VideoContainer',
  data: () => ({
    videoSrc: 'http://q234wsbta.bkt.clouddn.com/xczxg1.mp4'
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
