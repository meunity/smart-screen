<template>
  <div class="signin--container">
    <div class="signin-card">
      <content-card over-border>
        <template v-slot:title>
          <span class="signin--title">
            登录系统
          </span>
        </template>
        <template v-slot:content>
          <div class="divider" />
          <div class="signin--content">
            <div class="signin--input">
              <label for="username">用户名</label>
              <input id="username" v-model="username" type="text">
            </div>
            <div class="signin--input">
              <label for="password">密码</label>
              <input id="password" v-model="password" type="password">
            </div>
            <div v-show="alertWord" class="signin--alert">
              <span>{{ alertWord }}</span>
            </div>
            <div class="signin-button--container">
              <button @click="signin" :disabled="!password || !username || status !== 0" class="signin-button">
                <span v-show="status === 0">登录</span>
                <div v-show="status === 1" class="loading" />
              </button>
            </div>
          </div>
        </template>
      </content-card>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import sha1 from 'crypto-js/sha1'
import ContentCard from '../components/ContentCard'
export default {
  name: 'Signin',
  components: { ContentCard },
  data: () => ({
    username: undefined,
    password: undefined,
    alertWord: '',
    status: 0
  }),
  methods: {
    ...mapMutations(['setPrivate']),
    signin () {
      if (!this.password || !this.username) { return }
      const pwd = sha1(this.password).toString()
      const name = this.username
      this.status = 1
      this.axios({
        url: '/auth/signin',
        method: 'GET',
        params: {
          name,
          pwd
        },
        validateStatus (status) {
          return status < 201
        }
      }).then(({ status, data }) => {
        if (status === 200) {
          const trueName = data.trueName
          this.$cookies.set('_at', data.accessToken)
          this.$cookies.set('_un', trueName)
          this.setPrivate(name, pwd, decodeURIComponent(trueName))
          this.$router.push('/')
        }
      }).catch(({ response }) => {
        if (response.status === 400) {
          this.alertWord = '密码输入错误'
        } else if (response.status === 204) {
          this.alertWord = '无此用户'
        }
        setTimeout(() => {
          this.alertWord = ''
        }, 3000)
      }).finally(() => {
        this.status = 0
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/stylesheets/variables";
  .signin--container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
  .signin-card {
    width: 25vmax;
    height: 25vmax;
    display: flex;
  }
  .signin--title {
    margin-left: auto;
    margin-right: auto;
    margin-top: 1vmax;
    font-size: 1.5vmax;
  }
  .signin--content {
    margin: 3vmax auto auto auto;
  }
  .signin--input {
    margin: 1vmax 0;
    display: flex;
    justify-content: space-between;

    label {
      margin-right: 1.5vmax;
    }
    input {
      background: transparent;
      border: 1px solid fade(#dddddd,50%);
      border-radius: 5px;
      height: 1.5vmax;
      padding-left: 0.5vmax;
      width: 10vmax;

      &:hover,&:visited {
        border: 1px solid fade(@lighter-blue,50%);
        border-radius: 5px;
      }
    }
  }
  .divider {
    width: 100%;
    height: 1px;
    background: fade(@lighter-blue, 20%);
    margin-top: 1vmax;
  }
  .signin--alert {
    height: 2vmax;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid @pink;
    span {
      font-size: .5vmax;
      max-width: 10vmax;
      overflow: hidden;
      text-overflow: ellipsis;
      color: @pink;
    }
  }
  .signin-button {
    @padding-y: .6vmax;
    @padding-x: 5.5vmax;
    background: fade(@sky-blue, 50%);
    padding: @padding-y @padding-x;
    border: 1px solid transparent;
    font-size: 1vmax;
    transition: all 0.4s ease;
    span {
      letter-spacing: .5vmax;
    }
    &:hover {
      cursor: pointer;
      border: 1px solid fade(@lighter-blue,50%);
      background: fade(@lighter-blue, 10%);
    }
    &:active {
      background: fade(@sky-blue, 60%);
    }
    &:disabled {
      background: fade(@sky-blue, 10%);

      &:hover {
        border: 1px solid transparent;
        cursor: not-allowed;
      }
      span {
        color: fade(#dddddd, 50%);
      }
    }

    &--container {
      margin-top: 2vmax;
      margin-bottom: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .loading {
    border: 3px solid hsla(185, 100%, 62%, 0.2);
    border-top-color: #3cefff;
    border-radius: 50%;
    width: 1.5vmax;
    height: 1.5vmax;
    animation: spin 1s linear infinite;
  }
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
