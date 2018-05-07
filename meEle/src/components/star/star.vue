<template>
  <div class="star" :class="starType">
    <span v-for="(item, index) in itemClasses" :key="index" :class="item" class="star-item"></span>
  </div>
</template>

<script>

  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

  export default {
      props: {
        size: {
          type: Number
        },
        score: {
          type: Number
        }
      },
      computed: {
        starType() {
          return 'star-' + this.size;
        },
        itemClasses() {
          let result = [];
          let score = Math.floor(this.score * 2) / 2;
          let integer = Math.floor(score);
          let hasDecimal = score % 1 !== 0; // 取余不等于0
          for (let i = 0; i < integer; i++) {
            result.push(CLS_ON);
          }
          if (hasDecimal) {
            result.push(CLS_HALF)
          }
          while(result.length < LENGTH) {
            // 判断result中的长度和LENGTH进行比较，剩余的部分都是暗色的星星
            result.push(CLS_OFF)
          }
          return result;
        }
      }
  }
</script>

<style lang='stylus' scoped>
@import '~@/common/stylus/mixin'
.star
  .star-item
    display inline-block
    background-position center center
    background-repeat no-repeat
    background-size 100% 100%
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      &:last-child
        margin-right 0px
      &.on
        bg-image('star48_on')
      &.half
        bg-image('star48_half')
      &.off
        bg-image('star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      &:last-child
        margin-right 0px
      &.on
        bg-image('star36_on')
      &.half
        bg-image('star36_half')
      &.off
        bg-image('star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      &:last-child
        margin-right 0px
      &.on
        bg-image('star24_on')
      &.half
        bg-image('star24_half')
      &.off
        bg-image('star24_off')
</style>
