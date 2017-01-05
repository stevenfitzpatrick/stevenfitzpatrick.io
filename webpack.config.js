// Modules
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const pkg = require('./package.json');

// Environment Variables
const ENV = process.env.npm_lifecycle_event;
const isProd = ENV === 'build';

module.exports = {
    context: path.resolve(__dirname),
    devServer: {
        outputPath: path.join(__dirname, 'src'),
        contentBase: './src',
        open: true
    },
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: isProd ? '' : 'http://localhost:8080/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            // JS Loader
            {
                test: /\.js|.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            // CSS Loader
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
            }

        ]
    },
    plugins: [
        // Don't Finish if any issues occur
        new webpack.NoErrorsPlugin(),
        // Specific Options for Loading
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        // Minimize JS
        new webpack.optimize.UglifyJsPlugin({
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
            output: {
                comments: false
            },
            sourceMap: false,
            minimize: true
        }),
        // Inject CSS and JS into HTML
        new HtmlWebpackPlugin({
            hash: false,
            filename: 'index.html',
            template: './src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        // Write out CSS bundle to its own file:
        new ExtractTextPlugin({
            filename: 'css/[name].styles.[contenthash].css',
            allChunks: true
        }),
        // Clean up dist folder after each build
        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        // Add Service Worker
        new SWPrecacheWebpackPlugin(
            {
                cacheId: pkg.name,
                filename: 'sw.js',
                maximumFileSizeToCacheInBytes: 4194304,
                stripPrefix: 'C:/dev/stevenfitzpatrick.io/dist'
            }
        ),
        // Add Bundle JS Analyzer
        new BundleAnalyzerPlugin({})
    ],
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.js', '.json', '.jsx', '.css']
    },
    target: 'web',
    devtool: '',
    externals: ['preact']
};
