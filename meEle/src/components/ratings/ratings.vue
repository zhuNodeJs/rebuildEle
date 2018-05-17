<template>
  <div class="ratingsWrapper" ref="ratingsWrapper">
    <div class="ratings-content">
      <div class="info">
        <div class="mark">
          <div class="num">{{seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="contrast">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="stars">
          <div class="serviceScore">
            <span class="text">服务态度</span>
            <star :size='36' :score='seller.serviceScore'></star>
            <span class='num'>{{seller.serviceScore}}</span>
          </div>
          <div class="foodScore">
            <span class="text">服务态度</span>
            <star :size='36' :score='seller.foodScore'></star>
            <span class="num">{{seller.foodScore}}</span>
          </div>
          <div class="deliveryTime">
            <span class="text">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="evaluation">
        <div class="classify">
          <span class="item" v-for="(item, index) in classifyArr" :key="index"
          :class="{'active': item.active, 'bad': index==2, 'badActive': index ==2 && item.active}"
          @click="filterEvel(item)">
            {{item.name}}<span class="count">{{item.count}}</span>
          </span>
        </div>
        <div class="switch" @click="evelflag = !evelflag">
          <span class="icon-check_circle" :class="{'on': evelflag}"></span>
          <span class="text">只看有内容的评价</span>
        </div>
        <div class="evel-list">
          <ul>
            <li class="evel" v-for="(evel, index) in evelArr" :key="index">
              <div class="avatar">
                <img :src="evel.avatar" width='28' height="28">
              </div>
              <div class="content">
                <div class="user">
                  <span class="name">{{evel.username}}</span>
                  <span class="rateTime">{{evel.rateTime | time}}</span>
                </div>
                <div class="star-wrapper">
                  <star :size='24' :score='evel.score'></star>
                  <span class="deliveryTime" v-if='evel.deliveryTime'>{{evel.deliveryTime}}分钟送达</span>
                </div>
                <div class="text">
                  {{evel.text}}
                </div>
                <div class="recommend">
                  <span class="icon icon-thumb_up" v-show="evel.recommend.length"></span>
                  <span class="dish" v-for="(dish, index) in evel.recommend" :key="index">{{dish}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import star from '@/components/star/star'
import axios from 'axios'
import BScroll from 'better-scroll'
  export default {
    name: 'ratings',
    created: function() {
      this._initData()
    },
    data: function() {
      return {
        evelflag: false,
        ratings: [],
        seller: {},
        classifyArr: [
          {
            name: '全部',
            count: 0,
            active: true
          },
          {
            name: '满意',
            count: 0,
            active: false
          },
          {
            name: '不满意',
            count: 0,
            active: false
          }
        ]
      }
    },
    computed: {
      evelArr() {
        let ratings = this.ratings
        let selectedIndex = 0
        let returnValue =[]
        this.classifyArr.forEach((data, index) => {
          if (data.active) {
            selectedIndex = index
          }
          if (!index) {
            data.count = ratings.length
          } else {
            data.count = ratings.filter((item) => item.rateType === index - 1).length
          }
        })

        if (!selectedIndex) {
          returnValue = ratings
        } else if (selectedIndex === 1) {
          returnValue = ratings.filter((item) => !item.rateType)
        } else if (selectedIndex === 2) {
          returnValue = ratings.filter((item) => !!item.rateType)
        }

        if (returnValue.length > 0 && this.evelflag) {
          returnValue = returnValue.filter((item) => item.text && item.text.length > 0)
        }

        return returnValue
      }
    },
    methods: {
      _initData() {
        axios.all([
          axios.get('/api/seller'),
          axios.get('/api/ratings')
        ])
        .then(axios.spread((userResp, reposResp) => {
          this.seller = userResp.data.data
          this.ratings = reposResp.data.data
        }))

        this.$nextTick(() => {
          this.ratingsWrapperScroll = new BScroll(this.$refs.ratingsWrapper, {
            click: true
          })
        })
      },
      filterEvel(item) {
        this.classifyArr.forEach(data => {
           data.active = false
        })
        item.active = true
      }
    },
    components: {
      star
    }
  }
</script>

<style lang='stylus' scoped>
@import './ratings'
</style>
