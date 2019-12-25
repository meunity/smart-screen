<template>
  <content-card :cols="2" transparent />
</template>

<script>
import ContentCard from '../ContentCard'
export default {
  name: 'MiddleControl',
  components: { ContentCard },
  methods: {
    choseLayout (index) {
      this.$emit('onChosenLayout', index)
    }
  }
}
</script>

<style scoped>

</style>
