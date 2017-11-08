/**
 * G9 코드 참고
 */
import hosts from '../../configs/hosts';
import winston from 'winston';
import {compact} from 'lodash';
import ZMQ from '../moa/winston-transports/zmq';
import toActivityLog from '../moa/toActivityLog';


if (!global.activityLogger) {
    const { HOST, PORT } = hosts.LOG_SERVER;
    global.activityLogger = new (winston.Logger)({
        transports: compact([
            new ZMQ({ host: HOST, port: PORT, level: 'info', toLog: toActivityLog })
        ])
    });
}

/**
 * Module exports
 * @public
 */
module.exports = global.activityLogger;
