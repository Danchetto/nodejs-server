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
    mode: 'production',
};