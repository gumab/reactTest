
import dotenv from 'dotenv';
import express from './configs/express';
import map from './routes/map';
import api from './routes/api';
import healthCheck from './routes/healthCheck';
import testpages from './routes/test';
dotenv.config();

const app = express();
const port = 3000;
const localPort = 3001;

let expressPort = port;
app.use('/map', map);
app.use('/api', api);
app.use(/^\/check_server_ip(\.aspx)?$/, healthCheck);

console.log('Server is running on ' + process.env.NODE_ENV + ' mode');

if (process.env.NODE_ENV === 'local') {
    let WebpackDevServer = require('webpack-dev-server');
    let webpack = require('webpack');
    expressPort = localPort;
    console.log('webpack-dev-server is listening on port', port);

    const config = require('../webpack.dev.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(port, () => { });
}

if (process.env.NODE_ENV != 'production') {
    app.get('/', (req, res) => {
        res.redirect('/test');
    });
    app.use('/test', testpages);
}

const server = app.listen(expressPort, () => {
    console.log('Express listening on port', expressPort);
});