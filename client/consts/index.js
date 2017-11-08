const consts = {
    SBOX_KEYWORD_REGEX: /\s*(smile|스마일)\s*(box|박스)\s*/gi,
    SEARCH_CNT: 50,
    CHECK_ITEM_CLASS: 'selected',
    CLOSEST_BRANCH_THRESHOLD_METER: 1000,
    MAP_LEVEL: {
        SEARCH_RESULT: 5,
        //CONFIRM:5,
        SHOW_ALL: 7,
        SHOW_DONG: 10,
        SHOW_GU: 10
    },
    SBOX_LEVEL: {
        SHOW_ALL: 0,
        SHOW_DONG: 1,
        SHOW_GU: 2,
        SHOW_NONE: 3
    },
    MARKER_STATUS: {
        VIEW: { zidx: 10, key: 'VIEW' },
        CHECK: { zidx: 30, key: 'CHECK' },
        CONFIRM: { zidx: 40, key: 'CONFIRM' }
    },
    MARKER_IMG_TYPE: {
        GPS: 'MARKER_IMG_TYPE_GPS',
        CHECK: 'MARKER_IMG_TYPE_CHECK',
        CONFIRM: 'MARKER_IMG_TYPE_CONFIRM',
        SBOX: {
            VIEW: 'MARKER_IMG_TYPE_SBOX',
            CHECK: 'MARKER_IMG_TYPE_SBOX_CHECK',
            CONFIRM: 'MARKER_IMG_TYPE_SBOX_CONFIRM'
        }
    },
    ADDRESS_LIST_VIEW_TYPE: {
        HIDE: 'ADDRESS_LIST_VIEW_TYPE_HIDE',
        HALF: 'ADDRESS_LIST_VIEW_TYPE_HALF',
        FULL: 'ADDRESS_LIST_VIEW_TYPE_FULL'
    },
    PLACE_TYPE: {
        SBOX: 'PLACE_TYPE_SBOX',
        NORMAL_ADDRESS: 'PLACE_TYPE_NORMAL_ADDRESS'
    },
    SBOX_SHOW_TYPE: {
        HIDE: 'hide',
        DISABLE: 'disable',
        ENABLE: 'enable'
    },
    RECENT_KEYWORD_MAX: 5,
    API_RESULT_CODE: {
        OK: '000',
        EMPTY: '1100',
        INVALID_KEYWORD: '1200'
    },
    GPS_BTN_STATUS: {
        NORMAL: 'normal',
        FINDING: 'finding',
        ENABLE: 'enable'
    }
};

export default consts;