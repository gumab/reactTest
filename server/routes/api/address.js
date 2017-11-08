import express from 'express';
import request from 'request-promise';
import config from '../../configs';
import HOSTS from '../../configs/hosts';
import CONST from '../../consts';

const router = express.Router();

router.get('/search', (req, res) => {
    let keyword = req.query.key;
    let page = parseInt(req.query.page);
    let count = config.SEARCH_CNT;

    if (/^\s*$/.test(keyword) || CONST.NOT_ALLOWED_KEYWORD.includes(keyword)) {
        res.json({
            resCode: CONST.API_RESULT_CODE.INVALID_KEYWORD,
            msg: '주소를 상세히 입력해 주시기 바랍니다.'
        });
        return;
    }

    let url = `${HOSTS.SHIP_API}/api/Address/GetAddressSearch`;
    let queryString = {
        req: {
            Mode: 'T',
            Keyword1: keyword,
            PageNo: page,
            PageSize: count
        }
    };
    request({
        url: encodeURI(url),
        qs: queryString,
        proxy: ''
    })
        .then((response) => {
            response = JSON.parse(response);
            let cnt = 0;
            let list = response.Data.map((x) => {
                return {
                    type: CONST.PLACE_TYPE.NORMAL_ADDRESS,
                    id: `${page}_${cnt++}`,
                    zipcode: x.ZipCode,
                    address: x.RoadNameAddress,
                    lotAddress: x.LotNumberAddress,
                    latitude: x.Latitude ? parseFloat(x.Latitude) : -1,
                    longitude: x.Longitude ? parseFloat(x.Longitude) : -1
                };
            });
            let totalCount = parseInt(response.TotalCount);

            let hasNext = totalCount > (count * page);
            res.json({
                resCode: CONST.API_RESULT_CODE.OK,
                msg: 'OK',
                list: list,
                page: {
                    key: keyword,
                    seq: page,
                    next: page + 1,
                    hasNext: hasNext,
                    totalCount: totalCount
                }
            });
        })
        .catch((e) => {
            res.status(500);
            console.error(e);
            res.send(e.message);
        });
});

export default router;