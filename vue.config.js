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
  // 删除打包后.map文件
  productionSourceMap: false,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
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
  lintOnSave: process.env.NODE_ENV !== 'production',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('common', resolve('src/common'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
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
    if (process.env.VUE_APP_build_type == 'production') {
      config.plugins = [...config.plugins, ...plugins]
    }
  },
  devServer: {// 跨域
    port: 8081, // 端口号
    open: true, // 配置自动启动浏览器
    proxy: {// 配置跨域处理 可以设置多个
      '/api': {
        target: 'xxxx',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
