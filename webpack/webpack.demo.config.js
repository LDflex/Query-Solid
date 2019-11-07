const outputDir = './dist/demo/';
const common = require('./webpack.common.config')({ outputDir });

const CopyWebpackPlugin = require('copy-webpack-plugin');

const localAssets = [
  'user.html',
];

const externalAssets = [
  'solid-auth-client/dist-popup/popup.html',
  'solid-auth-client/dist-lib/solid-auth-client.bundle.js',
  'solid-auth-client/dist-lib/solid-auth-client.bundle.js.map',
];

module.exports = Object.assign({}, common, {
  plugins: [
    ...common.plugins,
    new CopyWebpackPlugin(localAssets, { context: 'demo' }),
    new CopyWebpackPlugin(externalAssets.map(a => require.resolve(a))),
  ],
  devServer: {
    index: 'user.html',
    contentBase: outputDir,
  },
});
