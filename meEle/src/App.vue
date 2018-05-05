<template>
  <div id="app">
    <v-header :seller = seller></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
        </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
       <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from 'components/header/Header'
import axios from 'axios'

const ERR_OK = 0; // 判断是接口返回数据是否报错的标识符

export default {
  name: 'App',
  data() {
    return {
      seller: {}
    }
  },
  components: {
    'v-header': Header
  },
  created() {
    axios.get('/api/seller')
    .then((res) => {
      if (res.data.errno === ERR_OK) {
        this.seller = res.data.data
      }
    })
    .catch((error) => {
       console.log('服务器返回错误', error)
    })
  }
}
</script>

<style lang="stylus" scoped>
@import 'common/stylus/index'
#app
  .tab
    display flex
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex 1
      height 40px
      & > a
        display flex
        height 100%
        flex-direction row
        justify-content center
        align-items center
        font-size 14px
        color rgb(77, 85, 93)
        &.active
          color rgb(240, 20, 20)
</style>
