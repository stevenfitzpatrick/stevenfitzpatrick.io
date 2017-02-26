// Modules
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

// const Prod Settings
const prodPlugins = require('./webpack.prod.config.babel');

// Environment Variables
const ENV = process.env.NODE_ENV;

const isProd = ENV === 'production';

module.exports = {
  context: path.resolve(__dirname),
  devServer: { contentBase: './dist', open: true, historyApiFallback: true },
  // Start Bundling Here
  entry: {
    app: './src/index.js',
    vendor: ['preact', 'preact-router', 'classnames']
  },
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
    filename: isProd ? '[name].bundle.[chunkhash].js' : '[name].bundle.js',
    chunkFilename: '[chunkhash].js'
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      style: path.resolve(__dirname, 'src/styles')
    }
  },
  target: 'web',
  // eval for dev, source-map for production
  devtool: !isProd && 'source-map',
  // Transform Rules
  module: {
    rules: [
      // Eslint Pre Loader
      // {
      //   enforce: 'pre',
      //   test: /\.js?$/,
      //   loader: 'eslint-loader',
      //   exclude: '/node_modules/'
      // },
      // JS Loader
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        //include: PATHS.style
        options: { compact: true }
      },
      // Chained CSS Loader
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              query: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[local]'
              }
            },
            'postcss-loader'
          ]
        })
      },
      // Chained SASS Loader
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              query: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[local]'
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      // SVG Images
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          name: '[name]_[hash]',
          prefixize: true
        }
      },
      // Load other Image Types
      {
        test: /\.(woff2?|ttf|eot|jpg|png|gif)(\?.*)?$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]'
        }
      },
      // HTML Files
      { test: /\.html$/, loader: 'html-loader' }
    ]
  },
  // Bundle Rules
  plugins: [
    // Style Checking
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      files: '**/*.scss',
      failOnError: false,
      syntax: 'scss'
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-ie/),
    // Inject CSS and JS into HTML
    new HtmlWebpackPlugin({
      hash: false,
      filename: 'index.html',
      template: './src/index.html',
      favicon: './src/assets/favicon.ico',
      inject: true,
      prefetch: false,
      minify: { removeComments: true, collapseWhitespace: true }
    }),
    // Write out CSS bundle to its own file:
    new ExtractTextPlugin({
      filename: (
        isProd ? 'css/[name].styles.[contenthash].css' : 'css/[name].styles.css'
      ),
      allChunks: true
    }),
    // Add Preload allChunks
    // new PreloadWebpackPlugin({
    //   rel: 'prefetch'
    // }),
    // Add Preload Tags
    new ResourceHintWebpackPlugin(),
    // Set Environment Variables
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: (
          isProd ? JSON.stringify('production') : JSON.stringify('development')
        )
      }
    })
  ].concat(isProd ? prodPlugins : [])
};
