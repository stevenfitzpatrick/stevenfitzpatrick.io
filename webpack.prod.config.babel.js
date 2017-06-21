const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const path = require('path');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pkg = require('./package.json');

const prodPlugins = [
  // Move Files
  new CopyWebpackPlugin([
    { from: 'src/manifest.json' },
    { from: 'content', to: 'content' },
    {
      from: 'src/assets',
      to: 'assets',
      ignore: ['**/*.svg', 'src/assets/svg/*', '*.svg']
    }
  ]),

  // Todo check the options
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  }),
  //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
  }),
  // Inline CSS
  // new StyleExtHtmlWebpackPlugin(),
  // Add Async Tags
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'sync',
    async: ['app']
  }),
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
    stripPrefix: `${process.cwd().replace(/\\/g, '/')}/dist`
  }),
  // Webpack 3 Scope Hoisting
  new webpack.optimize.ModuleConcatenationPlugin(),
  // Add Bundle JS Analyzer
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: true,
    generateStatsFile: false,
    reportFilename: '../src/report.html'
  })
];

module.exports = prodPlugins;
