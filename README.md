## vue项目(新重建的仿照vue饿了么官网)
一，项目准备阶段
1. 项目工具：
通讯： axios
滑动： better-scroll   
构建工具： webpack 
二，项目实战阶段
1. $ vue init webpack meEle // 初始化项目结构建立项目
2.  vue-cli中的static和src/assets的区别：
static/目录下的文件并不会被webpack处理: 他们会直接被复制到最终的打包目录(默认是dist/static)下。
```
<link rel="stylesheet" href="static/css/reset.css">
```
总的来说，static放不会变动的文件assets放可能会变动的文件。
```
data () {
        return {
             imgUrl: '图片地址',//错误写法
            imgUrl: require('图片地址')//正确的写法
        }
}
```
2.1 meta的设置使其适应手机的模式：
```
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
```
3. 获取元素节点
所有的节点指令修改为ref, 然后通过ref来获取元素节点，如：
```
<div ref='testHook'>
   test
</div>

...js code
this.$ref.testHook
```
4. 获取子组件并调用子组件的方法：
```
<test ref='testHook'></test>
// 获取方法
this.$ref.testHook.add(); // 调用test子组件的add方法
```
5. 使用emit来发送广播
vue2.x提供了一套广播机制，即一边发送广播，一边接收广播来执行相应的操作，使用方法如下：
发送的方法：
```
export default {
        methods: {
                click() {
                        Vue.$emit('add', {})
                }
        }
}

那么test组件中就需要监听，需要在created方法里写：
export default {
        created() {
                Vue.$on('add', this.add)
        },
        methods: {
                add() {
                        this.count++;
                }
        }
}
```
6. 在src目录下通常还可以创建一个common文件夹, 里面含有通用的js，stylus, fonts文件, 当在icomoon网站中字体文件创建完成后，将Fonts下面的文件添加到fonts文件夹中, 并把生成的style.css文件添加到stylus文件夹下;
7. 使用svg图片的格式来创建字体文件，使用网站icomoon来制作，将svg文件全部import进网站，然后通过修改preference来修改项目的名称，然后单击download来将生成的字体文件下载下来，将生成的fonts文件夹下的文件和style.css文件分别导入到当期的项目目录下，然后在项目中引用即可。需要注意的是：在style.css中的url的引用生成的文件的路径，他们是相对路劲，可以根据实际的情况进行修改。
8. 接口定义的数据格式：
```
<!-- 返回正确的数据的时候的数据格式 -->
res.json({
        errno: 0,
        goods: goods
})
```
9. 由于端口不同, 可以在项目中添加代理，在项目主目录下创建文件：proxy.conf.json, 内容如下：
```
{
  "/api": {
    "target": "http://127.0.0.1:8900"
  }
}
```
将其添加到启动项中：
```
--proxy-config proxy.conf.json
```
10. 组件的命名可以使用v-开头，以避免与关键名冲突。
11. 如果样式文件打算使用scss预编译器来编译：
```
#yarn add sass-loader
#yarn add node-sass
<!-- 当使用yarn 安装报错时，可以使用cnpm install --save node-sass -->
```
12. 配置路径别名， 例如将components路径映射, 修改完成后要重启程序：
```
alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'components': resolve('src/components')
    }
```
13. 对于配置首页时空白时，可以使用重定向的功能：
```
{
      path: '/',
      redirect: '/goods'
}
```
14. 改变router-link-active这个在a被激活时改变类的名称, 在router中的配置文件中添加：
```
linkActiveClass: 'active'
```
15. 1像素边框的实现(主要是通过伪类和y轴的缩放)：
```
<!-- 设置伪类 -->
.tab
  border-1px(rgba(7, 17, 27, 0.1))
<!-- mixin 类的函数 -->
@mixin border-1px($color)
  position relative
  &:after
    content: ''
    display block
    position absolute
    left 0
    bottom 0
    width 100%
    border-top 1px solid $color
<!-- 使用媒体查询通过dpr对y进行缩放 -->
@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5)
  .border-1px 
    &::after
      -webkit-transform scaleY(0.7)
      transform scaleY(0.7)

@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2)
  .border-1px
    &::after
      -webkit-transform scaleY(0.5)
      transform scaleY(0.5)      
```
16. 配置webpack的开发的跨域的代理：
```
<!-- 在index.js中proxyTable中添加如下的语句 -->
proxyTable: {
        "/api": {
                target: "http://127.0.0.1:8900",
                secure: false,
                changeOrigin: true
        }
}
<!-- 使用语句npm run dev重启即可 -->
```
17. 单击router-link切换时出现对favicon.ico的请求的解决方法：
```

```
18. css loader会把非根路径的url解释成为相对路径，加~前缀才会解释成模块路径。
```
@import '~@/common/stylus/mixin'
```
19. 当你获取一个数组的对象的长度时，如果控制台发出警告(warning),提示这个数组可能是undefined而无法获取length的值时，可做下列的处理：
```
<span>{{this.seller.supports ? this.seller.supports.length + '个' : 0 + '个'}}</span>
```
20. 背景的函数的编写(使用2倍屏和3倍屏)
```
bg-image($url)
  background-image url('img/'+$url+'@2x.png')
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
    background-image url('img/'+$url+'@3x.png')
```
21. 当遇到字体的文件无法找到的时候时可以使用绝对的地址：
```
@font-face
  font-family: 'sell-icon'
  src:  url('~@/common/fonts/sell-icon.eot?nowozp')
  src:  url('~@/common/fonts/sell-icon.eot?nowozp#iefix') format('embedded-opentype'),
    url('~@/common/fonts/sell-icon.ttf?nowozp') format('truetype'),
    url('~@/common/fonts/sell-icon.woff?nowozp') format('woff'),
    url('~@/common/fonts/sell-icon.svg?nowozp#sell-icon') format('svg')
  font-weight: normal
  font-style: normal
```
22. 设置模糊效果的：
```
filter blur(10px)
<!-- or -->
blur 10px
```
23. 当使用v-for时出现红色的警告，是因为vue2.2.x以上的版本必须加上key:
```
<li class="support-item" v-for="(item, index) in seller.supports" :key="index">
        // ...                
</li>
```
或者将eslint-plugin-vue的配置项由true改为false:
```
 "vetur.validation.template": false
```
24. star组件的思路：
 (1). 通过父子组件的传值来控制星星的数量，和星星的规格大小(有三种规格：大号的48--其宽高是20px, 中号的36--其宽高是15, 小号的24--其宽高是10) 
 (2). 通过computed钩子函数来生成result(一个数组，其中是5个星星的分别的状态，有on, half, off三种状态)
 (3). 通过css的控制来展示星星，将图片作为背景图
其中，小数的部分是四舍五入的方法来统计, 要写三套样式来分别进行控制。 
25. 商品左侧栏的内容，实现内容图片和字体的左右对齐，上下垂直居中：
```
.muItem
  display table
  font-weight bold
  .text
    display table-cell
    vertical-align middle
    padding 0 12px
```
26. 商城左右联动的主体的构造思想 (最重要的是页面的布局要正确，better-scroll是给第一个子元素添加滑动效果，并且只有当子元素超过父元素的时候，才会允许滑动)：
 (1). 首先在初始化获取数据的同时，即在Dom渲染完毕后，立刻添加获取数据，获取数据之后立刻使用this.$nextTick(()=>{})来添加better-scroll滑动并初始化，并添加监控获取foods获取滑动的距离：
 ```
 this.foodsScroll.on('scroll', (pos) => {
         this.foodsScrollY = Math.abs(Math.round(pos.y)) // 获取滑动距离的绝对值
 })
 ```
 (2). 在初始化之后，获取每个选项距离顶端的数组：
 ```
 _calculateHeight() {
         let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
         let height = 0
         this.listHeight.push(height)
         for(let i = 0, len = foodList.length; i < len; i++) {
             let item = foodList[i]
             height += item.clientHeight
             this.listHeight.push(height)    
         }
 }
 ``` 
  (3). 滑动右侧列表的，通过滑动的距离，来查看这个数组实时在处在this.listHeight的区间，然后获取当前的index, 通过计算属性可以实时的获取计算index(动态属性):
 ```
 computed: {
    menuCurrentIndex() {
        for(let i = 0, len = this.listHeight.length; i < len; i++) {
                const topHeight = this.listHeight[i]
                const bottomHeight = this.listHeight[i+1]
                if(!this.listHeight[i+1] || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight>)) {
                        return i;
                }
        }
        return 0;    
    }     
 }
 ``` 
 (4). 单击左侧的列表，右侧的列表滑动的相应的位置：
 ```
 menuClick(index, event) {
         if(!event._constructed) {
                 return
         }
         this.foodsScroll.scrollTo(0, -this.listHeight[index], 300)
 }
 ``` 
27. 单击阻止默认事件：
```
@click.stop.prevent='addCart($event)'
```
28. 过滤器和时间的处理库moment.js
```
import Vue from 'vue'
import moment from 'moment'

Vue.filter('time', function(value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm'
  return moment(value).format(formatString)
})
```
在需要使用的组件中使用：
```
import time from '@/filter/time'
```
29. 设置一个对象的属性并赋值：
```
Vue.set(this.food, 'count', 0)
```
30. 设置背景：
```
     -webkit-backdrop-filter: blur(10px)
      backdrop-filter: blur(10px)
```
31. 关于小球动画的一些问题的解释
(1). offsetHeight触发重绘

因为浏览器引擎对重拍和重绘做了优化，比如说原生的改变达到了一定的次数的才会发生，那想要立刻获得准确的DOM元素，就要手动的触发浏览器重绘，有很多的方法都可以触发，比如:offsetHeight, offsetTop, offsetLeft, offsetWidth,ScrollTop,scrollLeft,scrollWidth等等都是可以的。

(2). dropballs 
dropballs是用来存已经显示过动画的小球，这样就可以直接unshift取到值，当然也可以不用这个，直接for循环balls数组判断状态为falsh的数组再改变状态

(3). balls数组里面为什么要存五个小球
在连续点击的情况下小球动画也可以显示多个，也就是说可以同时飞多个小球，这里的小球飞入的动画时间是400ms, 如果只有一个小球，那么只能在第一个小球动画飞入之后也就是400ms之后才能显示另一个小球，但是400ms的时间足够我们单击很多次的了，这样就会造成视觉上的误差

(4). 小球动画是怎么做的呢
使用css3属性贝塞尔曲线
购物车的坐标点是固定的，可以根据css的px值计算获得。

32. getBoundingClientRect() 简介
获得元素的：bottom, height, left, right, top, width, x ,y
el.offsetHeight:触发页面的重绘

33. 注意对于数据的操作要放在获得数据之后。foodDetail组件的数据是通过传值来获取的，
而ratings组件是通过接口来获取的，是属于异步的操作，此时要特别的注意操作数据的步骤。

34.  防止标题上移：
```
.ratingsWrapper
  position: absolute
  top 174px
  left 0
  bottom: 0
  right 0
  overflow hidden
```
