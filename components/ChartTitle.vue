<template>
  <div class="chart-title">
    <img :src="icon" alt="">
    <span class="title-content">
      <slot name="chartTitle" />
    </span>
    <span class="chart-actions">
      <slot name="chartActions" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'ChartTitle',
  props: {
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.chart-title {
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  max-width: 100%;
  margin-top: .5vw;

  img {
    width: 10px;
    height: 10px;
  }
}
  .title-content {
    justify-content: flex-start;
    font-size: .9vw;
    margin-left: .2vw;
  }
  .chart-actions {
    font-size: .6vw;
    margin-left: auto;
    margin-right: .8vw;
    margin-top: .1vw;

    &:hover {
      cursor: pointer;
    }
  }

</style>
