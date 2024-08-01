const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')

module.exports = defineConfig({

  transpileDependencies: true,

  devServer: {
    port: process.env.PORT,
    host: process.env.HOST,
  },

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false,
        '__VUE_PROD_DEVTOOLS__': false,
        '__VUE_OPTIONS_API__': true,
      })
    ],
  },
})
