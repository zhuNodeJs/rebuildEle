<template>
  <div class="header">
     <div class="contentWrapper">
        <div class="avatar">
          <img :src="seller.avatar" alt="" width="64" height="64" />
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{ seller.name }}</span>
          </div>
          <div class="description">
            {{seller.description + " / " + seller.deliveryTime + '分钟到达'}}
          </div>
          <div class="supports" v-if="seller.supports">
            <div class="supports_desc">
              <span class="icon" :class="iconClassMap[seller.supports[0].type]"></span>
              <span class="text">{{seller.supports[0].description}}</span>
            </div>
          </div>
        </div>
        <div class="support-count" @click="showDetails">
          <span class="count">{{this.seller.supports ? this.seller.supports.length + '个' : 0 + '个'}}</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
     </div>
     <div class="bulletin-wrapper" @click="showDetails">
       <span class="bulletin-title"></span>
       <span class="bulletin-text">{{seller.bulletin}}</span>
       <i class="icon-keyboard_arrow_right"></i>
     </div>
     <div class="background">
       <img :src="seller.avatar" alt="" width="100%" height="100%">
     </div>
     <transition name="fade">
      <div v-if="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name"> {{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size='48' :score='seller.score'></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                <span class="icon" :class="iconClassMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">{{ seller.bulletin }}</div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="hideDetails"></i>
        </div>
      </div>
     </transition>
  </div>
</template>
<script>
import star from 'components/star/star'
  export default {
    name:'Header',
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetails() {
        this.detailShow = true;
      },
      hideDetails() {
        this.detailShow = false;
      }
    },
    components: {
      star
    }
  }
</script>
<style lang="stylus" scoped>
@import '~@/common/stylus/index'
.header
  position relative
  color #ffffff
  background-color rgba(7, 17, 27, 0.5)
  blur 10px
  overflow hidden
  .contentWrapper
    position relative
    display flex
    padding 24px 12px 18px 24px
    font-size 12px
    .avatar
      & > img
        border-radius 2px
    .content
      flex 1
      margin-left 16px
      .title
        display flex
        flex-direction row
        box-sizing content-box
        padding-top 2px
        padding-bottom 8px
        font-size 16px
        .brand
          display inline-block
          vertical-align top
          width 30px
          height 18px
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
          background-position center center
        .name
          margin-left 6px
          font-weight bold
      .description
        font-size 12px
        font-weight 200
        box-sizing content-box
        padding-bottom 10px
      .supports
        font-size 10px
        font-weight 200
        .supports_desc
          display flex
          .icon
            display inline-block
            width 12px
            height 12px
            margin-right 4px
            background-size 12px 12px
            background-repeat no-repeat
            background-position center center
            vertical-align top
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height 12px
    .support-count
      position absolute
      right 12px
      bottom 18px
      background-color rgba(0, 0, 0, 0.2)
      font-weight 200
      font-size 10px
      padding 7px 8px 7px 8px
      border-radius 14px
      text-align center
      display flex
      .count
        vertical-align top
        font-size 10px
      .icon-keyboard_arrow_right
        font-size 10px
        margin-left 2px
  .bulletin-wrapper
    display flex
    flex-direction row
    align-items center
    box-sizing content-box
    padding 9px 12px
    background-color rgba(7, 17, 27, 0.2)
    .bulletin-title
      display inline-block
      vertical-align top
      flex: 0 0 22px;
      height 12px
      bg-image('bulletin')
      background-size 100% 100%
      background-repeat no-repeat
      background-position center center
    .bulletin-text
      flex 1
      font-size 10px
      font-weight 200
      display inline-block
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      margin-left 4px
  .background
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    z-index -1
    filter blur(10px)
  .detail
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background rgba(7, 17, 27, 0.8)
    z-index 100
    -webkit-backdrop-filter blur(10px)
    .detail-wrapper
      display flex
      width 100%
      min-height 100%
      .detail-main
        display flex
        flex-direction column
        justify-content flex-start
        padding 64px 36px
        .name
          font-size 16px
          font-weight 700
          line-height 16px
          text-align center
        .star-wrapper
          margin 16px 0 28px 0
          .star
            display flex
            flex-direction row
            justify-content center
        .title
          display flex
          align-items center
          .text
            font-size 14px
            font-weight 700
            margin 0 12px
          .line
            display inline-block
            flex 1
            height 1px
            background-color rgba(255, 255, 255, 0.2)
        .supports
          margin 24px 0 28px 0
          .support-item
            display flex
            padding-left 12px
            margin-bottom 12px
            &:last-child
              margin-bottom 0
            .icon
              width 16px
              height 16px
              background-repeat no-repeat
              background-size 100% 100%
              background-position center center
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.special
                bg-image('special_2')
              &.invoice
                bg-image('invoice_2')
              &.guarantee
                bg-image('guarantee_2')
            .text
              font-size 12px
              font-weight 200
              color #ffffff
              line-height 12px
              display flex
              align-items center
              flex 1
              padding 0 12px 0 6px
              white-space nowrap
              overflow hidden
              text-overflow ellipsis
        .bulletin
          font-size 12px
          font-weight 200
          color #ffffff
          line-height 24px
          padding 24px 12px 0 12px
    .detail-close
       position absolute
       bottom 32px
       left 50%
       transform translateX(-50%)
       font-size 32px
       color rgba(255, 255, 255, 0.5)
    // 此处是页面详情的动画
    &.fade-enter-active, &.fade-leave-active
      transition opacity .5s
    &.fade-enter, &.fade-leave-active
      opacity 0
</style>
