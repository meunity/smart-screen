<template>
  <header class="app-header">
    <div class="app-header--left">
      <span>{{ currentDate }}</span>
      <span>{{ currentTime }}</span>
    </div>
    <div @click="$router.push('/')" class="app-header--middle" />
    <div class="app-header--right">
      <svg
        t="1577255923320"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2649"
        width="24"
        height="24"
      ><path d="M510 64.4c-246.5 0-447.6 200-447.6 447.6 0 246.5 200 447.6 447.6 447.6 246.5 0 447.6-200 447.6-447.6 0-246.5-200.1-447.6-447.6-447.6z m0 831.9c-212.3 0-384.3-172-384.3-384.3s172-384.3 384.3-384.3 384.3 172 384.3 384.3-172 384.3-384.3 384.3z m229.1-181.2c-18.4-70.4-67.9-125.5-131.2-153.6 48-30.6 79.6-84.2 79.6-144.9 0-94.9-77.1-172-172-172s-172 77.1-172 172c0 61.2 31.6 114.8 79.6 144.9-63.8 27.6-113.3 83.2-131.7 153.6-4.1 16.3 5.6 33.2 21.9 37.3 2.6 0.5 5.1 1 7.7 1 13.8 0 26-9.2 29.6-23 19.4-75 87.3-127.1 164.3-127.1S660 655.4 679.4 730.4c4.1 16.3 20.9 26 37.3 21.9 16.8-4 27-20.9 22.4-37.2zM515.6 305.8c61.2 0 110.7 49.5 110.7 110.7s-49.5 110.7-110.7 110.7-110.7-49.5-110.7-110.7 49.5-110.7 110.7-110.7z" p-id="2650" fill="#ffffff" /></svg>

      <span>{{ trueName }}</span>
      <span>/</span>
      <span @click="switchUser" style="cursor: pointer">切换用户</span>
    </div>
  </header>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'TopHeader',
  data: () => ({
    currentTime: '',
    timerId: undefined
  }),
  computed: {
    trueName () {
      return this.$store.state.username
    },
    currentDate () {
      const date = new Date()
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    }
  },
  created () {
    this.currentTime = new Date().toLocaleTimeString()
    this.timerId = setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timerId)
  },
  methods: {
    ...mapMutations(['resetPrivate']),
    switchUser () {
      this.$cookies.remove('_un')
      this.$cookies.remove('_at')
      this.resetPrivate()
      window.location.href = '/signin'
    }
  }
}
</script>

<style scoped>

</style>
