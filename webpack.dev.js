const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    playground: './playground/app.ts',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'TruePlayer...',
      template: './playground/index.html',
      favicon: './playground/favicon.png',
    }),
  ],
  devtool: 'inline-source-map',
});
