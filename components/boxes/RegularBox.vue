<template>
  <content-card row transparent wrap>
    <template v-slot:content>
      <content-card v-for="i in rows" :rows="rows === 9 ? 3 : 4" :key="i">
        {{ i }}
      </content-card>
    </template>
  </content-card>
</template>

<script>
import ContentCard from '../ContentCard'
export default {
  name: 'RegularBox',
  components: { ContentCard },
  props: {
    rows: {
      type: [Boolean, Number],
      default: 4
    }
  }
}
</script>

<style scoped>

</style>
