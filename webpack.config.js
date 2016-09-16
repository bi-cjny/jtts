const path = require('path');
const webpack = require('webpack');

module.exports = {
    "devTool": "source-map",
    entry: './client/src/client.js',
    output: {
        path: './server/public/scripts',
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
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.json']
    }
};