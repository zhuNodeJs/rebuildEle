<template>
  <div class="goods">
    <div class="goodsContent">
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
                  <li v-for="(food, index) in item.foods" :key="index" class="food-item"  @click="goDetail(food)">
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
                      <div class="cartcontrol-wrapper">
                        <cartcontrol :food = 'food'></cartcontrol>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
    </div>

    <shopCart :deliveryPrice='seller.deliveryPrice' :minPrice='seller.minPrice'></shopCart>
    <foodDetail :food='selectedFood' ng-if='true' ref="myFood"></foodDetail>
  </div>
</template>

<script>
  import axios from 'axios'
  import iconMap from 'components/iconMap/iconMap'
  import BScroll from 'better-scroll'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import shopCart from 'components/shopCart/shopCart'
  import foodDetail from 'components/foodDetail/foodDetail'

  const ERR_OK = 0
  export default {
    name: 'goods',
    props: {
      seller: {
        type: Object
      }
    },
    data: function() {
      return {
        goods: [],
        foodsScrollY: 0,
        listHeight: [], // 储存各个右侧各个类别距离顶部的距离
        selectedFood: {
          "name": "皮蛋瘦肉粥",
          "price": 10,
          "oldPrice": "",
          "description": "咸粥",
          "sellCount": 229,
          "rating": 100,
          "info": "一碗皮蛋瘦肉粥，总是我到粥店时的不二之选。香浓软滑，饱腹暖心，皮蛋的Q弹与瘦肉的滑嫩伴着粥香溢于满口，让人喝这样的一碗粥也觉得心满意足",
          "ratings": [
            {
              "username": "3******c",
              "rateTime": 1469281964000,
              "rateType": 0,
              "text": "很喜欢的粥",
              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
            },
            {
              "username": "2******3",
              "rateTime": 1469271264000,
              "rateType": 0,
              "text": "",
              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
            },
            {
              "username": "3******b",
              "rateTime": 1469261964000,
              "rateType": 1,
              "text": "",
              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
            }
          ],
          "icon": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
          "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
        }
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
        console.log('接口报错信息: ')
      })

    },
    components: {
      iconMap,
      cartcontrol,
      shopCart,
      foodDetail
    },
    computed: {
      menuCurrentIndex() {
        // foodsScrollY 右边列表滑动的距离
        // 通过判断距离顶部的滑动的距离，使用数组来判断所在的位置
        for(let i = 0, len = this.listHeight.length; i < len; i++) {
           const topHeight = this.listHeight[i]
           const bottomHeight = this.listHeight[i+1]
           if (!this.listHeight[i+1] || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
             return i;
           }
        }
        return 0;
      }
    },
    methods: {
      menuClick(index, event) {
        if (!event._constructed) {
          return
        }
        // 单击根据列表的距离顶端的距离滑动到顶端
        this.foodsScroll.scrollTo(0, -this.listHeight[index], 300);
      },
      _initScroll() {
        if (!this.scroll) {
          this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
              click: true
          })

          this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
            click: true,
            probeType: 3
          })
        } else {
          this.scroll.refresh()
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
      },
      goDetail(food) {
        this.selectedFood = food
        console.log(food)
        this.$nextTick(() => {
          // this.$refs.myFood
        })
      },
      created() {
        // this.selectedFood =
      }
    }
  }
</script>

<style lang='stylus' scoped>
@import '~@/common/stylus/index'
@import './self'

</style>
