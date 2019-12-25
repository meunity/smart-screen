<template>
  <content-card :cols="8" over-border transparent>
    <template v-slot:content>
      <regular-box v-if="boxTypeIndex === 0" :rows="4" />
      <regular-box v-if="boxTypeIndex === 1" :rows="9" />
    </template>
  </content-card>
</template>

<script>
import ContentCard from '../ContentCard'
import RegularBox from '../boxes/RegularBox'
export default {
  name: 'MiddleVideo',
  components: { RegularBox, ContentCard },
  props: {
    boxTypeIndex: {
      type: [Boolean, Number],
      default: 4
    }
  },
  data: () => ({

  })
}
</script>

<style scoped>

</style>
