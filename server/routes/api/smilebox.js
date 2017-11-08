import express from 'express';
import request from 'request-promise';
import config from '../../configs';
import HOSTS from '../../configs/hosts';
import CONST from '../../consts';

const router = express.Router();

router.get('/branchlist', (req, res) => {
    let partnerKey = req.query.partnerKey;
    let partnerKeyForSbox;
    if (partnerKey === CONST.PARTNER_KEYS.AUCTION) {
        partnerKeyForSbox = CONST.PARTNER_KEYS_FOR_SBOX.AUCTION;
    } else if (partnerKey === CONST.PARTNER_KEYS.GMARKET
        || partnerKey === CONST.PARTNER_KEYS.G9
        || partnerKey === CONST.PARTNER_KEYS.EBAYKOREA
        || partnerKey === CONST.PARTNER_KEYS.ESMPLUS
        || partnerKey === 'TEST') {
        partnerKeyForSbox = CONST.PARTNER_KEYS_FOR_SBOX.GMARKET;
    } else {
        res.json({
            list: []
        });
        return;
    }
    let url = `${HOSTS.SBOX_API}/api/branch/GetAvailableBranchInfo`;
    let queryString = {
        partner: partnerKeyForSbox
    };
    request({
        url: encodeURI(url),
        qs: queryString,
        headers: {
            Authorization: `Bearer ${config.SBOX_API_KEY}`
        },
        proxy: ''
    })
        .then((response) => {
            response = JSON.parse(response);
            let branchlist = response.Data.BranchList.filter(x => x.IsUse);

            let guList = {};
            branchlist.forEach(function (x) {
                if (!x.DongRepYn) {
                    return;
                }
                if (!guList[x.Gu]) {
                    guList[x.Gu] = true;
                    x.GuRepYn = true;
                } else {
                    x.GuRepYn = false;
                }
            });

            branchlist = branchlist.map((x) => {
                return {
                    type: CONST.PLACE_TYPE.SBOX,
                    id: `sbox_${x.BranchNo}`,
                    branchno: x.BranchNo,
                    title: x.BranchName,
                    address: x.RoadAddr,
                    lotAddress: x.Addr,
                    latitude: x.Latitude,
                    longitude: x.Longitude,
                    dongrep: x.DongRepYn,
                    gurep: x.GuRepYn,
                    zipcode: x.PostNo,
                    gu: x.Gu,
                    dong: x.Dong,
                    guideText: x.GuideText
                };
            });
            if (branchlist) {
                res.json({
                    resCode: CONST.API_RESULT_CODE.OK,
                    msg: 'OK',
                    list: branchlist
                });
            } else {
                res.json({
                    resCode: CONST.API_RESULT_CODE.EMPTY,
                    msg: 'EMPTY',
                    list: []
                });
            }
        })
        .catch((e) => {
            res.status(500);
            console.error(e);
            res.send(e.message);
        });
});

export default router;