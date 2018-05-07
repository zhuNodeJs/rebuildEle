<template>
    <span class="iconMap" :class="iconClassMap[iconType]"></span>
</template>

<script>
  export default {
    props: {
      iconType: {
        type: Number
      }
    },
    created() {
      // 钩子
      this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  }
</script>

<style lang='stylus' scoped>
@import '~@/common/stylus/mixin'
.iconMap
  display inline-block
  background-position center center
  background-size 100% 100%
  background-repeat no-repeat
  width 12px
  height 12px
  &.decrease
    bg-image('decrease_4')
  &.discount
    bg-image('discount_4')
  &.special
    bg-image('special_4')
  &.invoice
    bg-image('invoice_4')
  &.guarantee
    bg-image('guarantee_4')
</style>
