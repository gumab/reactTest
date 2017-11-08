import express from 'express';
const router = express.Router();


router.get('/', (req, res) => {
    let ua = req.headers['user-agent'];
    let isMobile = ua ? (ua.includes('iPhone') || ua.includes('Android')) : false;
    return res.render('test', {
        isMobile: isMobile
    });
});

router.get('/callback', (req, res) => {
    return res.render('test/callback', {
        addr1: '',
        addr2: '',
        lotAddress: '',
        zipCode: '',
        sboxBranchNo: ''
    });
});

router.post('/callback', (req, res) => {
    let addr1 = req.body.addr1;
    let addr2 = req.body.addr2;
    let zipcode = req.body.zipcode;
    let sboxBranchNo = req.body.sboxno;
    let lotAddress = req.body.lotaddr1;
    return res.render('test/callback', {
        addr1: addr1,
        addr2: addr2,
        lotAddress: lotAddress,
        zipCode: zipcode,
        sboxBranchNo: sboxBranchNo
    });
});

export default router;