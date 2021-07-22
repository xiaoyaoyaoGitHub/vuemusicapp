const registerRouter = require('./backend/router')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
                    @import '@/assets/scss/mixin.scss';
                    @import '@/assets/scss/variable.scss'
                `
      }
    }
  },
  // 执行自定义中间件
  devServer: {
    before(app, serve, compile) {
      registerRouter(app, serve, compile)
    }
  },
  configureWebpack: (config) => {
    if (process.env.npm_config_report) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/'
}
