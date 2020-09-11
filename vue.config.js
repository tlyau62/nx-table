const webpack = require('webpack');

module.exports = {
    devServer: {
        proxy: {
            '/*': {
                target: 'http://10.68.30.126:8000' // 'http://10.68.30.126:8000'
            },
        },
        clientLogLevel: 'info'
    }
}
