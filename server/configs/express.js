'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import config from '../configs';
import logger from '../middlewares/logger';
import partnerDetector from '../middlewares/partnerDetector';

export default () => {
    let app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.set('views', path.resolve(config.ROOT_DIR, 'client/view'));
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);

    // 경로 '/' 로 들어오는 요청들은 public 폴더로 정적 라우팅합니다.
    app.use('/', express.static(path.resolve(config.ROOT_DIR, 'public')));
    app.use(partnerDetector);
    app.use(logger);

    return app;
};