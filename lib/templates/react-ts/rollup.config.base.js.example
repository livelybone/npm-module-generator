import { DEFAULT_EXTENSIONS } from '@babel/core'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  plugins: [
    resolve({
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    }),
    commonjs(),
    babel({
      babelrc: true,
      externalHelpers: false,
      runtimeHelpers: true,
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    }),
  ],
}
