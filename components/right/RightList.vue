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
      <!--      <table>-->
      <!--        <tbody>-->
      <!--          <tr v-for="(a,i) in arr" :key="i">-->
      <!--            <td>{{ a.timeStr }}</td>-->
      <!--            <td>{{ a.location }}</td>-->
      <!--            <td>{{ a.word }}</td>-->
      <!--          </tr>-->
      <!--        </tbody>-->
      <!--      </table>-->
      <div style="flex: 1;position: relative;overflow: hidden">
        <swiper
          ref="swiper"
          :options="swiperOptions"
          style="position: absolute;height: 100%"
        >
          <swiper-slide v-for="(ca,i) in currentArr" :key="'arr'+i" style="height: 0">
            <table>
              <tr v-for="(a,j) in ca" :key="'ca'+i+j">
                <td>{{ a.timeStr }}</td>
                <td>{{ a.location }}</td>
                <td>{{ a.word }}</td>
              </tr>
            </table>
          </swiper-slide>
        </swiper>
      </div>
    </template>
  </content-card>
</template>

<script>
import ContentCard from '../ContentCard'
import ChartTitle from '../ChartTitle'
export default {
  name: 'RightList',
  components: { ChartTitle, ContentCard },
  props: {
    alertList: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    arr: [
      { timeStr: '09:21:34', location: '1号楼102室', word: '发现可疑物品' },
      { timeStr: '09:21:34', location: '1号楼102室', word: '可疑物品' },
      { timeStr: '09:21:34', location: '1号楼102室', word: '发现可疑物品' },
      { timeStr: '09:22:34', location: '1号楼102室', word: '发现可疑物品' },
      { timeStr: '09:22:34', location: '1号楼102室', word: '可疑物品' },
      { timeStr: '09:22:34', location: '1号楼102室', word: '发现可疑物品' }
    ],
    swiperOptions: {
      direction: 'vertical',
      pagination: {
        clickable: true
      },
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false
      }
    }
  }),
  computed: {
    currentArr () {
      const slides = Math.ceil(this.alertList.length / 4)
      const arr = []
      for (let i = 0; i < slides; i++) {
        arr.push(this.alertList.slice(i * 4, i * 4 + 4))
      }
      return arr
    }
  }
}
</script>

<style lang="less">
.swiper-container {
  width: 100%;
}
table {
  width: 100%;
  font-size: .8vw;
  margin-top: .4vw;
  text-align: left;
  overflow: hidden;

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
