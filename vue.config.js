module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        },
        limit: {
            entry: 'src/limit/main.js',
            template: 'public/index.html',
            filename: 'limit.html'
        }
    },
    devServer: {
        open: process.platform === 'darwin',
        host: '127.0.0.1',
        port: 8088,
        https: false,
        hotOnly: false,
        proxy: {
            '/Gargantua/v1/': {
                target: 'http://test.dcs-api.jd.com/',
                changeOrigin: true
            }
        }
    }
};
