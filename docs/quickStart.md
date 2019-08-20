#### 安装

```js
npm  i  mi-vant -D
```





#### 引入组件
##### webpack中的配置  以vue2.x脚手架举例 在/build/webpack.base.conf.js中配置即可

```js
module.exports = {
  ...
  resolve: {
    extensions: ['.less',...],
 }
  ...
}
```




**注意**  按需引入时，引入的是组件库中单个组件的less文件 请引入之前添加less-loader进行解析
##### 方式一   自动按需引入组件

```js
// MiButton组件中内置了单个组件所需的样式  无需配置babel-plugin-import
 import { MiButton, Modal } from 'miVant'
 import Vue from 'vue'

 Vue.use(MiButton)
 Vue.use(Modal)
```



##### 方式二  手动按需引入组件

```js
import MiButton from 'miVant/lib/Button'
import Modal from 'miVant/lib/Modal'
import Vue from 'vue'

 Vue.use(MiButton)
 Vue.use(Modal)
```





##### 方式三  导入所有组件

```js
 import miVant from 'miVant'
 import Vue from 'vue'

 Vue.use(miVant)
```



##### rem适配

Vant 中的样式默认使用`px`作为单位，如果需要使用`rem`单位，推荐使用以下两个工具

- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 postcss 插件，用于将单位转化为 rem
- [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 rem 基准值

下面提供了一份基本的 postcss 配置，可以在此配置的基础上根据项目需求进行修改
-  类似于babel的执行原理，Postcss-loader 会自动解析根目录下的postcss.config.js

-  注意： 需要设置html中的根字体大小

```js
module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    "postcss-px2rem": { remUnit: 100 }
  }
}
```
> 注意：在配置 postcss-loader 时，应避免 ignore node_modules 目录，这会导致 miVant 的样式无法被编译



