<template>
  <transition name="move">
    <div class="detailWrapper" ref="detailWrapper" v-show="showDetail">
      <div class="foodDetail">
        <div class="back" @click="showToggle()">
          <i class="icon-arrow_lift"></i>
        </div>
        <img :src="food.image" height="425" width="100%">
        <div class="info">
          <div class="title">{{food.name}}</div>
          <div class="monRating">
            <span>月售{{food.sellCount}}</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="unit">￥</span>{{food.price}}
            <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="shopCart">
            <transition name="fade">
              <div class="text" @click="addCart($event)" v-show="!food.count">加入购物车</div>
            </transition>
          </div>
          <cartcontrol :food='food'></cartcontrol>
        </div>
        <div class="divider"></div>
        <div class="desc">
          <div class="title">商品介绍</div>
          <div class="content">{{food.info}}</div>
        </div>
        <div class="divider"></div>
        <div class="evaluation">
          <div class="title">
            商品评价
          </div>
          <div class="classify">
            <span v-for="(item, index) in classifyArr" :key="index" class="item"
            :class="{'active': item.active, 'bad': index == 2, 'badActive': item.active && index==2}"
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
                <div class="userInfo">
                  <div class="time">{{evel.rateTime | time}}</div>
                  <div class="user">
                    <span>{{evel.username}}</span>
                    <span class="avatar"><img :src="evel.avatar" width="12" height="12"></span>
                  </div>
                </div>
                <div class="content">
                  <span class="icon" :class="evel.rateType ? 'icon-thumb_down' : 'icon-thumb_up'"></span>
                  <span class="text">{{evel.text}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import cartcontrol from 'components/cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
import time from '@/filter/time'
import Vue from 'vue'

  export default {
    name: 'foodDetail',
    props: {
      food: {
        type: Object
      }
    },
    data: function() {
      return {
        showDetail: false,
        classifyArr: [
          {
            name: '全部',
            count: this.food.ratings.length,
            active: true
          },
          {
            name: '推荐',
            count: this.food.ratings.filter((rating) => rating.rateType == 0 ).length,
            active: false
          },
          {
            name: '吐槽',
            count: this.food.ratings.filter((rating) => rating.rateType).length,
            active: false
          }
        ],
        evelflag: false
      }
    },
    computed: {
      evelArr() {
        let ratings = this.food.ratings
        let selectedIndex = 0
        let returnValue = []
        this.classifyArr.forEach((data, index) => {
          if (data.active) {
            selectedIndex = index
          }
        })

        if (this.detailWrapper) {
          this.$nextTick(() => {
            this.detailWrapper.refresh()
          })
        }

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

        return returnValue;
      }
    },
    methods: {
      showToggle() {
        this.showDetail = !this.showDetail
        if (this.showDetail) {
          this.$nextTick(() => {
            this._initScroll()
          })
        }
      },
      _initScroll() {
        if (!this.scroll) {
          this.detailWrapper = new BScroll(this.$refs.detailWrapper, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      filterEvel(item) {
        this.classifyArr.forEach((data) => {
          data.active = false
        });
        item.active = true
      },
      addCart(event) {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 0)
        }
        this.food.count++
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style lang='stylus' scoped>
@import './foodDetail'
</style>
