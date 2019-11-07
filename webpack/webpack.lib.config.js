const outputDir = './dist/';
const common = require('./webpack.common.config')({ outputDir });

module.exports = Object.assign({}, common);
