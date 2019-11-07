const { resolve } = require('path');
const { NormalModuleReplacementPlugin } = require('webpack');
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
    new NormalModuleReplacementPlugin(/^stream$/, require.resolve('readable-stream/readable-browser')),
    new NormalModuleReplacementPlugin(/process\/browser\.js$/, require.resolve('../process')),
    new NormalModuleReplacementPlugin(/^setimmediate$/, require.resolve('../setimmediate')),
  ],
  externals: {
    'solid-auth-client': ['solid', 'auth'],
  },
  devtool: 'source-map',
});
