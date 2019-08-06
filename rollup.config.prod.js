import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import vue from 'rollup-plugin-vue'
// import lessRollup from 'rollup-plugin-less'
import postcss from 'rollup-plugin-postcss';
// const less = require('less')
const path = require('path');

const packages = require('./package.json');
const ENV = process.env.NODE_ENV;
const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath)
}


const fileNames = {
  development: `${packages.name}.js`,
  example: `example.js`,
  production: `${packages.name}.min.js`
};

export default {
  input: resolveFile('src/components/index.js'),
  output: {
    root: 'rollupDist/',
    file: resolveFile('rollupDist/index.js'),
    format: 'umd',
  },
  plugins: [
    vue({
      template: {
        isProduction: true
      },
      css: false
    }),
    resolve(),
    commonjs(),
    buble({
      objectAssign: 'Object.assign'
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    postcss({
      extract: true
    }),
    (ENV === 'production' && uglify()),
  ],
};
