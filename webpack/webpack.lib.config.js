const common = require('./webpack.common.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDir = './dist/';

module.exports = Object.assign({
  plugins: [
    new CleanWebpackPlugin([outputDir]),
  ],
}, common({ outputDir }));
