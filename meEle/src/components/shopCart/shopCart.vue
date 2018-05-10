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

    </div>
  </div>
</template>

<script>
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
    data: function() {
      return {
        totalCount: 1
      }
    }
  }
</script>

<style lang='stylus' scoped>
@import './shopCart'
</style>
