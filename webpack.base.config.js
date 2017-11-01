var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    webpackServerConfig = require('./webpack.server.config'),
    compressionPlugin = require('compression-webpack-plugin'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
    webpackServerConfig = require('./webpack.server.config');


var config = {
    entry: ['babel-polyfill', './src/app'],
    devServer: webpackServerConfig,
    resolve: {
        modules: ['src', 'css', 'node_modules'],
        alias: {
            'actions': 'actions',
            'widgets': 'components/widgets',
            'utils': 'utils',
            'components': 'components',
            'style': 'style'
        },
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: [['es2015', {modules:false}], 'stage-0', 'react'],
                    plugins: ['transform-object-assign', 'syntax-dynamic-import']
                },
                exclude: [/node_modules/]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','postcss-loader','sass-loader'],
                    publicPath: '/'
                }),
                exclude: [/node_modules/]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    mimetype: 'application/font-woff'
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                query: {
                    limit: 25000
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'styles.[name].[hash].css'
        }),
        new HtmlWebpackPlugin({
            template: __dirname + '/index.html',
            chunksSortMode: 'dependency',
            filename: 'index.html',
            inject: 'body'
        }),
        new CopyWebpackPlugin([{
            from: 'public', to: 'public'
        }]),
        new webpack.ContextReplacementPlugin(
                /node_modules\/moment\/locale/, /ru|en|fi/
        )
        // ,
        // new webpack.IgnorePlugin(/material\-ui/)
    ]
};

module.exports = function() { return config; };