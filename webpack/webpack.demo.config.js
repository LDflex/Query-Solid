const common = require('./webpack.common.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputDir = './dist/demo/';

const localAssets = [
  'user.html',
  'users.jsonld',
];
const externalAssets = [
  'solid-auth-client/dist-popup/popup.html',
  'solid-auth-client/dist-lib/solid-auth-client.bundle.js',
  'solid-auth-client/dist-lib/solid-auth-client.bundle.js.map',
];

module.exports = Object.assign({
  plugins: [
    new CleanWebpackPlugin([outputDir]),
    new CopyWebpackPlugin(localAssets, { context: 'demo' }),
    new CopyWebpackPlugin(externalAssets.map(a => require.resolve(a))),
  ],
  devServer: {
    index: 'user.html',
    contentBase: outputDir,
  },
}, common({ outputDir }));
