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
