/**
 * G9 코드 참고
 */
import { noop } from 'lodash';
import zmq from 'zeromq';
import winston from 'winston';
import genericPool from 'generic-pool';

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

class ZMQ extends winston.Transport {
    constructor(options) {
        super(options);
        if (!options.host || !options.port) {
            throw Error(`host(${options.host}) and port(${options.port}) must not be null or undefined`);
        }
        this.name = 'ZMQ';
        this.host = options.host;
        this.port = options.port;
        this.level = options.level || 'error';
        this.toLog = options.toLog || ((level, message) => message);
        this.pool = genericPool.createPool(
            {
                create() {
                    return new Promise((resolve, reject) => {
                        const client = zmq.socket('push');
                        try {
                            client.connect(`tcp://${options.host}:${options.port}`);
                            resolve(client);
                        } catch (err) {
                            console.log('UNEXPECTED ERROR(1): ', err);
                            reject(err);
                        }
                    });
                },
                destroy(client) {
                    return new Promise((resolve) => {
                        try {
                            client.close();
                        } catch (e) {
                            console.log('UNEXPECTED ERROR(2): ', e);
                            // ignore error
                        }
                        resolve();
                    });
                }
            },
            {
                max: 1,
                min: 0,
                acquireTimeoutMillis: 5000
            });
    }

    log(level, message, meta, callback) {
        if (levels.indexOf(level) >= levels.indexOf(this.level)) {
            const cb = callback || noop;
            const log = this.toLog(level, message, meta);

            this.sendLog(log, (err) => {
                if (err) {
                    console.log('MOA error will be ignored', err);
                }
                this.emit('logged', true);
                cb(null, true);
            });
        }
    }

    sendLog(message, callback) {
        this.pool.acquire()
            .then(client => {
                try {
                    client.send(message);
                } catch (err) {
                    console.log('UNEXPECTED ERROR(3): ', err);
                    // ignore error
                }
                this.pool.release(client);
                callback();
            })
            .catch(callback);
    }
}

module.exports = ZMQ;
