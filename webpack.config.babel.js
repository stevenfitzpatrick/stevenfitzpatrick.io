// Modules
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
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
    port: 8080,
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
    app: ['./src/index.js'],
    vendor: ['preact', 'preact-router', 'preact-async-route', 'classnames', 'styled-components']
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
    extensions: ['.js', '.json', '.jsx', '.css', '.scss', '.svg'],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      clients: path.resolve(__dirname, 'src/clients'),

      style: path.resolve(__dirname, 'src/styles'),
      react: 'preact'
    }
  },
  target: 'web',
  // eval for dev, source-map for production
  devtool: isProd ? '' : 'source-map',
  // Transform Rules
  module: {
    rules: [
      // JS Loader
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: { compact: true }
        },
        exclude: /node_modules/
      },
      // Chained CSS Loader
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: false
            }
          },
          'postcss-loader'
        ]
      },
      // Chained SASS Loader
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                minimize: true,
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
        use: {
          loader: 'svg-sprite-loader'
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
    // Inject CSS and JS into HTML
    new HtmlWebpackPlugin({
      hash: false,
      filename: 'index.html',
      template: './public/index.ejs',
      inject: true,
      prefetch: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true
      }
    }),
    // Write out CSS bundle to its own file:
    new ExtractTextPlugin({
      filename: isProd ? 'css/[name].styles.[contenthash].css' : 'css/[name].styles.css',
      allChunks: true
    }),
    // // Add Preload allChunks
    // new PreloadWebpackPlugin({
    //   rel: 'prefetch'
    // }),
    // Add Preload Tags
    new ResourceHintWebpackPlugin(),
    // Set Environment Variables
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isProd ? JSON.stringify('production') : JSON.stringify('development')
      }
    })
  ].concat(isProd ? prodPlugins : [])
};
