<template>
  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrease" v-show="food.count && food.count > 0" @click.stop.prevent="decreaseCart()">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count && food.count > 0">
      {{food.count}}
    </div>
    <div class="cart-add" @click.stop.prevent='addCart($event)'>
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
  export default {
    name: 'cartcontrol',
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 0)
        }
        this.food.count++
        this.$store.commit('increment')
        this.$store.commit('addFoodToCar', this.food)
        this.$root.eventHub.$emit('cart.add', event.target)
      },
      decreaseCart() {
        if(!event._constructed || !this.food.count) {
          return
        }
        this.food.count--
        this.$store.commit('decrease')
        this.$store.commit('deFoodFromCar', this.food)
      }
    }
  }
</script>

<style lang='stylus' scoped>
@import './cartcontrol'
</style>
