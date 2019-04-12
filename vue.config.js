const px2rem = require('postcss-px2rem')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const postcss = px2rem({
  remUnit: 37.5 // 基准大小 baseSize，需要和rem.js中相同
})

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // 删除打包后.map文件
  productionSourceMap: false,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: process.env.NODE_ENV === 'production',
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: [postcss]
      },
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    },
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.symlinks(true)
    config.resolve.alias
      .set('@', resolve('src'))
      .set('common', resolve('src/common'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
      .set('util', resolve('src/util'))
      .set('store', resolve('src/store'))
    config.output.filename('[name].[hash].js').end()
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // modify the options...
        options.compilerOptions.preserveWhitespace = true
        return options
      })
  },
  configureWebpack: (config) => {
    // 入口文件
    config.entry.app = ['babel-polyfill', './src/main.js']
    // 删除console插件
    let plugins = [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log']
          },
          output: {
            // 去掉注释内容
            comments: false
          }
        },
        sourceMap: false,
        parallel: true
      })
    ]
    // 只有打包生产环境才需要将console删除
    if (process.env.NODE_ENV == 'production') {
      config.plugins = [...config.plugins, ...plugins]
    }
  },
  devServer: {// 跨域
    port: 8080, // 端口号
    open: true, // 配置自动启动浏览器
    // disableHostCheck: true,
    historyApiFallback: true,
    https: false,
    hotOnly: false
    // overlay: {
    //   warnings: true,
    //   errors: true
    // }
  }
}
