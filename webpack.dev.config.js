/* global __dirname */
/* eslint-disable */

var path = require('path');

var webpack = require('webpack');

var dir_js = path.resolve(__dirname, 'client');

module.exports = {
    entry: [
        path.resolve(dir_js, 'index.js'),
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server'
    ],
    output: {
        path: '/',
        filename: 'bundle.js'
    },
    devServer: {
        filename: 'bundle.js',
        publicPath: '/',
        historyApiFallback: true,
        contentBase: './public',
        proxy: {
            "**": "http://localhost:3001"
        }
    },
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                loader: 'eslint-loader',
                exclude: [/node_modules/, /libs/],
                enforce: 'pre'
            },
            {
                test: /\.js[x]?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    resolve: {
      extensions: ['.js']
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map'
};