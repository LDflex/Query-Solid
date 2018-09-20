module.exports = {
  mode: 'production',
  entry: {
    'solid-query-ldflex': './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    library: ['solid', 'data'],
    libraryExport: 'default',
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
    'solid-auth-client': ['solid', 'auth'],
  },
  devtool: 'source-map',
};
