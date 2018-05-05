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
        <div class="support-count">
          <span class="count">{{this.seller.supports ? this.seller.supports.length + '个' : 0 + '个'}}</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
     </div>
     <div class="bulletin-wrapper">
       <span class="bulletin-title"></span>
       <span class="bulletin-text">{{seller.bulletin}}</span>
       <i class="icon-keyboard_arrow_right"></i>
     </div>
  </div>
</template>
<script>
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
        this.showDetails = true;
      },
      hideDetails() {
        this.showDetails = false;
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~@/common/stylus/index'
@import './self'
</style>
