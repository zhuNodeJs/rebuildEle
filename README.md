## vue项目(新重建的仿照vue饿了么官网)
一，项目准备阶段    
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
6. 

















