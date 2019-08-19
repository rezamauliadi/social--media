const webpackMerge = require('webpack-merge');

const baseConfig = require('./webpack.config');

const additionalConfig = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name]-[hash].js',
  },
};

const productionConfig = webpackMerge(baseConfig, additionalConfig);

module.exports = productionConfig;
