import express from 'express';
import Helper from '../helpers';
import CONST from '../consts';

const router = express.Router();

router.get('/', (req, res) => {
    let returnUrl = req.query.returnUrl || '';
    let closeUrl = req.query.closeUrl || returnUrl;
    let recent = new Helper().getStructuredAddress(req.query.recent);
    let sboxType = new Helper().parseSboxShowType(req.query.sbox);
    let partnerKey = req.context && req.context.partnerKey;
    if (partnerKey) {
        return res.render('index', {
            title: '통합 주소검색 팝업',
            apikey: process.env.DAUM_API_KEY,
            returnUrl: returnUrl,
            closeUrl: closeUrl,
            recent: recent.city === '서울' ? recent.gu : '',
            partner: partnerKey,
            sboxType: sboxType,
            SBOX_TYPE_KEYS: CONST.SBOX_SHOW_TYPE
        });
    } else {
        res.send('잘못된 접근입니다');
    }
});

export default router;