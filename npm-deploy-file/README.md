## MI-vant组件库

> 打造一个内部的组件库，哈哈哈哈哈😁

#### 目前完成的

- 自定义主体
- 按需加载
- 预览模式
- 文档功能

#### 未完成

- ssr 支持服务端渲染
- rem适配   跟目前想看的rem  要适配



#### 技术选型

> 最初的时候 考虑过使用vue-cli3.0 vue-loader15+webpack4的配置 后来考虑到稳定性 暂时放弃

- 使用babel7的插件和配置
- 使用less作为项目中css的开发语言
- 更改webpack中的打包配置 使其可以支持按需引入
- 增加rollup的打包方式
- 引入storybook  来支持项目的预览功能
- 引入vue-loader15
- 引入vue-markdown-loader等相关插件 支持文档功能

#### 为什么要升级到babel7

实际上当我们升级到babel7之后，使用babel.config.js 相比于.babelrc 会给我们带来很多兼容问题。。。。

> 相关文档

[Babel7 发布](https://babel.docschina.org/blog/2018/08/27/7.0.0)

[babelrc和babel.config.js 的区别](https://www.babeljs.cn/docs/configuration)

[升级至babel7](https://babel.docschina.org/docs/en/7.0.0/v7-migration)

[babel7的简单升级指南](https://juejin.im/post/5b87cab1e51d4538ac05dc54)

[一文读懂 babel7 的配置文件加载逻辑](https://segmentfault.com/a/1190000018358854)

[Babel快速上手使用指南](https://juejin.im/post/5cf45f9f5188254032204df1)

[babel官网](https://babeljs.io/docs/en/)

> 以vue-cli 2.9.6版本举例  生成的项目中默认是.babelrc

.babelrc中的配置和相关的依赖

```Js
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2",
  ],
  "plugins": [
    "transform-vue-jsx",
    "transform-runtime"
  ],
}

```

- package.json中的配置

```
    "babel-helper-vue-jsx-merge-props": "^2.0.3",
    "babel-loader": "^7.1.1",
    "babel-plugin-syntax-jsx": "^6.18.0",
    "babel-plugin-transform-object-rest-spread": "^6.26.0",
    "babel-plugin-transform-runtime": "^6.22.0",
    "babel-plugin-transform-vue-jsx": "^3.5.0",
    "babel-preset-env": "^1.3.2",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-2": "^6.22.0",
    "@babel/core": "^7.5.5",
```



Babel.config.js中的配置和相关依赖

```Js
module.exports = function (api) {
  api.cache(true);

  const presets = ["@babel/preset-env"];
  const plugins = ["@babel/plugin-transform-runtime", '@babel/plugin-transform-object-assign'];

  return {
    presets,
    plugins
  };
}

```



> package.json中

```Js
    "@babel/core": "^7.5.5",
    "@babel/plugin-transform-object-assign": "^7.2.0",
    "@babel/plugin-transform-runtime": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "@babel/preset-stage-3": "^7.0.0",
    "@babel/runtime": "^7.5.5",
    "babel-loader": "^8.0.6",
```

#### 组件库中的组件如何引入

[解读vue.use源码](https://segmentfault.com/a/1190000016256277)

```Js
   Object.keys(components).forEach((key)=>{
     Vue.use()
     Vue.component(components[key].name,components[key])
   })
```

#### less的使用

- utils中配置less-loader  注意加载解析规则

```css
@hd: 1px; // 基本单位

// 支付宝钱包默认主题
// https://github.com/ant-design/ant-design-mobile/wiki/设计变量表及命名规范

// 色彩
// ---
// 文字色
@color-text-base: #000;                  // 基本
@color-text-base-inverse: #fff;          // 基本 - 反色
@color-text-secondary: #a4a9b0;          // 辅助色
@color-text-placeholder: #bbb;           // 文本框提示
@color-text-disabled: #bbb;              // 失效
@color-text-caption: #888;               // 辅助描述
@color-text-paragraph: #333;             // 段落
@color-link: @brand-primary;             // 链接


@defaultColor: #455a64;
@hoverColor:#1989fa;
@height: 60px;

.navTitle{
  font-size:16px;
  font-weight:600;
  cursor: default;
}
.navItem {
  color: @defaultColor;
  font: 14px/24px PingFang SC;
  padding: 10px 10px 10px 50px;
  text-align: left;
  cursor: pointer;
}


.doc-nav-title,
.doc-comp-title{
  .navItem();
  .navTitle();
}

.doc-nav-item{
  .navItem()
}

.doc-comp-item{
  .navItem()
}
```

#### 引入storyBook   预览功能

> 引入storybook 之后遇到的问题

- [vue-loader的版本使用问题](https://github.com/vuejs/vue-loader)   新版默认支持vue-loader15  而项目中vue-loader是13.3.0。 当时以为vue-loader15 是要搭配webpack4 一起使用的 所以降低了一下storybook的版本

- 低版本的storybook  默认使用babel6  只能解析.babelrc 并且需要自定义webpack的配置  所以只能使用storybook中提供的自定义babel和babelconfig配置

- 有一个很大的坑就是 在支持按需引入vant库的时候 报了一个css-loader的错误

  解决办法：增加exclude

  ```js
   config.module.rules.push(
      {
        test: /\.(css|less)$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader',// translates CSS into CommonJS
        },
        { loader: 'postcss-loader' },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          } // compiles Less to CSS
        }],
        exclude: /node_modules/
      })
  ```

- 基础设置都配置好了，在引入插件的时候 发现插件不能用.......... 不知名的报错   让人很蛋疼………..,会提示一个语法错误。而实际上我们配置的babel中已经解析了 但是 它还是会报错。。。。 猜测与插件版本有关

  ![image.png](https://upload-images.jianshu.io/upload_images/5703029-75b5cf4521ce4f48.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 最终选择了  目前的稳定版，更改了相关的配置 并引入相关的插件

> 相关文档

[vue-loader升级方案](https://vue-loader.vuejs.org/zh/migrating.html#值得注意的不兼容变更)

[Storybook 3.2 引入 Vue.js 支持](https://segmentfault.com/a/1190000010447162)

[storybook for vue 官网](https://storybook.js.org/docs/guides/guide-vue/)

[@storybook/vue  npm](https://www.npmjs.com/package/@storybook/vue)

[Storybook 5.0 正式发布：有史以来变化最大的版本](https://www.infoq.cn/article/ppCkZkKx0rr9z55w*GFJ)

##### 相关的插件

| 插件名称                     | 功能                       | 备注         |
| ---------------------------- | -------------------------- | ------------ |
| @storybook/addon-notes       | 组件中添加notes，装饰story | 注释文本信息 |
| @storybook/addon-actions     | 展示event数据              |              |
| @storybook/addon-backgrounds | 改变页面的背景色           |              |
| @storybook/addon-storysource | 展示组件源码               |              |
| @storybook/addon-knobs       | 动态展示props              |              |
| storybook-readme             | 将markdown导入为story      |              |



#### 引入Rollup打包

##### Cross-env报错的问题

```
sudo npm install --global cross-env
```

##### Rollup 打包  坑比较多…….

建议想尝试的同学 使用babel6  + babelrc这样的配置

<https://chenshenhai.github.io/rollupjs-note/note/chapter00/01.html>

- rollup适合打包js库
- rollup-plugin-vue在低版本0.68的时候,会报一个找不到input的错



#### vue的markdown解析

> Vue-markdown-loader

- Vue-press   vue作者开发的 仿照vue的风格 适合静态文档 却不能很好的展示预览效果[vuePress中文文档](https://www.vuepress.cn/)
- [VuePress 手摸手教你搭建一个类Vue文档风格的技术文档/博客](https://segmentfault.com/a/1190000016333850)
- 类似于hexo   想搭建个人博客的同学可以用一下
- 需要注意的是  Vue-markdown-loader在搭配vue-loader15的时候 loader的写法要注意下



### 项目启动和运行

```js
// 克隆项目到本地
git clone  https://github.com/majunchang/mi-vant.git
// 切换到master分支
// 安装相关依赖
    npm  i

//  npm 脚本
// storybook 预览模式
 "start": "npm run storybook",
 "storybook": "start-storybook -p 9001 -c .storybook",
// 打包storybook静态文件
 "build-storybook": "build-storybook -c .storybook",
// 文档预览 端口是8081
 "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
// 打包之后的依赖包分析
 "bundle-report": "webpack-bundle-analyzer --port 8123 dist/stats.json",
// webpack build
 "build": "node build/build.js",
// rollup 编译
 "clean": "rimraf rollupDist",
 "rollup": "cross-env NODE_ENV=production rollup --config=rollup.config.prod.js"

```



### 项目截图

> 项目结构和目录截图

![image.png](https://upload-images.jianshu.io/upload_images/5703029-91513ada0240f5b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> storybook的预览模式

![image.png](https://upload-images.jianshu.io/upload_images/5703029-b406248e60625e76.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/5703029-6551364ceb8667eb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image-20190816162802139](/Users/majunchang/Library/Application Support/typora-user-images/image-20190816162802139.png)

![image-20190816162835502](/Users/majunchang/Library/Application Support/typora-user-images/image-20190816162835502.png)

> 文档模式

![image-20190816162857567](/Users/majunchang/Library/Application Support/typora-user-images/image-20190816162857567.png)



##### ![image-20190816162911187](/Users/majunchang/Library/Application Support/typora-user-images/image-20190816162911187.png)





