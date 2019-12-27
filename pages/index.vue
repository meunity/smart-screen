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
import Cookies from 'js-cookie'
import { axios } from '../plugins/axios'
import ContentCard from '../components/ContentCard'
import RightSolution from '../components/right/RightSolution'
import RightList from '../components/right/RightList'
import MiddleVideo from '../components/middle/MiddleVideo'
import MiddleControl from '../components/middle/MiddleControl'
export default {
  components: { MiddleControl, MiddleVideo, RightList, RightSolution, ContentCard },
  data: () => ({
    layoutType: 0,
    timer: undefined,
    locationArr: [],
    alertList: []
  }),
  async beforeRouteEnter (to, from, next) {
    const username = Cookies.get('_un')
    const accessToken = Cookies.get('_at')
    if (!username || !accessToken) { return next('/signin') }
    const instance = axios.create()
    try {
      const { status } = await instance.get('/auth/iamliving', {
        headers: {
          common: {
            Authorization: 'SIMPLE-TOKEN ' + accessToken
          }
        }
      })
      if (status === 200) {
        next((vm) => {
          vm.axios.defaults.headers.common.Authorization = 'SIMPLE-TOKEN ' + accessToken
          vm.axios.interceptors.response.use((response) => {
            return response
          }, (error) => {
            if (error.response.status === 401 || error.response.status === 403) {
              vm.$router.push('/signin')
            }
          })
          vm.$store.commit('setTrueName', username)
        })
      }
    } catch (err) {
      next('/signin')
    }
  },
  methods: {
    onChosenLayout (val) {
      if (val === undefined) { return }
      this.layoutType = val
    },
    solveLocation (data = []) {
      const parentArr = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].parentId === 0) {
          if (data[i].parentId === data[i].locationId) { continue }
          parentArr.push({ id: data[i].locationId, name: data[i].nodeText })
          continue
        }
        const filterArr = parentArr.filter(ele => ele.id === data[i].parentId)
        if (filterArr.length === 0) { continue }
        parentArr.push({
          id: data[i].locationId,
          name: filterArr[0].name + data[i].nodeText
        })
      }
      return parentArr
    },
    solveCameraDetail (data) {
      return data.reduce((prev, next) => {
        return prev
      }, [])
    },
    baseRequest (url = '', callback = (arg) => { return arg }) {
      return new Promise((resolve, reject) => {
        this.axios.get(url).then(({ status, data }) => {
          if (status === 200) {
            resolve(callback(data))
          }
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getSubscribes () {
      Promise.all([
        this.baseRequest('/location/all', this.solveLocation),
        this.baseRequest('/analysis/event/subscribe')
      ]).then((dataArr) => {
        const locationArr = dataArr[0]
        this.locationArr = locationArr
        this.alertList = this.solveMessages(dataArr[1])
      }).catch((errs) => {
        console.error(errs)
      })
    },
    getAllCamera () {
      this.baseRequest('/analysis/camera', this.solveCameraDetail)
        .then((data) => {

        }).catch((err) => {
          console.error(err)
        })
    },
    solveMessages (data) {
      return data.reduce((prev, next) => {
        const filtered = this.locationArr.filter(ele => ele.id === next.locationId)
        if (filtered.length === 0) { return prev }
        prev.push({
          location: filtered[0].name,
          snapshot: 'image/jpeg;base64 ' + next.snapshot,
          word: next.triggerModel,
          timeStr: new Date(next.recordStart).toLocaleTimeString('chinese', { hour12: false })
        })
        return prev
      }, [])
    }

  }
}
</script>

<style></style>
