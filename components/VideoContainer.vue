<template>
  <div v-if="url" class="video-container">
    <object
      ref="vlc"
      @click="clicked"
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
        if (val !== '') {
          this.$nextTick(() => {
            this.release()
            this.play(val)
          })
        } else {
          this.$nextTick(() => {
            this.release()
          })
        }
      },
      immediate: true
    }
  },
  mounted () {
    this.$nextTick(() => {

    })
  },
  beforeDestroy () {
    this.release()
  },
  methods: {
    play (url) {
      const mrl = url
      const vlc = this.$refs.vlc
      if (!vlc || !url) {
        return
      }
      const options = ['--rtsp-tcp']
      const id = vlc.playlist.add(mrl, 'monitor', options)
      vlc.playlist.playItem(id)
    },
    release () {
      const vlc = this.$refs.vlc
      if (!vlc) {
        return
      }
      if (vlc.playlist.items.count > 0) {
        vlc.playlist.stop()
      }
      vlc.playlist.items.clear()
    },

    clicked () {
      console.log('clicked')
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
