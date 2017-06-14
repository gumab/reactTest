module.exports = {
    devtool : 'eval-source-map',
    entry: './src/index.js',
 
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },
 
    devServer: {
        port: 3000,
        contentBase: __dirname + '/public/',
        inline : true
    },
 
    module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015', 'react']
                    }
                }
            ]
    }
};