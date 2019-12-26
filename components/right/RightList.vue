<template>
  <content-card :cols="2" bottom-border>
    <template v-slot:title>
      <chart-title>
        <template v-slot:chartTitle>
          报警列表
        </template>
        <template v-slot:chartActions>
          查看全部
        </template>
      </chart-title>
    </template>
    <template v-slot:content>
      <table>
        <tr v-for="(a,i) in arr" :key="i">
          <td>{{ a.timeStr }}</td>
          <td>{{ a.room }}</td>
          <td>{{ a.word }}</td>
        </tr>
      </table>
    </template>
  </content-card>
</template>

<script>
import ContentCard from '../ContentCard'
import ChartTitle from '../ChartTitle'
export default {
  name: 'RightList',
  components: { ChartTitle, ContentCard },
  data: () => ({
    arr: [
      { timeStr: '09:21:34', room: '1号楼102室', word: '发现可疑物品' },
      { timeStr: '09:21:34', room: '1号楼102室', word: '可疑物品' },
      { timeStr: '09:21:34', room: '1号楼102室', word: '发现可疑物品' }
    ]
  })
}
</script>

<style lang="less" scoped>
table {
  width: 100%;
  flex: 1;
  font-size: .8vw;
  margin-top: .4vw;
  text-align: left;

  tr {
    td {
      color: rgba(255,255,255,0.8);
      padding: .2vw 1vw;
    }
    td:last-child {
      text-align: right;
      padding: 0 1vw;
    }
  }
}
</style>
