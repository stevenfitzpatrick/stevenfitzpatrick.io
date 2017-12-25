const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const prodPlugins = [
  // Move Files
  new CopyWebpackPlugin([
    { from: 'public/manifest.json' },
    { from: 'public/sitemap.xml' },
    { from: 'content', to: 'content' },
    {
      from: 'src/assets',
      to: 'assets',
      ignore: ['**/*.svg', 'src/assets/svg/*', '*.svg']
    }
  ]),

  // Todo check the options
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: m => m.context && m.context.includes('node_modules')
  }),
  //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
  }),

  new InlineManifestWebpackPlugin({
    name: 'webpackManifest'
  }),

  // Webpack 3 Scope Hoisting
  new webpack.optimize.ModuleConcatenationPlugin(),
  // Inline CSS
  new StyleExtHtmlWebpackPlugin({
    minify: true
  }),
  // Add Async Tags
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer'
    //async: ['app']
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
      join_vars: true,
      drop_console: true
    },
    comments: false,
    output: { comments: false },
    sourceMap: true,
    minimize: true
  }),
  // Clean up dist folder after each build
  new CleanWebpackPlugin(['dist'], {
    root: __dirname,
    verbose: true,
    dry: false
  }),
  // Add Service Worker
  new WorkboxPlugin({
    skipWaiting: true,
    clientsClaim: true
  }),
  //Add Bundle JS Analyzer
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: true,
    generateStatsFile: false
  })
];
module.exports = prodPlugins;
