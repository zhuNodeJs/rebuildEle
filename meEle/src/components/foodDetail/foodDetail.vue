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
            :class="{'active': item.active, 'bad': index == 2, 'badActive': item.active&&index==2}"
            @click="filterEvel(item)">
              {{item.name}}<span class="count">{{item.count}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import cartcontrol from 'components/cartcontrol/cartcontrol'
import BScroll from 'better-scroll'

  export default {
    name: 'foodDetail',
    props: {
      food: {
        type: Object
      }
    },
    data: function() {
      return {
        showDetail: true,
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
        ]
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
      }
    },
    components: {
      cartcontrol
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20);
    }
  }
</script>

<style lang='stylus' scoped>
@import './foodDetail'
</style>
