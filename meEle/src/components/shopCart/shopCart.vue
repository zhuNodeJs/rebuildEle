<template>
  <div class="shopCartContent">
    <div class="shopCart">
     <div class="content">
       <div class="content-left" @click="listToggle">
         <div class="logo-wrapper">
           <div class="badge" v-show="totalCount">
              {{totalCount}}
           </div>
           <div class="logo" :class="{'active': totalPrice}">
             <i class="icon-shopping_cart"></i>
           </div>
         </div>
         <div class="price" :class="{'active': totalPrice}">
           ￥{{totalPrice}}
         </div>
         <div class="desc">
           另需要配送费 ￥{{deliveryPrice}} 元
         </div>
       </div>
       <div class="content-right" :class="{'enough': totalPrice >= minPrice}">
          {{payDesc}}
       </div>
     </div>
     <div class="ball-container">
       <transition name="drop" v-on:before-enter='beforeEnter'
       v-on:enter='enter'
       v-on:after-enter='afterEnter'
       v-for='(ball, index) in balls'
       :key='index'>
       <div class="ball" v-show="ball.show">
         <div class="inner inner-hook"></div>
       </div>
       </transition>
     </div>
     <transition name="transHeight">
       <div class="shopCart-list" v-show="listShow">
         <div class="list-header">
           <h1 class="title">购物车</h1>
           <span class="empty" @click="setEmpty()">清空</span>
         </div>
         <div class="list-content" ref="foodlist">
           <ul>
             <li class="food" v-for="(food, index) in selectFoods" :key="index">
               <span class="name">{{food.name}}</span>
               <div class="price">
                 <span>￥{{food.count * food.price}}</span>
               </div>
               <div class="cartcontrol-wrapper">
                <cartcontrol :food='food'></cartcontrol>
               </div>
             </li>
           </ul>
         </div>
       </div>
     </transition>
    </div>
    <transition name="fade-backdrop">
      <div class="backdrop" v-show="showBackdrop" @click="hideBackdrop"></div>
    </transition>
  </div>
</template>

<script>
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import BScroll from 'better-scroll'

  export default {
    name: 'shopCart',
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.$root.eventHub.$on('cart.add', this.add)
    },
    data: function () {
      return {
        listShow: false,
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: []
      }
    },
    computed: {
      totalCount: function() {
        let returnValue = 0
        this.selectFoods.forEach((food) => {
          returnValue += food.count
        })
        return returnValue
      },
      selectFoods: function() {
        return this.$store.state.selectedFoods
      },
      totalPrice() {
        let sum = 0
        if (this.selectFoods.length > 0) {
          this.selectFoods.forEach(food => {
              sum += food.count * food.price
          });
        } else {
          sum = 0
        }
        return sum
      },
      payDesc() {
        let diff = this.minPrice - this.totalPrice
        if (!this.totalPrice) {
          return `￥${this.minPrice}起送`
        } else if(diff > 0) {
          return `还差￥${diff}元`
        } else {
          return '去结算'
        }
      },
      showBackdrop() {
        if (this.listShow && this.totalPrice) {
          return true
        }
        this.listShow = false
        return false
      }
    },
    methods: {
      add(el) {
        for (let i = 0, l = this.balls.length; i < l; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      _initScroll() {
        this.foodlistScroll = new BScroll(this.$refs.foodlist, {
          click: true
        })
      },
      hideBackdrop() {
         this.listShow = false
      },
      setEmpty() {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      listToggle() {
        if (!this.selectFoods.length) {
          return
        }
        this.listShow = !this.listShow
        if (this.listShow) {
          this.$nextTick(() => {
            if (!this.foodlistScroll) {
              this._initScroll()
            } else {
              this.foodlistScroll.refresh()
            }
          })
        }
      },
      beforeEnter(el) {
        let count = this.balls.length
        while(count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
            el.style.transform = `translate3d(0, ${y}px, 0)`
            let inner = el.querySelector('.inner-hook')
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
            inner.style.transform = `translate3d(${x}px, 0, 0)`
          }
        }
      },
      enter(el) {
        el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform='translate3d(0,0,0)'
          let inner = el.querySelector('.inner-hook')
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        })
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style lang='stylus' scoped>
@import './shopCart'
</style>
