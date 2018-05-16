<template>
  <div class="ratingsWrapper" ref="ratingsWrapper">
    <div class="ratings-content">
      <div class="info">
        <div class="mark">
          <div class="num">3.9</div>
          <div class="text">综合评分</div>
          <div class="contrast">高于周边商家69.2%</div>
        </div>
        <div class="stars">
          <div class="serviceScore">
            <span class="text">服务态度</span>
            <star :size='36' score='3.9'></star>
            <span class='num'>3.9</span>
          </div>
          <div class="foodScore">
            <span class="text">服务态度</span>
            <star :size='36' score='4.0'></star>
            <span class="num">4.0</span>
          </div>
          <div class="deliveryTime">
            <span class="text">送达时间</span>
            <span class="time">44分钟</span>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="evaluation">
        <div class="classify">
          <span class="item" v-for="(item, index) in classifyArr" :key="index"
          :class="{'active': item.active, 'bad': index==2, 'badActive': index ==2 && item.active}"
          @click="filterEvel(item)">
            {{item.name}}<span class="count">{{item.count}}</span>
          </span>
        </div>
        <div class="switch" @click="evelflag = !evelflag">
          <span class="icon-check_circle" :class="{'on': evelflag}"></span>
          <span class="text">只看有内容的评价</span>
        </div>
        <div class="evel-list">
          <ul>
            <li class="evel" v-for="(evel, index) in evelArr" :key="index">
              <div class="avatar">
                <img :src="evel.avatar" width='28' height="28">
              </div>
              <div class="content">
                <div class="user">
                  <span class="name">{{evel.username}}</span>
                  <span class="rateTime">{{evel.rateTime | time}}</span>
                </div>
                <div class="star-wrapper">
                  <star :size='24' :score='evel.score'></star>
                  <span class="deliveryTime">{{evel.deliveryTime}}分钟送达</span>
                </div>
                <div class="text">
                  {{evel.text}}
                </div>
                <div class="recommend">
                  <span class="icon icon-thumb_up" v-show="evel.recommend.length"></span>
                  <span class="dish" v-for="(dish, index) in evel.recommend" :key="index">{{dish}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import star from '@/components/star/star'
import axios from 'axios'
import BScroll from 'better-scroll'
  export default {
    name: 'ratings',
    data: function() {
      return {
        evelflag: false,
        classifyArr: [
          {
            name: '全部',
            count: 57,
            active: true
          },
          {
            name: '满意',
            count: 47,
            active: false
          },
          {
            name: '不满意',
            count: 10,
            active: false
          }
        ],
        evelArr: [
          {
            "username": "3******c",
            "rateTime": 1469281964000,
            "deliveryTime": 30,
            "score": 5,
            "rateType": 0,
            "text": "不错,粥很好喝,我经常吃这一家,非常赞,以后也会常来吃,强烈推荐.",
            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
            "recommend": [
              "南瓜粥",
              "皮蛋瘦肉粥",
              "扁豆焖面",
              "娃娃菜炖豆腐",
              "牛肉馅饼"
            ]
          }
        ]
      }
    },
    components: {
      star
    }
  }
</script>

<style lang='stylus' scoped>
@import './ratings'
</style>
