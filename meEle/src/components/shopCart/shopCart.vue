<template>
  <div class="shopCartContent">
    <div class="shopCart">
     <div class="content">
       <div class="content-left">
         <div class="logo-wrapper">
           <div class="badge" v-show="totalCount">
              {{totalCount}}
           </div>
           <div class="logo" :class="{'active': totalCount}">
             <i class="icon-shopping_cart"></i>
           </div>
         </div>
         <div class="price">
           ￥0
         </div>
         <div class="desc">
           另需要配送费 ￥{{deliveryPrice}} 元
         </div>
       </div>
       <div class="content-right">
          ￥20元起送
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
       <div class="shopCart-list" v-show="listShow">
         <div class="list-header">
           <h1>购物车</h1>
           <span class="empty">清空</span>
         </div>
         <div class="list-content" ref="foodlist">
           <ul>
             <li class="food" v-for="(food, index) in selectedFoods" :key="index">
               <span class="name">链子核桃黑米粥</span>
               <div class="price">
                 <span>￥20</span>
               </div>
               <div class="cartcontrol-wrapper">
                <!-- <cartcontrol></cartcontrol> -->
               </div>
             </li>
           </ul>
         </div>
       </div>
     </transition>
    </div>
    <!-- <transition name="fade-backdrop">
      <div class="backdrop" v-show="showBackdrop" @click="hideBackdrop"></div>
    </transition> -->
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
        return this.$store.state.count;
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
