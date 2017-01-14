import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const pkg = require('./package.json');

const prodPlugins = [
    // Don't Finish if any issues occur
    new webpack.NoErrorsPlugin(),
    // Todo check the options
    new webpack.optimize.CommonsChunkPlugin({
        name: 'app'
    }),
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
            stripPrefixMulti: {
                'C:/dev/stevenfitzpatrick.io/dist': '',
                '/home/travis/build/stevenfitzpatrick/stevenfitzpatrick.io/dist': ''
            }
        }
    ),
    // Add Bundle JS Analyzer
    new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: true,
        generateStatsFile: false,
        reportFilename: '../src/report.html',
    }),
    // Move Files
    new CopyWebpackPlugin([
        { from: 'src/manifest.json' },
    ]),
];

export default prodPlugins;
