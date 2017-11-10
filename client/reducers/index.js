import * as types from '../actions/ActionTypes';
import consts from '../consts';

const defaultState = {
    value: '',
    viewType: 'initial',
    sboxType: 'enable',
    recent: '강남구',
    focusIn: false,
    searchResult: [],
    paging: undefined,
    searchedKeyword: '',
    partnerKey: 'G',
    sboxList: [],
    showingSboxList: [],
    mapCenter: {
        lat: 37.50011937730949,
        lng: 127.03653931419586
    },
    mapLevel: 4,
    gpsLocation: {},
    gpsStatus: consts.GPS_BTN_STATUS.NORMAL,
    virtualMapHeight: 0,
    selectedAddress: {
        level1: {},
        level2: {}
    }
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.SET_SELECTED_ADDRESS:
            return Object.assign({}, state, {
                selectedAddress: {
                    level1: action.address.level1 || state.selectedAddress.level1,
                    level2: action.address.level2 || state.selectedAddress.level2
                }
            });
        case types.SET_VIEW_TYPE:
            return Object.assign({}, state, {
                viewType: action.viewType
            });
        case types.SET_FOCUS:
            return Object.assign({}, state, {
                focusIn: action.isFocus
            });
        case types.SET_SEARCH_RESULT:
            return Object.assign({}, state, {
                searchedKeyword: action.keyword,
                searchResult: action.resultData ? action.resultData.list : [],
                paging: action.resultData ? action.resultData.page : undefined
            });
        case types.SET_SBOX_LIST:
            return Object.assign({}, state, {
                sboxList: action.sboxList
            });
        case types.SET_SHOWING_SBOX_LIST:
            return Object.assign({}, state, {
                showingSboxList: action.sboxList
            });
        case types.SET_MAP_AREA:
            return Object.assign({}, state, {
                mapCenter: action.center || state.center,
                mapLevel: action.level || state.level
            });
        case types.SET_GPS_LOCATION:
            return Object.assign({}, state, {
                gpsLocation: action.location
            });
        case types.SET_GPS_STATUS:
            return Object.assign({}, state, {
                gpsStatus: action.status
            });
        case types.SET_VIRTUAL_MAP_HEIGHT:
            return Object.assign({}, state, {
                virtualMapHeight: action.height
            });
        default:
            return state;
    }
};

export default reducer;