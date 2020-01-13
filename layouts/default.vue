<template>
  <div id="app">
    <top-header />
    <section class="app-content">
      <nuxt />
    </section>
  </div>
</template>

<script>
import TopHeader from '../components/TopHeader'
export default {
  components: { TopHeader }
}
</script>
