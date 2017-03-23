const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

const pkg = require('./package.json');

const prodPlugins = [
  // Inline CSS
  // new StyleExtHtmlWebpackPlugin(),
  // Add Async Tags
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'async'
  }),
  // Todo check the options
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
  // Specific Options for Loading
  new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
  // Minimize JS
  new webpack.optimize.UglifyJsPlugin({
    beatify: false,
    mangle: {
      screw_ie8: true
    },
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true
    },
    comments: false,
    output: { comments: false },
    sourceMap: false,
    minimize: true
  }),
  // Clean up dist folder after each build
  new CleanWebpackPlugin(['dist'], {
    root: __dirname,
    verbose: true,
    dry: false
  }),
  // Add Service Worker
  new SWPrecacheWebpackPlugin({
    cacheId: pkg.name,
    filename: 'sw.js',
    minify: true,
    maximumFileSizeToCacheInBytes: 4194304,
    runtimeCaching: [
      {
        urlPattern: /\www.google-analytics.com+/,
        handler: 'cacheFirst'
      },
      {
        urlPattern: /\use.typekit.net+/,
        handler: 'cacheFirst'
      }
    ],
    stripPrefixMulti: {
      'C:/dev/stevenfitzpatrick.io/dist': '',
      '/home/travis/build/stevenfitzpatrick/stevenfitzpatrick.io/dist': ''
    }
  }),
  // Add Bundle JS Analyzer
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: true,
    generateStatsFile: false,
    reportFilename: '../src/report.html'
  })
];

module.exports = prodPlugins;
