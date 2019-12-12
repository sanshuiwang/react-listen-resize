import react from 'react'
import commonjs from 'rollup-plugin-commonjs'

export default {
  esm: {
    type: 'rollup'
  },
  cjs: 'rollup',
  umd: {
    name: 'ReactListenResize',
    globals: {
      react: 'React'
    }
  },
  cssModules: {
    generateScopedName: '[name]__[local]___[hash:base64:5]'
  },
  extraRollupPlugins: [
    commonjs({
      namedExports: { react: Object.keys(react) }
    })
  ],
  doc: {
    public: './public',
    base: '/react-listen-resize/',
    title: 'react-listen-resize',
    description: 'Listener resize'
  }
}
