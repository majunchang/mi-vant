module.exports = function (api) {
  api.cache(true);

  const presets = ["@babel/preset-env"];
  const plugins = ["@babel/plugin-transform-runtime", '@babel/plugin-transform-object-assign'];

  return {
    presets,
    plugins
  };
}
