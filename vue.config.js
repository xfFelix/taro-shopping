const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  publicPath: process.env.NODE_ENV === 'production' ? '/ticket/' : '/',
  // 删除打包后.map文件
  productionSourceMap: false,
  css: {
    // css预设器配置项
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    },
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('common', resolve('src/common'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
      .set('util', resolve('src/util'))
      .set('store', resolve('src/store'))
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )
  },
  configureWebpack: (config) => {
    // 删除大文件提示
    config.performance = {
      hints: false
    }
    config.externals = {
      BMap: 'BMap',
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios'
    }
    // 删除console插件
    let plugins = [
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     compress: {
      //       warnings: false,
      //       drop_console: true,
      //       drop_debugger: true,
      //       pure_funcs: ['console.log']
      //     },
      //     output: {
      //       // 去掉注释内容
      //       comments: false
      //     }
      //   },
      //   sourceMap: false,
      //   parallel: true
      // }),
      new CompressionPlugin({
        test: /\.(js|css|html|svg)$/,
        threshold: 20480,
        deleteOriginalAssets: false
      })
    ]
    // 只有打包生产环境才需要将console删除
    if (process.env.NODE_ENV === 'production') {
      config.plugins = [...config.plugins, ...plugins]
    }
  },
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    hotOnly: true
  }
}
