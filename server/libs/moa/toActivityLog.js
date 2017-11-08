/**
 * G9 코드 참고
 */
import { cloneDeep } from 'lodash';
import { version } from '../../../package.json';

function toActivityLog(level, message, meta) {
    const uuid = meta.uuid || '0';
    const headers = meta.headers || {};
    const cookies = meta.cookies || {};
    const body = cloneDeep(meta.body || {});
    const query = meta.query || {};
    const params = meta.params || {};
    const url = meta.url || '';
    const method = meta.method || '';
    return JSON.stringify({
        domain: 'SHIPPING',
        facility: 'address.web',
        host: headers['host'] || headers['client-ip'],
        application: 'ebaykorea.shipping-address-web',
        application_version: version,
        type: 'ActivityLog',
        action_type: meta.actionType || '',
        uuid: uuid,
        namespace: '',
        'class': meta.class || '',
        ip_address: headers['x-forwarded-for'] || meta.clientIp,
        method: method,
        short_message: url,
        timestamp: new Date(),
        payload: {
            args: message,
            query,
            body,
            params
        },
        http_url: url,
        http_header: headers,
        http_cookie: cookies,
        http_user_agent: headers['user-agent'] || '',
        http_method: meta.httpMethod
    });
}

module.exports = toActivityLog;
