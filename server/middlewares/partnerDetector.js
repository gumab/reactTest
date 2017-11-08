
import Helper from '../helpers';
import url from 'url';

const detector = function (req, res, next) {
    try {
        let returnUrl = req.query.returnUrl;
        if (!returnUrl && req.headers['referer']) {
            let query = url.parse(req.headers['referer']).query;
            let queryObj = {};
            if (query) {
                for (let q of query.split('&')) {
                    if (q) {
                        let keyValue = q.split('=');
                        if (keyValue.length === 2) {
                            queryObj[keyValue[0]] = keyValue[1];
                        }
                    }
                }
            }
            if (queryObj.returnUrl) {
                returnUrl = queryObj.returnUrl;
            }
        }
        if (returnUrl) {
            let key = new Helper().getPartnerKey(returnUrl);
            if (!req.context) {
                req.context = {};
            }
            req.context.partnerKey = key;
        }
    } catch (e) {
        //DO NOTHING
    }
    next();
};

export default detector;
