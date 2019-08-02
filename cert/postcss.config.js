module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-px2rem')({remUnit: 37.5})
  ]
}
