<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="muItem" v-for="(item, index) in goods" :key="index" @click="menuClick(index, $event)"
          :class="index === menuCurrentIndex ? 'menu-item-selected': 'menu-item'"
        >
          <span class="text">
            <iconMap v-show="item.type > 0" :iconType = 'item.type'></iconMap>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>

    <div class="foods-wrapper" id="wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="food-list food-list-hook">
          <h1>{{item.name}}</h1>
          <ul>
            <li v-for="(food, index) in item.foods" :key="index" class="food-item">
               <div class="icon">
                 <img alt="" :src="food.icon" width="57" height="57">
               </div>
               <div class="content">
                 <h2>{{food.name}}</h2>
                 <p class="description" v-show="food.description">{{food.description}}</p>
                 <div class="sell-info">
                   <span class="sellCount">月售{{food.sellCount}}</span>
                   <span class="rating">好评率{{food.rating}}%</span>
                 </div>
                 <div class="price">
                   <span class="newPrice"><span class="unit">￥</span>{{food.price}}</span>
                   <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                 </div>
                 <div class="cartcontrol-wrapper"></div>
               </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import iconMap from 'components/iconMap/iconMap'
  import BScroll from 'better-scroll'

  const ERR_OK = 0
  export default {
    name: 'goods',
    data: function() {
      return {
        goods: [],
        menuCurrentIndex: 0,
        foodsScrollY: 0,
        listHeight: [] // 储存各个右侧各个类别距离顶部的距离
      }
    },
    created() {
      axios.get('/api/goods')
      .then((res) => {
        if (res.data.errno === ERR_OK) {
          this.goods = res.data.data;
          this.$nextTick(() => {
            this._initScroll(); // 初始化scroll
            this._calculateHeight(); // 初始化列表高度
          })
        }
      })
      .catch((err) => {
        console.log('接口报错信息: ');
      })

    },
    components: {
      iconMap
    },
    methods: {
      menuClick(index, event) {
        console.log('...', event)
        if (!event._constructed) {
          return
        }
        this.menuCurrentIndex = index;
        // 单击根据列表的距离顶端的距离滑动到顶端
        this.foodsScroll.scrollTo(0, -this.listHeight[index], 300);
      },
      _initScroll() {
        console.log(this.$refs);
        if (!this.scroll) {
          this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
              click: true
          })

          this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
            click: true,
            probeType: 3
          })
        } else {
          this.scroll.refresh();
        }

        // 监控滚动事件
        this.foodsScroll.on('scroll', (pos) => {
         this.foodsScrollY = Math.abs(Math.round(pos.y));
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0, l = foodList.length; i < l; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    }
  }
</script>

<style lang='stylus' scoped>
@import '~@/common/stylus/index'
@import './self'

</style>
