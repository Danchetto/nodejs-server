const webpack = require('webpack');

module.exports = {
    entry: [
        './src/index.js'
    ],

    output: {
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['.js']
    },

    target: 'node',
    watch: true,
    mode: 'development',
    plugins: [
        new webpack.ContextReplacementPlugin(/any-promise/)
    ]
};