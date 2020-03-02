const { resolve } = require('path');
const { ProgressPlugin, NormalModuleReplacementPlugin } = require('webpack');

module.exports = ({ outputDir }) => ({
  mode: 'development',
  context: resolve(__dirname, '..'),
  entry: {
    'solid-query-ldflex': '.',
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
    // Report progress
    new ProgressPlugin(),
    // Use latest readable-stream version (as opposed to stream-browserify)
    new NormalModuleReplacementPlugin(/^stream$/, require.resolve('readable-stream/readable-browser')),
    // Shim crypto for smaller bundle size
    new NormalModuleReplacementPlugin(/^crypto$/, require.resolve('../browser/crypto')),
    // Shim process to use faster process.nextTick implementation
    new NormalModuleReplacementPlugin(/process\/browser\.js$/, require.resolve('../browser/process')),
    // Shim setImmediate to a faster implementation
    new NormalModuleReplacementPlugin(/^setimmediate$/, require.resolve('../browser/setImmediate')),
  ],
  externals: {
    // Rely on external solid-auth-client at window.solid.auth
    'solid-auth-client': ['solid', 'auth'],
    // Disable shims for supported browser features
    'web-streams-polyfill': 'window',
    // Exclude the following unneeded modules
    '@comunica/actor-rdf-serialize-jsonld': 'null',
    'graphql': 'null',
    'graphql-to-sparql': 'null',
  },
  devtool: 'source-map',
});
