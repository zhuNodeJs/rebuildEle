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
22. 













