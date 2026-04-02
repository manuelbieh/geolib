const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, '../src/index.ts'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../lib'),
        library: {
            name: 'geolib',
            type: 'umd',
        },
        globalObject: 'this',
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                loader: require.resolve('babel-loader'),
                exclude: /node_modules/,
            },
        ],
    },
};
