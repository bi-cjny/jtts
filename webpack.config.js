module.exports = {
    entry: './client/src/client.js',
    output: {
        path: './public/scripts',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query:
                {
                    presets:['react']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json']
    }
};