<template>
  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart()">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">
      {{food.count}}
    </div>
    <div class="cart-add" @click.stop.prevent='addCart($event)'>
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cartcontrol',
    props: {
      // food: {
      //   type: Object,
      //   default: {
      //     count: 1
      //   }
      // }
    },
    data: function() {
      return {
        food: {
          count: 0
        }
      }
    },
    methods: {
      addCart(event) {
        this.food.count = 1;
      },
      decreaseCart() {

      }
    }
  }
</script>

<style lang='stylus' scoped>
@import './cartcontrol'
</style>
