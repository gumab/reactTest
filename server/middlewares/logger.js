
import '../libs/activity-logger';
import url from 'url';

const logger = function (req, res, next) {
    let urlPath = url.parse(req.url).pathname;
    if (!/^\/(check_server_ip(.aspx)?)?$/i.test(urlPath)) {
        global.activityLogger.info('', {
            headers: req.headers,
            cookies: req.cookies,
            context: req.context,
            body: req.body,
            query: req.query,
            params: req.params,
            url: req.url,
            method: urlPath,
            httpMethod: req.method,
            'class': req.context && req.context.partnerKey
        });
    }
    next();
};

export default logger;