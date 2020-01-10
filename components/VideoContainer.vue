<template>
  <div
    class="video-container"
  >
    <object
      ref="vlc"
      type="application/x-vlc-plugin"
      class="obj"
      pluginspage="http://www.videolan.org"
      codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.2.2/npapi-vlc-2.2.2.tar.xz"
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
  watch: {
    url: {
      handler (val, old) {
        if (val === old) { return }
        this.$nextTick(() => {
          this.play(val)
        })
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.play(this.url)
    })
  },
  beforeDestroy () {
    // this.release()
  },
  methods: {
    play (url) {
      const mrl = url
      const vlc = this.$refs.vlc
      if (!vlc) {
        return
      }
      const options = ['--rtsp-tcp']
      vlc.playlist.stop()
      vlc.playlist.items.clear()
      if (url) {
        const id = vlc.playlist.add(mrl, 'monitor', options)
        vlc.playlist.playItem(id)
      }
    },
    release () {
      const vlc = this.$refs.vlc
      if (!vlc) {
        return
      }
      if (vlc.playlist.items) {
        vlc.playlist.items.clear()
      }
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
    z-index: 1;

    &:hover {
      cursor: pointer;
    }

    .obj {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;

      &:hover {
        cursor: pointer;
      }
    }
  }

</style>
