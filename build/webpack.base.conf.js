'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const markdownRender = require('markdown-it')();


function resolve(dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: process.env.NODE_ENV === 'production' ? './src/components/index.js' : './src/preview/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    library: "miVant",
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: path.join(__dirname, '../lib'),
  },
  externals: process.env.NODE_ENV === 'production' ? {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  } : {},
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
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
                        <div class="highlight" slot="highlight"></demo-block>`
                      } else {
                        return '</div></demo-block>\n'
                      }
                    }
                  },
                  require('markdown-it-multimd-table'),
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('.preview'), resolve('.storybook'), resolve('node_modules/webpack-dev-server/client')],
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
