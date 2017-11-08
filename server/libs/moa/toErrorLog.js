const levels = Object.keys({
    debug: 0,
    info: 1,
    notice: 2,
    warning: 3,
    error: 4,
    crit: 5,
    alert: 6,
    emerg: 7
});

function toErrorLog(level, message, meta) {
    const err = meta;
    const req = err.req || {};
    const headers = req.headers || {};
    const cookies = req.cookies || {};
    const context = req.context || {};

    return JSON.stringify({
        domain: 'SHIPPING',
        facility: 'address-map',
        host: process.env.HOSTNAME || headers['client-ip'],
        raw_url: req.originalUrl || '',
        short_message: message,
        timestamp: new Date(),
        user_agent: headers['user-agent'] || '',
        request_os: '',
        request_browser: '',
        member_id: context.buyerId || '',
        module_id: req.url || '',
        pcid: cookies.pcid || '',
        ip_address: headers['client-ip'],
        countrycode: '--',
        requestid: req.uuid || '0',
        referer_yn: headers.referer ? 'Y' : 'N',
        normal_access_yn: 'Y',
        error_occur_namespace: err.namespace || err.name || 'Unknown',
        error_occur_class: ('' + err.code) || 'Unknown',
        full_message: {
            referer: headers.referer || '',
            err_date: new Date(),
            err_msg: err.fullMessage + ' || ' + JSON.stringify({ headers: headers }),
            err_query: `${err.stack}++++++++${err.remoteStack || ''}`,
            charset: '',
            languages: 'KR',
            level: levels.indexOf(level),
            type: 'AddressMapLog',
            tsplog_version: '1.0',
            post_data: req.body && JSON.stringify(req.body),
            http_cookie: cookies && JSON.stringify(cookies)
        }
    });
}

module.exports = toErrorLog;
