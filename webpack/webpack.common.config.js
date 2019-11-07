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
    // Use latest readable-stream version (as opposed to stream-browserify)
    new NormalModuleReplacementPlugin(/^stream$/, require.resolve('readable-stream/readable-browser')),
    // Shim process to use faster process.nextTick implementation
    new NormalModuleReplacementPlugin(/process\/browser\.js$/, require.resolve('../browser/process')),
  ],
  externals: {
    'solid-auth-client': ['solid', 'auth'],
  },
  devtool: 'source-map',
});
