const path          = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    resolve  : {
        extensions: ['.tsx', '.ts'],
    },
    entry    : {
        index: './src/index.ts',
    },
    output   : {
        path    : path.resolve(__dirname),
        filename: '../../client_packages/index.js',
    },
    target   : 'node',
    externals: [nodeExternals({
        modulesDir: '../../node_modules',
    })],
    module   : {
        rules: [
            {
                test   : /\.tsx?$/,
                use    : 'ts-loader',
                exclude: '/node_modules/',
            },
        ],
    },
}