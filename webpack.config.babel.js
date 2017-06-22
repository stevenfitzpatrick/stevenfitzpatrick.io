// Modules
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const fs = require('fs');

// const Prod Settings
const prodPlugins = require('./webpack.prod.config.babel');

// Environment Variables
const ENV = process.env.NODE_ENV;

const isProd = ENV === 'production';

module.exports = {
  context: path.resolve(__dirname),
  devServer: {
    contentBase: './dist',
    open: true,
    historyApiFallback: true,
    setup(app) {
      app.use('/content/**', (req, res) => {
        fs.createReadStream(`content/${req.params[0]}`).pipe(res);
      });
    }
  },
  // Start Bundling Here
  entry: {
    app: './src/index.js',
    vendor: [
      'preact',
      'preact-router',
      'classnames',
      'preact-markup',
      'preact-redux',
      'redux-saga',
      'redux',
      'preact-compat'
    ]
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
    publicPath: isProd ? '/' : 'http://localhost:8080/',
    filename: isProd ? '[name].bundle.[chunkhash].js' : '[name].bundle.js',
    chunkFilename: '[name].[chunkhash].js'
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      components: path.resolve(__dirname, 'src/components'),
      clients: path.resolve(__dirname, 'src/clients'),
      common: path.resolve(__dirname, 'src/components/common'),
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
        options: { compact: true }
      },
      // Chained CSS Loader
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        test: /\.(woff2?|ttf|eot|jpg|jpeg|png|gif|webp)(\?.*)?$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                quality: 65
              },
              gifsicle: {
                interlaced: false
              },
              pngquant: {
                optimizationLevel: 6,
                quality: '65-90',
                interlaced: false,
                speed: 4
              }
            }
          }
        ]
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
      inject: true,
      prefetch: false,
      minify: { removeComments: true, collapseWhitespace: true }
    }),
    // Write out CSS bundle to its own file:
    new ExtractTextPlugin({
      filename: isProd
        ? 'css/[name].styles.[contenthash].css'
        : 'css/[name].styles.css',
      allChunks: true
    }),
    // Add Preload allChunks
    new PreloadWebpackPlugin({
      rel: 'prefetch'
    }),
    // Add Preload Tags
    new ResourceHintWebpackPlugin(),
    // Set Environment Variables
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isProd
          ? JSON.stringify('production')
          : JSON.stringify('development')
      }
    })

    // new ScriptExtHtmlWebpackPlugin({
    //   defaultAttribute: 'async'
    // }),
  ].concat(isProd ? prodPlugins : [])
};
