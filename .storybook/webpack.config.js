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
