<template>
  <content-card :cols="2" transparent row wrap>
    <template v-slot:content>
      <tab-base @click.native="choseLayout(0)" />
      <tab-base @click.native="choseLayout(1)" :box-type="1" />
      <tab-base @click.native="choseLayout(2)" :box-type="2" />
    </template>
  </content-card>
</template>

<script>
import ContentCard from '../ContentCard'
import TabBase from '../TabButton/TabBase'
export default {
  name: 'MiddleControl',
  components: { TabBase, ContentCard },
  methods: {
    choseLayout (index) {
      this.$emit('onChosenLayout', index)
    }
  }
}
</script>

<style scoped>

</style>
