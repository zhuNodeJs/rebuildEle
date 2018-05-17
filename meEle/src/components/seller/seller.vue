<template>
  <div class="seller-wrapper" ref="sellWrapper">
    <div class="seller-content">
      <div class="info">
        <div class="title">
          <div class="text">粥品香坊(大运村)</div>
          <div class="star-wrapper">
            <star :size='36' :score='4.0'></star>
            <span class="rate-count">(661)</span>
            <span class="sell-count">月售690单</span>
          </div>
          <div class="collect" @click="collectflag=!collectflag">
            <span class="icon-favorite" :class="{'active': collectflag}"></span>
            <span class="text">{{collectflag ? '已收藏' : '收藏'}}</span>
          </div>
        </div>
        <div class="remark">
          <div class="block">
            <h2>起步价</h2>
            <div class="content">
              <span class="num">20</span>元
            </div>
          </div>
          <div class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="num">4</span>元
            </div>
          </div>
          <div class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="num">39</span>分钟
            </div>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="activitiesWrapper">
        <div class="activities">
          <div class="bulletin">
            <h1>公告和活动</h1>
            <div class="content">
              {{seller.bulletin}}
            </div>
          </div>
        </div>
        <div class="supports">
          <ul>
           <li class="item" v-for="(item, index) in seller.supports" :key="index">
            <iconMap :iconType='item.type'></iconMap>
            <span class="text">{{item.description}}</span>
           </li>
          </ul>
        </div>
      </div>
      <div class="divider"></div>
      <div class="seller-imgs">
        <h1>商家实景</h1>
        <div class="img-wrapper" ref="picsWrapper">
          <div ref="picList">
            <img v-for="(pic, index) in seller.pics" :key="index" :src="pic" width="120" height="90">
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="seller-info">
        <h1>商家信息</h1>
        <ul class="info-list">
          <li class="info" v-for="(info, index) in seller.infos" :key="index">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '@/components/star/star'
import iconMap from '@/components/iconMap/iconMap'
import axios from 'axios'
import BScroll from 'better-scroll'
  export default {
    name: 'seller',
    created: function() {
      this._initData()
    },
    data: function() {
      return {
        collectflag: false,
        seller: {}
      }
    },
    methods: {
      _initData() {
        axios.get('/api/seller').then((res) => {
          if (!res.data.errno) {
            this.seller = res.data.data
          }
        })

        this.$nextTick(() => {
          this.sellWrapperScroll = new BScroll(this.$refs.sellWrapper, {
            click: true
          })

          this._initPics()
        })
      },
      _initPics() {
        if(this.picScroll) {
          return
        }
        this.picScroll = new BScroll(this.$refs.picsWrapper, {
          scrollX: true
        })
      }
    },
    components: {
      star,
      iconMap
    }
  }
</script>

<style lang='stylus' scoped>
@import './seller'
</style>
