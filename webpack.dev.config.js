var path = require('path');

var buildDir = path.join(path.resolve(__dirname), 'build');

var webpackMerge = require('webpack-merge');
var DashboardPlugin = require('webpack-dashboard/plugin');
var commonConfig = require('./webpack.base.config.js');

    
module.exports = function (env) {
    return webpackMerge(commonConfig(), {
        devtool: 'cheap-module-source-map',
        output: {
            path: buildDir,
            publicPath: '/',
            filename: 'bundle.[name].js',
            chunkFilename: 'chunk.[name].js',
            library: '[name]'
        },
        plugins: [
            new DashboardPlugin()
        ]
    })
}
