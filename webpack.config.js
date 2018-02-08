var path = require('path')
var webpack = require('webpack')
const ENV = process.env.NODE_ENV
console.log('当前环境:', ENV)
var config = {
  development: require('./build/webpack.dev.config'),
  production: require('./build/webpack.prod.config')
}
module.exports = config[ENV]
