import license from 'rollup-plugin-license'
import { terser } from 'rollup-plugin-terser'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import json from '@rollup/plugin-json'
import { nodeModules } from './node-module-names'

const conf = entry => ({
  input: entry.filename,
  output: entry.formats.map(format => ({
    file: `./lib/${entry.name}.js`,
    format,
    name:
      entry.name === 'index' ? '{{GlobalName}}' : `${entry.name}{{GlobalName}}`,
  })),
  external: entry.external ? [...nodeModules] : [],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    entry.needUglify !== false && terser(),
    license({
      banner: `Bundle of <%= pkg.name %>
               Generated: <%= moment().format('YYYY-MM-DD') %>
               Version: <%= pkg.version %>
               License: <%= pkg.license %>
               Author: <%= pkg.author %>`,
    }),
  ],
})

export default [
  {
    name: 'index',
    filename: './src/index.js',
    formats: ['cjs'],
    needUglify: true,
    external: true,
  },
].map(conf)
