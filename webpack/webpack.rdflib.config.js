const outputDir = './dist/';
const common = require('./webpack.common.config')({ outputDir });

module.exports = Object.assign({}, common, {
  entry: {
    'solid-query-ldflex': './src/exports/rdflib',
  },
  output: {
    ...common.output,
    filename: '[name].rdflib.js',
  },
  externals: {
    ...common.externals,
    rdflib: '$rdf',
  },
});
