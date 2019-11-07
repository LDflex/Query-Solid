const { resolve } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = ({ outputDir }) => ({
  mode: 'development',
  context: resolve(__dirname, '..'),
  entry: {
    'solid-query-ldflex': './src/index.js',
  },
  output: {
    path: resolve(outputDir),
    filename: '[name].bundle.js',
    libraryExport: 'default',
    library: ['solid', 'data'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([outputDir]),
  ],
  externals: {
    'solid-auth-client': ['solid', 'auth'],
  },
  devtool: 'source-map',
});
