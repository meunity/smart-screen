<template>
  <content-card :cols="8" top-border row wrap>
    <template v-slot:title>
      <chart-title>
        <template v-slot:chartTitle>
          报警处理
        </template>
        <template v-slot:chartActions>
          <span class="action-content">查看全部</span>
        </template>
      </chart-title>
    </template>
    <template v-slot:content>
      <alert-card :status="1" alert-word="发现可疑物品" title="15号楼301室" />
      <alert-card :status="2" alert-word="发现可疑物品" title="15号楼301室" />
      <alert-card :status="2" alert-word="发现可疑物品" title="15号楼301室" />
      <alert-card alert-word="发现可疑物品" title="15号楼301室" finished />
      <alert-card alert-word="发现可疑物品" title="15号楼301室" finished />
      <alert-card alert-word="发现可疑物品" title="15号楼301室" finished />
    </template>
  </content-card>
</template>

<script>
import ContentCard from '../ContentCard'
import ChartTitle from '../ChartTitle'
import AlertCard from '../AlertCard'
export default {
  name: 'RightSolution',
  components: { AlertCard, ChartTitle, ContentCard }
}
</script>

<style lang="less" scoped>
.action-content {
  line-height: 1;
}
</style>
