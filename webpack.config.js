module.exports = {
  mode: 'production',
  entry: {
    'solid-query-ldflex': './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    library: ['solid', 'data'],
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },
  externals: {
    'node-fetch': 'fetch',
    'text-encoding': 'TextEncoder',
    'whatwg-url': 'window',
    '@trust/webcrypto': 'crypto'
  },
  devtool: 'source-map',
};
