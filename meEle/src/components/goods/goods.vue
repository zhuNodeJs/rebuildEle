<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" @click="menuClick(index, $event)"
          :class="index === menuCurrentIndex ? 'menu-item-selected': 'menu-item'"
        >
          <span class="text">
            <iconMap v-show="item.type > 0" :iconType = 'item.type'></iconMap>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import iconMap from 'components/iconMap/iconMap'

  const ERR_OK = 0
  export default {
    name: 'goods',
    data: function() {
      return {
        goods: [],
        menuCurrentIndex: 0
      }
    },
    created() {
      axios.get('/api/goods')
      .then((res) => {
        if (res.data.errno === ERR_OK) {
          this.goods = res.data.data;
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
        this.menuCurrentIndex = index;
      }
    }
  }
</script>

<style lang='stylus' scoped>

@import './self'

</style>
