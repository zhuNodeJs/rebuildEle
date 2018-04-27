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
3. 