var gulp = require('gulp'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    webpackDevConfig = require('./webpack.config.js'),
    webpackDevServerConfig = require('./webpack.server.config.js'),
    WebpackDevServer = require('webpack-dev-server'),
    compressionPlugin = require('compression-webpack-plugin'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin');


gulp.task('server-webpack', [], function () {
    var compiler = webpack(webpackDevConfig),
        server = new WebpackDevServer(compiler, webpackDevServerConfig);

    server.listen(8084, 'localhost', function (err) {
        if (err) {
            throw err;
        }
        console.log('[webpack-dev-server]', 'http://localhost:5555/');
    });
});

gulp.task('serverTest-webpack', [], function () {
    var compiler = webpack(webpackDevConfig),
        serverTest = new WebpackDevServer(compiler, webpackDevServerConfig);

    serverTest.listen(7071, 'localhost', function (err) {
        if (err) {
            throw err;
        }
        console.log('[webpack-dev-server]', 'http://localhost:7071/');
    });
});

gulp.task('set-prod-node-env', function() {
    if (process.env.NODE_ENV === 'production') {
        webpackDevConfig.plugins.push(new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}));
        webpackDevConfig.plugins.push(new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }));
        webpackDevConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }));
        webpackDevConfig.plugins.push(new UglifyJSPlugin());
        webpackDevConfig.plugins.push(new compressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|html|css)$/,
            threshold: 10240,
            minRatio: 0.8
        }));
    }
});

gulp.task('build', ['set-prod-node-env'], function () {
    return gulp.src('src/app.js')
        .pipe(webpackStream(webpackDevConfig))
        .pipe(gulp.dest('build/'));
});

gulp.task('default', ['build']);
gulp.task('server-webpack-prod', ['set-prod-node-env', 'server-webpack']);
