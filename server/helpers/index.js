'use strict';
import regexConsts from '../consts/regexConsts';
import CONST from '../consts';

class Helpers {
    getPartnerKey(url) {
        let regexResult = url.match(regexConsts.url);
        let result = null;
        if (regexResult) {
            let domain = regexResult[4] || '';
            result = CONST.ALLOWED_PARTNERS.find(x => x.domain === domain);
        }
        return result ? result.key : null;
    }

    getStructuredAddress(address) {
        let result = {
            // 시, 도 (광역자치단체)
            city: '',
            // 시, 군, 구 (기초자치단체)
            gu: '',
            // 읍, 면, 동
            dong: ''
        };

        if (address) {
            let regexResult = address.match(regexConsts.korAddress);
            if (regexResult) {
                result.city = regexResult[3] || '';
                result.gu = regexResult[9] || '';
            }
        }

        return result;
    }

    parseSboxShowType(textType) {
        let result = CONST.SBOX_SHOW_TYPE.ENABLE; //default
        if (textType) {
            switch (textType.toLowerCase()) {
                case CONST.SBOX_SHOW_TYPE.DISABLE:
                    result = CONST.SBOX_SHOW_TYPE.DISABLE;
                    break;
                case CONST.SBOX_SHOW_TYPE.HIDE:
                    result = CONST.SBOX_SHOW_TYPE.HIDE;
                    break;
            }
        }
        return result;
    }
}

export default Helpers;

