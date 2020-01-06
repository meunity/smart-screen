<template>
  <div class="main-content--container">
    <section class="main-content--left">
      <content-card top-border />
    </section>
    <section class="main-content--middle">
      <middle-video :live-stream="liveStreamArr" :box-type-index="layoutType" />
      <middle-control @onChosenLayout="onChosenLayout" />
    </section>
    <section class="main-content--right">
      <right-solution :alertList="alertList" @onSolveAlert="showModal" @onClickAlertCard="onClickAlertCard" />
      <right-list :alertList="alertList" />
    </section>
    <modal-container ref="modalContainer" :alertList="alertList" @onFinishAlert="onFinishAlert" @onSolvingAlert="onSolveAlert" />
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { mapMutations } from 'vuex'
import { axios } from '../plugins/axios'
import ContentCard from '../components/ContentCard'
import RightSolution from '../components/right/RightSolution'
import RightList from '../components/right/RightList'
import MiddleVideo from '../components/middle/MiddleVideo'
import MiddleControl from '../components/middle/MiddleControl'
import ModalContainer from '../components/ModalContainer'
// import ModalCard from '../components/ModalCard'

export default {
  components: { ModalContainer, MiddleControl, MiddleVideo, RightList, RightSolution, ContentCard },
  data: () => ({
    layoutType: 0,
    inter: undefined,
    alertInter: undefined,
    timer: undefined,
    locationArr: [],
    liveStreamArr: [],
    alertList: [],
    modalList: []

  }),
  async beforeRouteEnter (to, from, next) {
    const username = Cookies.get('_un')
    const accessToken = Cookies.get('_at')
    if (!username || !accessToken) {
      return next('/signin')
    }
    const instance = axios.create({
      headers: {
        common: {
          Authorization: 'SIMPLE-TOKEN ' + accessToken
        }
      }
    })
    try {
      const { status } = await instance.get('/auth/iamliving')
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
  mounted () {
    if (process.browser) {
      this.axios.defaults.headers.common.Authorization = 'SIMPLE-TOKEN ' + this.$cookies.get('_at')
      this.inter = setInterval(() => {
        this.testLiving()
      }, 5 * 1000)
      this.getSubscribes()
      this.getAlert()
      this.getAllCamera()
    }
  },
  beforeDestroy () {
    this.resetPrivate()
    this.$cookies.remove('_un')
    this.$cookies.remove('_at')
    clearInterval(this.inter)
    clearInterval(this.alertInter)
  },
  methods: {
    ...mapMutations(['resetPrivate']),
    showModal (eventId) {
      this.$refs.modalContainer.showModal(eventId)
    },
    onFinishAlert (eventId) {
      if (eventId === undefined) { return }
      for (const a of this.alertList) {
        if (a.eventId === eventId) {
          a.finished = true
        }
      }
    },
    onSolveAlert (eventId) {
      if (eventId === undefined) { return }
      for (const a of this.alertList) {
        if (a.eventId === eventId) {
          a.status = 1
        }
      }
    },
    onClickAlertCard (eventId) {
      this.$refs.modalContainer.showModal(eventId)
    },
    onChosenLayout (val) {
      if (val === undefined) {
        return
      }
      this.layoutType = val
    },
    getAlert () {
      this.alertInter = setInterval(() => {
        this.baseRequest('/analysis/event/subscribe', { since: Date.now() - 1000 * 5 * 60 })
          .then((data) => {
            const arr = this.solveMessages(data)
            for (let i = 0; i < this.alertList.length;) {
              const eventId = this.alertList[i].eventId
              const lastSolved = this.alertList[i].status === 1
              let found = false
              for (let j = 0; j < arr.length;) {
                if (eventId === arr[j].eventId) {
                  arr[j].status = this.alertList[i].status
                  arr[j].finished = false
                  // lastResolved只在request成功后更新，为的是避免立即处置后的应用再出现
                  if (lastSolved) {
                    arr[j].lastSolved = true
                  }
                  this.alertList.splice(i, 1)
                  found = true
                  break
                }
                j++
              }
              if (!found) {
                this.alertList[i].finished = true
                i++
              }
            }
            this.alertList = arr.concat(this.alertList)
            this.$refs.modalContainer.showModal()
          }).catch((err) => {
            console.error(err)
          })
      }, 60 * 1000)
    },
    testLiving () {
      this.axios({
        method: 'get',
        url: '/auth/iamliving'
      }).then(({ status, data }) => {
        if (status === 200) {
          console.log('iamliving')
        }
      }).catch(() => {
        this.resetPrivate()
        this.$cookies.remove('_un')
        this.$cookies.remove('_at')
        clearInterval(this.inter)
        this.$router.push('/signin')
      })
    },
    solveLocation (data = []) {
      const parentArr = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].parentId === 0) {
          if (data[i].parentId === data[i].locationId) {
            continue
          }
          parentArr.push({ id: data[i].locationId, name: data[i].nodeText })
          continue
        }
        const filterArr = parentArr.filter(ele => ele.id === data[i].parentId)
        if (filterArr.length === 0) {
          continue
        }
        parentArr.push({
          id: data[i].locationId,
          name: filterArr[0].name + data[i].nodeText
        })
      }
      return parentArr
    },
    baseRequest (url = '', params = {}, callback = (arg) => {
      return arg
    }) {
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
        this.baseRequest('/location/all', {}, this.solveLocation),
        this.baseRequest('/analysis/event/subscribe', { since: Date.now() - 5 * 1000 * 60 })
      ]).then((dataArr) => {
        this.locationArr = dataArr[0]
        this.alertList = this.solveMessages(dataArr[1])
      }).catch((errs) => {
        console.error(errs)
      })
    },
    getAllCamera () {
      this.baseRequest('/analysis/camera')
        .then((data) => {
          console.log(data)
          this.liveStreamArr = data
        }).catch((err) => {
          console.error(err)
        })
    },
    solveMessages (data) {
      return data.reduce((prev, next) => {
        const filtered = this.locationArr.filter(ele => ele.id === next.locationId)
        if (filtered.length === 0) {
          return prev
        }
        prev.push({
          eventId: next.eventId,
          location: filtered[0].name,
          snapshot: 'data:image/jpeg;base64,' + next.snapshot,
          word: next.triggerModel,
          finished: false,
          status: 0,
          lastSolved: false,
          reactGuideline: next.reactGuideline,
          timeStr: new Date(next.recordStart).toLocaleTimeString('chinese', { hour12: false })
        })
        return prev
      }, [])
    }

  }
}
</script>

<style lang="less">
.swiper-container{
  background: transparent;
}
</style>
