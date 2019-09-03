## MI-vant组件库

> 打造一个内部的组件库，在我们进行代码的重构，以及开发新的功能的时候，抽离公共的组件，减少代码的复用，注重业务与组件的分离，简化耦合度，便于开发与维护。

#### 特性

- 支持按需引入
- 预览模式
  - storybook预览模式
  - 纯markdown预览模式
- rem适配
- 支持主题定制
- 较为完善的使用文档和示例



#### 技术选型

> 最初的时候 考虑过使用vue-cli3.0 vue-loader15+webpack4的配置 后来考虑到稳定性 暂时放弃

- 使用babel7的插件和配置
- 使用less作为项目中css的预处理语言
- 增加rollup的打包方式
- 引入storybook  来支持项目的预览功能
- 引入vue-loader15
- 引入vue-markdown-loader等相关插件 支持文档功能

#### babel7

##### 为什么要升级到babel7

> 全局配置 babel.config.js 里的配置默认对整个项目生效，包括node_modules。除非通过 [exclude](https://babeljs.io/docs/en/options#exclude) 配置进行剔除。换句话来说babel7拥有全局配置能力。是前端走向未来语法的一大步，改造为babel7 的时候，遇到了很多难以解决的问题。但是最终还是坚持下来了。

##### 升级注意事项

1. 从 babel7 开始，所有的官方插件和主要模块，都放在了 @babel 的命名空间下,从而可以避免在 npm 仓库中 babel 相关名称被抢注的问题

2. Babel7 是对整个项目都生效的配置。

3. 移除了之前的stage-x插件，废弃babel-preset-es201x插件，

4. 官方升级工具：[babel-upgrade](https://github.com/babel/babel-upgrade)

   > **之前配置的时候，不知道有这个工具，导致走了很多弯路。大家以后在做某个东西的时候，一定要先查查有没有工具。避免重复造轮子的同时，也可以避免很多不必要的错误**)。

5. 优化代码与使用jsV8补丁做效能调校，编译速度更快。

6. webpack中babel-loader的版本要高于@babel/core的版本，否则编译会报错



> 以vue-cli 2.9.6版 的版本举🌰，默认是.babelrc。

.babelrc中的配置和相关的依赖

```js
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

mivant中最终版的babel.config.js中的配置和相关依赖

```js
module.exports = function (api) {
  api.cache(true);

  const presets = [
    "@babel/preset-env",
    "@vue/babel-preset-app",
    [
      '@vue/babel-preset-jsx',
      {
        functional: false
      }
    ]];
  const plugins = [
    "@babel/plugin-transform-runtime",
    '@babel/plugin-transform-object-assign',
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']];

  return {
    presets,
    plugins
  };
}

```

##### 参考资料

[Babel7 发布](https://babel.docschina.org/blog/2018/08/27/7.0.0)

[babelrc和babel.config.js 的区别](https://www.babeljs.cn/docs/configuration)

[升级至babel7](https://babel.docschina.org/docs/en/7.0.0/v7-migration)

[babel7的简单升级指南](https://juejin.im/post/5b87cab1e51d4538ac05dc54)

[一文读懂 babel7 的配置文件加载逻辑](https://segmentfault.com/a/1190000018358854)

[Babel快速上手使用指南](https://juejin.im/post/5cf45f9f5188254032204df1)

[babel官网](https://babeljs.io/docs/en/)



#### 组件全部加载与按需加载

##### 组件是如何被加载？

[解读vue.use源码](https://segmentfault.com/a/1190000016256277)

```js
   Object.keys(components).forEach((key)=>{
     Vue.use()
     Vue.component(components[key].name,components[key])
   })
```

附index.js中的代码

- 引入相关的组件
- 提供 公共的install方法
- 通过export default 实现全部加载，通过export 的方式实现按需加载

```js
import MiButton from './Button/index'
import Modal from './Modal/index'


const components = [
  MiButton,
  Modal
]

const version = '1.0.0'

const install = function (Vue) {
  if (install.installed) return
  components.forEach(item => {
    Vue.component(item.name, item)
  })
}


if (typeof window !== 'undefined' && window.Vue) {
  console.log('运行环境为window');
  install(window.Vue)
}

export {
  MiButton,
  Modal,
  install
}

export default {
  install,
  version
}

```

##### 按需加载的第一种方式

```js
// 组件中内置了单个组件所需的样式  无需配置babel-plugin-import
 import { MiButton, Modal } from 'miVant'
 import Vue from 'vue'

 Vue.use(MiButton)
 Vue.use(Modal)
```



##### 按需加载的第二种方式

```js
import MiButton from 'miVant/lib/Button'
import Modal from 'miVant/lib/Modal'
import Vue from 'vue'

 Vue.use(MiButton)
 Vue.use(Modal)
```

**按需架加载的基础**

- 组件中的index.js中引入相关的vue文件，提供install方法
- XX.vue文件中 引入less文件，内置less
- 打包的时候对于compont下的文件使用CopyWebpackPlugin复制到lib目录下，也就是第二种按需加载的方式

#### less的使用

- utils中配置less-loader  注意loader的解析规则



> 附录一段less使用的示例

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

##### 首先，storyBook是啥？

1. Storybook是一个辅助UI控件开发的工具。通过story创建独立的控件，让每个控件开发都有一个独立的开发调试环境，可以单独的查看每个组件的不同状态，以及交互式开发和测试组件。
2. Storybook的运行不依赖于项目，开发人员不用担心由于开发环境、依赖问题导致不能开发控件。
3. Storybook支持很多主流的框架（React、Vue、Angular）。
4. 2019年1月份，storybook 发布5.0版本，是自项目开始以来的第一次重大调整。改进了整个生态系统的视图层，插件和集成

##### 安装使用

1. 安装参考指南[storybook for vue](https://storybook.js.org/docs/guides/guide-vue/)

2. 自定义的webpack配置，解决扩展名问题和less编译问题

```js
   // 自定义webpack配置
   const path = require('path');


   module.exports = async ({ config, env }) => {

     // Extend it as you need.
     function resolve(dir) {
       return path.join(__dirname, '..', dir);
     }

     config.resolve = {
       extensions: ['.js', '.vue', '.json', '.jsx'],
       alias: {
         'vue$': 'vue/dist/vue.esm.js',
         '@': resolve('src')
       },
     }
     config.module.rules.push({
       test: /\.stories.jsx?$/,
       loaders: [require.resolve('@storybook/addon-storysource/loader')],
       enforce: 'pre',
     });
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


     return config;
   };

   ```

3. storybook 5.0 使用vue-loader15，默认使用babelrc进行解析和编译，需要自定义babelrc

   ```js
   {
     "presets": [
       "@babel/preset-env",
       "@vue/babel-preset-app",
       [
         "@vue/babel-preset-jsx",
         {
           "functional": false
         }
       ]
     ]
   }

   ```

##### 如何为组件配置Storybook环境

- stories目录下 新建 xx.js文件，此处映射为预览环境中的 左侧预览目录

- xx.js文件中 引入vue组件，编写测试案例。通过addDecorator函数引入 插件的相关功能

  ```js
  import { storiesOf } from '@storybook/vue';
  import { withKnobs } from '@storybook/addon-knobs';
  import miVantButton from '../src/components/Button/Button.vue'
  import { withStorySource } from '@storybook/addon-storysource'
  import buttonText from '../docs/button.md'

  const simpleSourceCode = '<mi-vant-button>storyBook</mi-vant-button>'
  storiesOf('miVantButton', module)
    .addDecorator(withKnobs)
    .addDecorator(withStorySource(simpleSourceCode))
    .addParameters({
      readme: {
        sidebar: buttonText,
      },
    })
    .add('with text', () => {
      return {
        components: { miVantButton },
        template: `<mi-vant-button>storyBook</mi-vant-button>`,
      }
    },
      {
        notes: {
          markdown: buttonText
        }
      }
    )
  ```

- 根目录下的.storybook文件夹中

  - addons.js 中 注册相关的插件

  - config.js中 配置允许环境，安装全局插件。类似于vue项目的main.js

```js
    import { configure, addDecorator, addParameters } from '@storybook/vue';
    import { withNotes } from '@storybook/addon-notes'
    import { addReadme } from 'storybook-readme/vue';
    import { setOptions } from '@storybook/addon-options'
    import { Button } from 'vant'
    import Vue from 'vue'

    Vue.use(Button)


    const req = require.context('../stories', true, /\.js$/)

    function loadStories() {
      req.keys().forEach((filename) => req(filename))
    }

    setOptions({
      name: 'mi-Vant',
      url: '#',
      goFullScreen: false,
      showStoriesPanel: true,
      showAddonPanel: true,
      showSearchBox: true,
      addonPanelInRight: true,
      sortStoriesByKind: false,
      hierarchySeparator: null,
      hierarchyRootSeparator: null,
      sidebarAnimations: true,
      selectedAddonPanel: undefined,
    })

    addParameters({
      viewport: { defaultViewport: 'galaxys5' },
    })
    addDecorator(addReadme);
    addDecorator(withNotes)
    // require
    configure(loadStories, module);

    ```



**遇到的问题**

- [vue-loader的版本使用问题](https://github.com/vuejs/vue-loader)

  - 新版默认支持vue-loader15  而项目中vue-loader是13.3.0。 当时以为vue-loader15 是要搭配webpack4 一起使用的 所以降低了一下storybook的版本

  - 低版本的storybook  默认使用babel6  只能解析.babelrc 且需要自定义webpack的配置  所以只能使用storybook中提供的自定义babel和webpack配置

  - 基础设置都配置好了，在引入插件的时候 发现插件不能用.......... 不知名的报错   让人很蛋疼………..,会提示一个语法错误。而实际上我们配置的babel中已经解析了 但是 它还是会报错。。。。 猜测与插件版本有关

  ```js
    ReferenceError:  regeneratorRuntime is not defined
  ```



-  按需引入vant库的时候 报了一个css-loader的错误

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



- 最终选择了  目前的稳定版，更改了相关的配置 并引入相关的插件

##### 相关的插件

| 插件名称                           | 功能                       | 备注         |
| ---------------------------------- | -------------------------- | ------------ |
| @storybook/addon-notes             | 组件中添加notes，装饰story | 注释文本信息 |
| @storybook/addon-actions           | 展示event数据              |              |
| @storybook/addon-backgrounds       | 改变页面的背景色           |              |
| @storybook/addon-storysource       | 展示组件源码               |              |
| @storybook/addon-knobs             | 动态展示props              |              |
| storybook-readme                   | 将markdown导入为story      |              |
| @storybook/addon-viewport/register | 增加移动端预览模式         |              |
| @storybook/addon-options           | 配置面板选型               |              |

> 相关文档

[vue-loader升级方案](https://vue-loader.vuejs.org/zh/migrating.html#值得注意的不兼容变更)

[Storybook 3.2 引入 Vue.js 支持](https://segmentfault.com/a/1190000010447162)

[storybook for vue 官网](https://storybook.js.org/docs/guides/guide-vue/)

[@storybook/vue  npm](https://www.npmjs.com/package/@storybook/vue)

[Storybook 5.0 正式发布：有史以来变化最大的版本](https://www.infoq.cn/article/ppCkZkKx0rr9z55w*GFJ)



#### 引入Rollup打包

##### 介绍

> Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。采用 es6 原生的模块机制进行模块的打包构建, 编译之后包 体积会更小。

###### 更多详情 可以看我之前的一篇文章

[rollup的初识](https://www.jianshu.com/p/f150680755fc)

##### 引入之后的问题

- Cross-env报错的问题

```
sudo npm install --global cross-env
```

- Rollup 打包 ，如果使用babel.config.js+babel7的话，坑比较多…….有时候会出现一些不知名的错误

建议想尝试的同学 使用babel6  + babelrc这样的配置

<https://chenshenhai.github.io/rollupjs-note/note/chapter00/01.html>

- rollup-plugin-vue在低版本0.68的时候,会报一个找不到input入口的错，目前项目中的rollup版本是V1.19.3



**附rollup.config.prod.js**

```js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss';
const path = require('path');

const ENV = process.env.NODE_ENV;
const resolveFile = function (filePath) {
  return path.join(__dirname, './', filePath)
}


export default {
  input: resolveFile('src/components/index.js'),
  output: {
    dir: 'es',
    format: 'umd',
    name: 'miVant',
    exports: 'named',
  },
  plugins: [
    resolve({ extensions: ['.js', '.vue'] }),
    postcss({
      extensions: ['.less', '.css'],
      use: [
        ['less', {
          javascriptEnabled: true
        }]
      ],
      extract: true,
      minimize: true,
    }),
    vue({
      template: {
        isProduction: true
      },
      css: false
    }),
    commonjs(),
    buble({
      objectAssign: 'Object.assign'
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    (ENV === 'production' && uglify()),
  ],
};

```



###### 留一个问题： rollup完成按需加载的打包

#### vue的markdown解析

**I want**

1. 将组件中的readme文档改造为组件的使用文档
2. 类似于目前知名组件库如 antd，element-ui，vant等支持代码库高亮显示，组件动态展示等效果,简而言之一句话： 能够在md中运行代码。
3. 让我们的组件库看起来不那么low😁..........

> 由于之前没有接触过类似的功能，于是漫漫的调研之路开始了。。。。

- Vue-press   vue作者开发的 仿照vue的风格 适合静态文档 却不能很好的展示预览效果[vuePress中文文档](https://www.vuepress.cn/)
  - 类似于hexo   想搭建个人博客的同学可以用一下
- vue-markdown-loader 搭配 vue-loader可以实现动态编译md文档
  - 搭配vue-loader15版本的时候 需要注意采用兼容写法
  - 搭配markdown-it系列能够良好的扩展md
  - 需要注意的是  Vue-markdown-loader在搭配vue-loader15的时候 loader的写法要注意下
  - 使用highlight.js的主题 支持主题的动态配置



**附webpack中关于markdown的解析规则**

```js
{
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader'
          },
          {
            loader: 'vue-markdown-loader/lib/markdown-compiler',
            options: {
              raw: true,
              preventExtract: true,
              use: [
                [
                  require('markdown-it-container'),
                  'demo',
                  {
                    validate: function (params) {
                      return params.trim().match(/^demo\s+(.*)$/)
                    },
                    render: function (tokens, idx) {
                      if (tokens[idx].nesting === 1) {
                        // 1.获取第一行的内容使用markdown渲染html作为组件的描述
                        let demoInfo = tokens[idx].info.trim().match(/^demo\s+(.*)$/)
                        let description = demoInfo && demoInfo.length > 1 ? demoInfo[1] : ''
                        let descriptionHTML = description ? markdownRender.render(description) : ''
                        // 2.获取代码块内的html和js代码
                        let content = tokens[idx + 1].content
                        // 3.使用自定义开发组件【DemoBlock】来包裹内容并且渲染成案例和代码示例
                        return `<demo-block>
                        <div class="source" slot="source">${content}</div>
                        ${descriptionHTML}
                        <div class="highlight" slot="highlight">`
                      } else {
                        return '</div></demo-block>\n'
                      }
                    }
                  }
                ]
              ]
            }
          }
        ]
      },
```

**demo-block中手动补充copy功能**

```vue
<template>
  <div class="demo-block">
    <div class="demo-block-source">
      <slot name="source"></slot>
      <span class="demo-block-code-icon" v-if="!$slots.default" @click="showCode=!showCode">
        <img
          alt="expand code"
          src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg"
          class="code-expand-icon-show"
        />
      </span>
    </div>
    <div class="demo-block-meta" v-if="$slots.default">
      <slot></slot>
      <span v-if="$slots.default" class="demo-block-code-icon" @click="showCode=!showCode">
        <img
          alt="expand code"
          src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg"
          class="code-expand-icon-show"
        />
      </span>
    </div>
    <div class="demo-block-code" v-show="showCode">
      <p class="copy" @click="copy">复制</p>
      <slot name="highlight"></slot>
    </div>
  </div>
</template>
<script type="text/babel">
export default {
  data() {
    return {
      showCode: false
    };
  },
  methods: {
    copy(e) {
      const hightext = e.target.nextElementSibling;
      const input = document.createElement("input");
      document.body.appendChild(input);
      let value = hightext.innerText;
      input.value = value;
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        console.log("复制成功");
      }
      document.body.removeChild(input);
    }
  }
};
</script>
<style lang='less'>
@import "./less/demo-block.less";
.copy {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 0;
}
</style>

```



##### 相关文档

[VuePress 手摸手教你搭建一个类Vue文档风格的技术文档/博客](https://segmentfault.com/a/1190000016333850)

[从 Vue-cli 开始构建 UI 库到 Markdown 生成文档和演示案例](https://www.cnblogs.com/lindongdong/p/9287303.html)

[vue-markdown-loader](https://www.npmjs.com/package/vue-markdown-loader)

[markdown-it-container](https://www.npmjs.com/package/markdown-it-container)

[vue-markdown-loader error with vue Loader 15](https://github.com/QingWei-Li/vue-markdown-loader/issues/44)

#### rem的适配+定制主题

>  rem的适配功能

- 通过postcss-px2rem将px单位自动转化为rem单位

- 通过项目根目录下的.postcssrc.js 设置转化规则

  ```js
  // https://github.com/michael-ciniawsky/postcss-load-config

  module.exports = {
    "plugins": {
      "postcss-import": {},
      "postcss-url": {},
      // to edit target browsers: use "browserslist" field in package.json
      "autoprefixer": {
        browsers: ['Android >= 4.0', 'iOS >= 7']
      },
      "postcss-px2rem": { remUnit: 100 }
    }
  }

  ```

- css中补充对应的font-size大小

  ```css
  @import './var.less';

  html {
    font-size: 100px; /* no */
  }
  h1{
    font-size: 32px;
  }
  h2{
    font-size: 24px;
  }
  h3{
    font-size: 19px;
  }
  h4{
    font-size: 16px;
  }
  h5{
    font-size: 14px;
  }
  h6{
    font-size: 13px;
  }

  li,p,th,td {
    font-size: 16px;
  }

  ```

> 定制主题

miVant 使用了 [Less](http://lesscss.org/) 对样式进行预处理，并内置了一些样式变量，通过替换样式变量即可定制你自己需要的主题。

配置文件： ~/src/components/less/var.less

```less
@primary-btn-color :#fbb212;
```

**定制方法**

1. 使用 less 提供的 [modifyVars](http://lesscss.org/usage/#using-less-in-the-browser-modify-variables) 即可对变量进行修改，下面是参考的 webpack 配置。

2. 这里以vue2.x版本的脚手架举例  /build/utils目录下

```js
exports.cssLoaders = function (options) {
  options = options || {}

  const lessLoader = {
    loader: 'less-loader',
    options: {
      sourceMap: options.sourceMap,
      modifyVars: {
        color: 'red'
      }
    }
  }
  const lessConfig = {
    modifyVars: {
      primary-btn-color: 'red'
    }
  };


  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader, lessLoader] : [cssLoader, lessLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less', lessConfig),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}
```

#### 项目启动和运行

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













