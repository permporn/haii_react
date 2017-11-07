var path = require('path'),
    buildDir = path.join(path.resolve(__dirname), 'build');

module.exports = {
    contentBase: buildDir,
    historyApiFallback: true,
    hot: true,
    port: 8084,
    stats: {
        children: false
    },
    proxy: {
        '/haii/**': {
            target: 'http://10.248.0.142:8082/',
            changeOrigin: true
        }
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
};
