<template>
  <div class="shopCartContent">
    <div class="shopCart">
     <div class="content">
       <div class="content-left">
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
     <!-- <div class="ball-container">
       <transition name="drop" v-on:before-enter='beforeEnter'
       v-on:enter='enter'
       v-on:after-enter='afterEnter'
       v-for='(ball, index) in balls'
       :key='index'>
       <div class="ball" v-show="ball.show">
         <div class="inner inner-hook"></div>
       </div>
       </transition>
     </div> -->
     <transition name="transHeight">
       <div class="shopCart-list">
         <div class="list-header">
           <h1 class="title">购物车</h1>
           <span class="empty">清空</span>
         </div>
         <div class="list-content" ref="foodlist">
           <ul>
             <li class="food" v-for="(food, index) in selectFoods" :key="index">
               <span class="name">链子核桃黑米粥</span>
               <div class="price">
                 <span>￥20</span>
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
      <div class="backdrop"></div>
    </transition>
  </div>
</template>

<script>
import cartcontrol from '@/components/cartcontrol/cartcontrol'

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
    computed: {
      totalCount: function() {
        return this.$store.state.count
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
