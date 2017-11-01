var path = require('path'),
    buildDir = path.join(path.resolve(__dirname), 'build');

module.exports = {
    contentBase: buildDir,
    historyApiFallback: true,
    hot: true,
    port: 5555,
    stats: {
        children: false
    },
    proxy: {
        '/api/v1/**': {
            target: 'http://27.254.159.141:8082/',
            changeOrigin: true
        }
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
};
