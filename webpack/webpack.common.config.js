const { resolve } = require('path');

module.exports = ({ outputDir }) => ({
  mode: 'development',
  context: resolve(__dirname, '..'),
  entry: {
    'solid-query-ldflex': './src/index.js',
  },
  output: {
    path: resolve(outputDir),
    filename: '[name].bundle.js',
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
  externals: {
    'solid-auth-client': ['solid', 'auth'],
  },
  devtool: 'source-map',
});
