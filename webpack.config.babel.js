// Modules

import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Import Prod Settings
import prodPlugins from './webpack.prod.config.babel';

// Environment Variables
const ENV = process.env.NODE_ENV;

const isProd = ENV === 'build';

module.exports = {
  context: path.resolve(__dirname),
  devServer: {
    outputPath: path.join(__dirname, 'src'),
    contentBase: './src',
    open: true,
    historyApiFallback: true
  },
  // Start Bundling Here
  entry: { app: './src/index.js' },
  // Output of Bundling
  /* 
        [path] - Returns entry path
        [name] - Returns entry Name
        [hash] - Returns the build hash
        [chunkhash] - Retuns Chunk specific hash
        */
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProd ? '' : 'http://localhost:8080/',
    filename: '[name].bundle.js',
    chunkFilename: '[chunkhash].js'
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src')
    ],
    extensions: [ '.js', '.json', '.jsx', '.css' ],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      style: path.resolve(__dirname, 'src/styles')
    }
  },
  target: 'web',
  // eval for dev, source-map for production       
  devtool: isProd ? 'source-map' : 'eval',
  // Transform Rules
  module: {
    rules: [
      // JS Loader
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        //include: PATHS.style
        options: { compact: true }
      },
      // CSS Loader
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
      // HTML Files
      { test: /\.html$/, loader: 'html-loader' }
    ]
  },
  // Bundle Rules
  plugins: [
    // Inject CSS and JS into HTML
    new HtmlWebpackPlugin({
      hash: false,
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
      minify: { removeComments: true, collapseWhitespace: false }
    }),
    // Write out CSS bundle to its own file:
    new ExtractTextPlugin({
      filename: 'css/[name].styles.[contenthash].css',
      allChunks: true
    }),
    // Set Environment Variables
    new webpack.DefinePlugin({
      'process.env.environment': isProd
        ? JSON.stringify('prod')
        : JSON.stringify('dev')
    })
  ].concat(isProd ? prodPlugins : [])
};
