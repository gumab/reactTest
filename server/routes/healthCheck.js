import express from 'express';
import os from 'os';
const router = express.Router();


router.get('/', (req, res) => {
    const ifaces = os.networkInterfaces();
    let ip = '';
    for (const dev in ifaces) {
        if (dev in ifaces) {
            ifaces[dev].forEach(function (details) {
                if (details.family === 'IPv4' && details.internal === false) {
                    ip = details.address;
                }
            });
        }
    }
    res.status(200).send(ip);
});

export default router;