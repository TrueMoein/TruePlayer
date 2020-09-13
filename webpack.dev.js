const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: './src/playground/app.ts',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'TruePlayer...',
      template: './src/playground/index.html',
      favicon: './src/playground/favicon.png',
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
});
