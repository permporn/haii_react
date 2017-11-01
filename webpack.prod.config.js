var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

var commonConfig = require('./webpack.base.config.js');
var path = require('path');

var buildDir = path.join(path.resolve(__dirname), 'build');
var compressionPlugin = require('compression-webpack-plugin');

module.exports = function(env) {
    return webpackMerge(commonConfig(), {
        output: {
            path: buildDir,
            publicPath: '/',
            filename: 'bundle.[name].[hash].js',
            chunkFilename: 'chunk.[name].[hash].js',
            library: '[name]'
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.DefinePlugin({
                'process.env': {'NODE_ENV': JSON.stringify('production')}
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false
            }),
            new compressionPlugin({
                asset: path.join('gzip', '[file].gz[query]'),
                algorithm: 'gzip',
                test: /\.(js|html|css)$/,
                threshold: 10240,
                minRatio: 0.8
            })
            ]
        }
    )
}