const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    hot: false,
    liveReload: true,
    compress: true,
    client: {
      reconnect: false,
    },
    open: true,
    watchFiles: [
      './src/views/**'
    ]
  },
  devtool: 'inline-source-map'
});