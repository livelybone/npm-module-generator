import { DEFAULT_EXTENSIONS } from '@babel/core'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

export default {
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      cacheRoot: './node_modules/.rts2_cache',
      objectHashIgnoreUnknownHack: true,
    }),
    babel({
      babelrc: false,
      externalHelpers: true,
      runtimeHelpers: true,
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
            },
          },
        ],
      ],
      plugins:
        process.env.NODE_ENV === 'test'
          ? [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-external-helpers',
              'istanbul',
            ]
          : ['@babel/plugin-external-helpers'],
    }),
  ],
}
