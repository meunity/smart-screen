<template>
  <div class="main-content--container">
    <section class="main-content--left">
      <content-card top-border />
    </section>
    <section class="main-content--middle">
      <middle-video :box-type-index="layoutType" />
      <middle-control @onChosenLayout="onChosenLayout" />
    </section>
    <section class="main-content--right">
      <right-solution />
      <right-list />
    </section>
  </div>
</template>

<script>

import ContentCard from '../components/ContentCard'
import RightSolution from '../components/right/RightSolution'
import RightList from '../components/right/RightList'
import MiddleVideo from '../components/middle/MiddleVideo'
import MiddleControl from '../components/middle/MiddleControl'
export default {
  components: { MiddleControl, MiddleVideo, RightList, RightSolution, ContentCard },
  data: () => ({
    layoutType: 0
  }),
  methods: {
    onChosenLayout (val) {
      if (val === undefined) { return }
      this.layoutType = val
    }
  }
}
</script>

<style></style>
